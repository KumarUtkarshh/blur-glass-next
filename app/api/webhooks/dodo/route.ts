import { NextRequest, NextResponse } from 'next/server';
import {
  getDodoClient,
  getDodoApiKey,
  getDodoWebhookKey,
  getDodoEnvironment,
} from '@/lib/dodopayments';
import { Resend } from 'resend';

// In-memory set to prevent duplicate webhook processing (idempotency)
const processedWebhooks = new Set<string>();

// ─── Minimal Dodo types we need (SDK uses `any` internally) ──────────────────

interface EntitlementFile {
  download_url?: string;
  filename?: string;
  file_size?: number;
}

interface DigitalProductDelivery {
  files?: EntitlementFile[];
}

interface EntitlementGrant {
  digital_product_delivery?: DigitalProductDelivery;
}

interface PaymentCustomer {
  customer_id?: string;
  email?: string;
  name?: string;
}

interface PaymentData {
  customer?: PaymentCustomer;
  total_amount?: number;
  currency?: string;
}

// ─── Email Helpers ────────────────────────────────────────────────────────────

/**
 * Resolves the BlurGlass.dmg download URL for a customer from their Dodo entitlement grants.
 */
async function resolveDownloadUrl(
  customerId: string
): Promise<{ downloadUrl: string | null; fileName: string }> {
  const defaultFileName = 'BlurGlass.dmg';
  try {
    const client = getDodoClient();
    const grantsPage = await client.customers.listEntitlementGrants(customerId);

    // The SDK may return a paginated response with an `items` array
    const items: EntitlementGrant[] =
      (grantsPage as unknown as { items?: EntitlementGrant[] })?.items ?? [];

    for (const grant of items) {
      const files = grant?.digital_product_delivery?.files ?? [];
      if (files.length > 0 && files[0]?.download_url) {
        return {
          downloadUrl: files[0].download_url,
          fileName: files[0].filename ?? defaultFileName,
        };
      }
    }

    // Try async iteration for SDK versions that support it
    try {
      for await (const grant of grantsPage as unknown as AsyncIterable<EntitlementGrant>) {
        const files = grant?.digital_product_delivery?.files ?? [];
        if (files.length > 0 && files[0]?.download_url) {
          return {
            downloadUrl: files[0].download_url,
            fileName: files[0].filename ?? defaultFileName,
          };
        }
      }
    } catch {
      // Async iteration not supported in this SDK version
    }
  } catch (err) {
    console.warn('[Webhook] Could not resolve download URL from entitlements:', (err as Error)?.message);
  }

  // Fallback to static env URL
  if (process.env.BLURGLASS_DOWNLOAD_URL) {
    return { downloadUrl: process.env.BLURGLASS_DOWNLOAD_URL, fileName: defaultFileName };
  }

  return { downloadUrl: null, fileName: defaultFileName };
}

/**
 * Sends the BlurGlass.dmg download link to the customer via email using Resend.
 * Silently no-ops if RESEND_API_KEY is not configured.
 */
