import { NextRequest, NextResponse } from 'next/server';
import { getDodoClient, getDodoApiKey } from '@/lib/dodopayments';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id') || searchParams.get('checkout_session_id');
  const paymentId = searchParams.get('payment_id');
  const wantsJson = searchParams.get('format') === 'json' || req.headers.get('accept')?.includes('application/json');

  try {
    const apiKey = getDodoApiKey();
    if (!apiKey) {
      if (wantsJson) {
        return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
      }
      return NextResponse.json({ error: 'Dodo Payments not configured' }, { status: 500 });
    }

    const client = getDodoClient();
    let customerId: string | null = null;
    let directDownloadUrl: string | null = null;
    let fileName: string = 'BlurGlass.dmg';
    let fileSize: number | null = null;

    // 1. If we have a sessionId, inspect the checkout session
    if (sessionId) {
      try {
        const session = await client.checkoutSessions.retrieve(sessionId);
        if (session.payment_id) {
          const payment = await client.payments.retrieve(session.payment_id);
          if (payment?.customer?.customer_id) {
            customerId = payment.customer.customer_id;
          }
        }
      } catch (err) {
        console.warn('[Download] Could not retrieve session:', err);
      }
    } else if (paymentId) {
      try {
        const payment = await client.payments.retrieve(paymentId);
        if (payment?.customer?.customer_id) {
          customerId = payment.customer.customer_id;
        }
      } catch (err) {
        console.warn('[Download] Could not retrieve payment:', err);
      }
    }

    // 2. If we found a customerId, retrieve their entitlement grants from Dodo
    if (customerId) {
      try {
        const grants = await client.customers.listEntitlementGrants(customerId);
        for await (const grant of grants) {
          const files = grant?.digital_product_delivery?.files;
          if (files && files.length > 0) {
            const primaryFile = files[0];
            if (primaryFile.download_url) {
              directDownloadUrl = primaryFile.download_url;
              if (primaryFile.filename) fileName = primaryFile.filename;
              if (primaryFile.file_size) fileSize = primaryFile.file_size;
              break;
            }
          }
        }
      } catch (err) {
        console.warn('[Download] Could not fetch entitlement grants:', err);
      }
    }

    // 3. Fallback to custom download URL if configured in env
    if (!directDownloadUrl && process.env.BLURGLASS_DOWNLOAD_URL) {
      directDownloadUrl = process.env.BLURGLASS_DOWNLOAD_URL;
    }

    // If JSON format is requested by the UI
    if (wantsJson) {
      if (directDownloadUrl) {
        return NextResponse.json({
          success: true,
          downloadUrl: directDownloadUrl,
          fileName,
          fileSize,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'Download link is being prepared or was delivered via email receipt by Dodo Payments.',
          fallbackUrl: process.env.BLURGLASS_DOWNLOAD_URL || null,
        });
      }
    }

    // Direct browser redirect to the file
    if (directDownloadUrl) {
      return NextResponse.redirect(directDownloadUrl, 302);
    }

    // Fallback: If no direct link is available yet, inform the user
    return NextResponse.json(
      {
        message: 'Your BlurGlass.dmg file is provided via Dodo Payments digital fulfillment. Please check your purchase confirmation email from Dodo Payments, or refresh this page once payment confirmation is finalized.',
      },
      { status: 404 }
    );
  } catch (error: any) {
    console.error('Error handling file download request:', error);
    if (wantsJson) {
      return NextResponse.json({ error: error?.message || 'Download failed' }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unable to process download at this moment.' }, { status: 500 });
  }
}
