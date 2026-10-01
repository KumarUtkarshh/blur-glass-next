import { NextRequest, NextResponse } from 'next/server';
import {
  getDodoClient,
  getDodoApiKey,
  getDodoWebhookKey,
  getDodoEnvironment,
} from '@/lib/dodopayments';

// In-memory set to prevent duplicate webhook processing (idempotency)
const processedWebhooks = new Set<string>();

export async function POST(req: NextRequest) {
  const webhookKey = getDodoWebhookKey();
  const apiKey = getDodoApiKey();
  const environment = getDodoEnvironment();

  try {
    const rawBody = await req.text();

    const webhookId = req.headers.get('webhook-id') || '';
    const webhookSignature = req.headers.get('webhook-signature') || '';
    const webhookTimestamp = req.headers.get('webhook-timestamp') || '';

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

        // Handle specific Dodo Payments events
        switch (event.type) {
          case 'payment.succeeded': {
            const paymentData = event.data as any;
            console.log(`✅ [${environment}] Payment Succeeded for customer:`, paymentData?.customer?.email);
            console.log('💰 Amount:', paymentData?.total_amount, paymentData?.currency);
            // Business logic: e.g., send download link / license key email
            break;
          }
          case 'refund.succeeded': {
            const refundData = event.data as any;
            console.log(`↩️ [${environment}] Refund Succeeded:`, refundData);
            break;
          }
          case 'dispute.opened': {
            const disputeData = event.data as any;
            console.warn(`⚠️ [${environment}] Dispute Opened:`, disputeData);
            break;
          }
          default:
            console.log(`[${environment}] Unhandled webhook event type: ${event.type}`);
        }

        return NextResponse.json({ received: true, environment });
      } catch (err: any) {
        console.error(`[${environment}] Webhook signature verification failed:`, err?.message || err);
        return NextResponse.json({ error: 'Invalid webhook signature', environment }, { status: 401 });
      }
    } else {
      // Fallback in dev/test when webhook key is not yet set
      console.warn(`[Webhook Notice - ${environment}] Webhook signing secret not set. Processing in unverified mode.`);
      let parsedEvent: any = {};
      try {
        parsedEvent = JSON.parse(rawBody);
      } catch {
        // Unparsed
      }
      console.log(`Event received (unverified - ${environment}):`, parsedEvent?.type || 'unknown');
      return NextResponse.json({ received: true, status: 'dev_unverified', environment });
    }
  } catch (error: any) {
    console.error(`Error handling webhook (${environment}):`, error);
    return NextResponse.json({ error: 'Webhook processing error', environment }, { status: 500 });
  }
}