async function sendDownloadEmail(opts: {
  customerEmail: string;
  customerName?: string;
  downloadUrl: string;
  environment: string;
}): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.warn('[Webhook] RESEND_API_KEY not set — skipping download email delivery.');
    return;
  }

  const { customerEmail, customerName, downloadUrl, environment } = opts;
  const fromName = 'BlurGlass';
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@blurglass.app';

  const resend = new Resend(resendKey);

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your BlurGlass Download</title>
  <style>
    body { margin: 0; padding: 0; background: #f6f8fc; font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif; }
    .wrapper { max-width: 540px; margin: 48px auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.06); }
    .header { background: linear-gradient(135deg, #007AFF 0%, #2072F3 100%); padding: 36px 40px 28px; text-align: center; }
    .header-icon { width: 64px; height: 64px; border-radius: 16px; margin: 0 auto 16px; display: block; }
    .header h1 { margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; }
    .header p { margin: 6px 0 0; color: rgba(255,255,255,0.82); font-size: 14px; }
    .body { padding: 36px 40px; }
    .greeting { font-size: 16px; color: #1b283e; margin-bottom: 16px; font-weight: 500; }
    .text { font-size: 15px; color: #5b6d88; line-height: 1.65; margin-bottom: 24px; }
    .download-btn { display: block; width: 100%; box-sizing: border-box; padding: 15px 24px; background: #18181b; color: #ffffff; text-decoration: none; border-radius: 12px; font-size: 15px; font-weight: 600; text-align: center; letter-spacing: -0.01em; margin-bottom: 16px; }
    .note { font-size: 13px; color: #94a3b8; line-height: 1.5; text-align: center; }
    .divider { border: none; border-top: 1px solid #eaf1fa; margin: 28px 0; }
    .footer { padding: 0 40px 32px; text-align: center; }
    .footer p { font-size: 12px; color: #aab5c6; margin: 0; line-height: 1.6; }
    .footer a { color: #007AFF; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <img class="header-icon" src="https://blurglass.app/app_icon_128.png" alt="BlurGlass icon" />
      <h1>Your download is ready &#127881;</h1>
      <p>BlurGlass for macOS</p>
    </div>
    <div class="body">
      <p class="greeting">Hi ${customerName || 'there'},</p>
      <p class="text">
        Thank you for purchasing <strong>BlurGlass</strong>! Your DMG installer is ready to download.
        Click the button below to get started.
      </p>
      <a href="${downloadUrl}" class="download-btn">&#8675; Download BlurGlass.dmg</a>
      <p class="note">
        This link will expire in approximately 15 minutes. If it has expired, visit your purchase
        confirmation page or contact support.
      </p>
      <hr class="divider" />
      <p class="text" style="font-size:14px;">
        <strong>Installation:</strong> Open the DMG, drag BlurGlass into your Applications folder,
        launch it, and grant Camera access when prompted. Requires macOS 14+ with a FaceTime HD
        or compatible webcam.
      </p>
    </div>
    <div class="footer">
      <p>
        BlurGlass &mdash; <a href="https://blurglass.app">blurglass.app</a><br />
        Questions? Reply to this email or visit our website.
      </p>
      ${environment !== 'live_mode' ? '<p style="color:#f59e0b;margin-top:8px;">&#9888; This email was sent from a test environment.</p>' : ''}
    </div>
  </div>
</body>
</html>
`;

  try {
    const result = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [customerEmail],
      subject: 'Your BlurGlass.dmg is ready to download 🎉',
      html,
    });

    if (result.error) {
      console.error('[Webhook] Resend email error:', result.error);
    } else {
      console.log(`[Webhook] Download email sent to ${customerEmail} (id: ${result.data?.id})`);
    }
  } catch (err) {
    console.error('[Webhook] Failed to send download email:', (err as Error)?.message);
  }
}

// ─── Webhook Handler ──────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const webhookKey = getDodoWebhookKey();
  const apiKey = getDodoApiKey();
  const environment = getDodoEnvironment();

  try {
    const rawBody = await req.text();

    const webhookId = req.headers.get('webhook-id') ?? '';
    const webhookSignature = req.headers.get('webhook-signature') ?? '';
    const webhookTimestamp = req.headers.get('webhook-timestamp') ?? '';

    // If webhook signing key is configured, verify signature cryptographically
    if (webhookKey && apiKey) {
      const client = getDodoClient();

      try {
        const event = client.webhooks.unwrap(rawBody, {
          headers: {
            'webhook-id': webhookId,
            'webhook-signature': webhookSignature,
            'webhook-timestamp': webhookTimestamp,
          },
        });

        // Check idempotency
        if (webhookId && processedWebhooks.has(webhookId)) {
          console.log(`[Webhook - ${environment}] Duplicate event skipped: ${webhookId}`);
          return NextResponse.json({ received: true, note: 'duplicate_skipped', environment });
        }
        if (webhookId) processedWebhooks.add(webhookId);

        console.log(`[Dodo Webhook Verified - ${environment}] Event: ${event.type}`);

        switch (event.type) {
          case 'payment.succeeded': {
            const paymentData = event.data as PaymentData;
            const customerId = paymentData?.customer?.customer_id;
            const customerEmail = paymentData?.customer?.email;
            const customerName = paymentData?.customer?.name;

            console.log(
              `✅ [${environment}] Payment Succeeded — customer: ${customerEmail}, amount: ${paymentData?.total_amount} ${paymentData?.currency}`
            );

            if (customerId && customerEmail) {
              const { downloadUrl, fileName } = await resolveDownloadUrl(customerId);

              if (downloadUrl) {
                console.log(`[Webhook] Sending download email for ${fileName} to ${customerEmail}`);
                await sendDownloadEmail({
                  customerEmail,
                  customerName,
                  downloadUrl,
                  environment,
                });
              } else {
                console.warn(
                  `[Webhook] No download URL found for customer ${customerId} — email not sent.`
                );
              }
            } else {
              console.warn(
                '[Webhook] payment.succeeded missing customer id or email — cannot send download email.'
              );
            }
            break;
          }

          case 'refund.succeeded': {
            const refundData = event.data;
            console.log(`↩️ [${environment}] Refund Succeeded:`, refundData);
            break;
          }

          case 'dispute.opened': {
            const disputeData = event.data;
            console.warn(`⚠️ [${environment}] Dispute Opened:`, disputeData);
            break;
          }

          default:
            console.log(`[${environment}] Unhandled webhook event type: ${event.type}`);
        }

        return NextResponse.json({ received: true, environment });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.error(`[${environment}] Webhook signature verification failed:`, message);
        return NextResponse.json({ error: 'Invalid webhook signature', environment }, { status: 401 });
      }
    } else {
      // Fallback in dev/test when webhook key is not yet set
      console.warn(`[Webhook Notice - ${environment}] Webhook signing secret not set. Processing in unverified mode.`);
      let parsedEvent: { type?: string } = {};
      try {
        parsedEvent = JSON.parse(rawBody) as { type?: string };
      } catch {
        // Unparsed
      }
      console.log(`Event received (unverified - ${environment}):`, parsedEvent?.type ?? 'unknown');
      return NextResponse.json({ received: true, status: 'dev_unverified', environment });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Error handling webhook (${environment}):`, message);
    return NextResponse.json({ error: 'Webhook processing error', environment }, { status: 500 });
  }
}
