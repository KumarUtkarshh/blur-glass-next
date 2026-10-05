import { NextRequest, NextResponse } from 'next/server';
import { getDodoClient, getDodoApiKey } from '@/lib/dodopayments';

// ─── Minimal types for Dodo entitlement grants ─────────────────────────────

interface EntitlementFile {
  download_url?: string;
  filename?: string;
  file_size?: number;
}

interface EntitlementGrant {
  digital_product_delivery?: {
    files?: EntitlementFile[];
  };
}

interface GrantsPage {
  items?: EntitlementGrant[];
  [Symbol.asyncIterator]?: () => AsyncIterator<EntitlementGrant>;
}

/**
 * GET /api/download
 *
 * Resolves the BlurGlass.dmg download URL from Dodo Payments digital entitlements.
 *
 * Query params:
 *   - session_id / checkout_session_id  — Dodo checkout session ID (from return URL)
 *   - payment_id                         — Dodo payment ID (also available in return URL)
 *   - format=json                        — return JSON instead of a browser redirect
 *
 * Flow:
 *   1. Retrieve checkout session → get payment_id → get customer_id
 *   2. List customer's entitlement grants → find a file with a download_url
 *   3. Fallback to BLURGLASS_DOWNLOAD_URL env var if set
 *   4. Redirect the browser directly to the file (302), or return JSON for the UI
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id') || searchParams.get('checkout_session_id');
  const paymentIdParam = searchParams.get('payment_id');
  const wantsJson =
    searchParams.get('format') === 'json' ||
    (req.headers.get('accept') ?? '').includes('application/json');

  try {
    const apiKey = getDodoApiKey();
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Dodo Payments API key is not configured.', success: false },
        { status: 500 }
      );
    }

    const client = getDodoClient();
    let customerId: string | null = null;
    let customerEmail: string | null = null;
    let directDownloadUrl: string | null = null;
    let fileName = 'BlurGlass.dmg';
    let fileSize: number | null = null;

    // ── Step 1: Resolve customer_id via session or payment ────────────────────

    let resolvedPaymentId: string | null = paymentIdParam;

    if (sessionId) {
      try {
        const session = await client.checkoutSessions.retrieve(sessionId);
        if (session.payment_id && !resolvedPaymentId) {
          resolvedPaymentId = session.payment_id;
        }
      } catch (err) {
        console.warn('[Download] Could not retrieve checkout session:', (err as Error)?.message);
      }
    }

    if (resolvedPaymentId) {
      try {
        const payment = await client.payments.retrieve(resolvedPaymentId);
        if (payment?.customer?.customer_id) {
          customerId = payment.customer.customer_id;
        }
        if (payment?.customer?.email) {
          customerEmail = payment.customer.email;
        }
      } catch (err) {
        console.warn('[Download] Could not retrieve payment:', (err as Error)?.message);
      }
    }

    // ── Step 2: Fetch entitlement grants to get download URL ──────────────────

    if (customerId) {
      try {
        const grantsPage = await client.customers.listEntitlementGrants(customerId) as unknown as GrantsPage;

        // Try .items first (standard paginated response)
        const items: EntitlementGrant[] = grantsPage?.items ?? [];
        for (const grant of items) {
          const files = grant?.digital_product_delivery?.files ?? [];
          if (files.length > 0 && files[0]?.download_url) {
            directDownloadUrl = files[0].download_url;
            if (files[0].filename) fileName = files[0].filename;
            if (files[0].file_size) fileSize = files[0].file_size;
            break;
          }
        }

        // Try async iteration for SDK versions that support it
        if (!directDownloadUrl) {
          try {
            for await (const grant of grantsPage as unknown as AsyncIterable<EntitlementGrant>) {
              const files = grant?.digital_product_delivery?.files ?? [];
              if (files.length > 0 && files[0]?.download_url) {
                directDownloadUrl = files[0].download_url;
                if (files[0].filename) fileName = files[0].filename;
                if (files[0].file_size) fileSize = files[0].file_size;
                break;
              }
            }
          } catch {
            // Async iteration not supported in this SDK version
          }
        }
      } catch (err) {
        console.warn('[Download] Could not fetch entitlement grants:', (err as Error)?.message);
      }
    }

    // ── Step 3: Fallback to static env URL ───────────────────────────────────

    if (!directDownloadUrl && process.env.BLURGLASS_DOWNLOAD_URL) {
      directDownloadUrl = process.env.BLURGLASS_DOWNLOAD_URL;
      console.log('[Download] Using fallback BLURGLASS_DOWNLOAD_URL from env.');
    }

    // ── Step 4: Return result ─────────────────────────────────────────────────

    if (wantsJson) {
      if (directDownloadUrl) {
        return NextResponse.json({
          success: true,
          downloadUrl: directDownloadUrl,
          fileName,
          fileSize,
          customerEmail,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: customerId
            ? 'Your BlurGlass.dmg link is still being prepared. Please wait a moment and try again, or check your purchase confirmation email.'
            : 'Payment verification is in progress. Please wait a few seconds and refresh, or check your email.',
          customerEmail,
        });
      }
    }

    // Browser redirect to file
    if (directDownloadUrl) {
      return NextResponse.redirect(directDownloadUrl, { status: 302 });
    }

    // No download URL found — return a meaningful 404 to avoid the "JSON file" redirect
    return NextResponse.json(
      {
        success: false,
        error: 'Download link not yet available',
        message:
          'Your BlurGlass.dmg file is being prepared by Dodo Payments. It will also be sent to your email. Please refresh this page in a few seconds.',
        customerEmail,
      },
      { status: 404 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Download request failed.';
    console.error('[Download] Unexpected error:', error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
