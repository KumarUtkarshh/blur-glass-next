import { NextRequest, NextResponse } from 'next/server';
import DodoPayments from 'dodopayments';

// In-memory set to prevent duplicate webhook processing (idempotency)
const processedWebhooks = new Set<string>();

export async function POST(req: NextRequest) {
  const webhookKey =
    process.env.DODO_PAYMENTS_WEBHOOK_KEY ||
    process.env.DODO_WEBHOOK_KEY;

  const apiKey =
    process.env.DODO_PAYMENTS_API_KEY ||
    process.env.DODO_API_KEY;

  const environment =
    process.env.DODO_PAYMENTS_ENVIRONMENT === 'live_mode' ? 'live_mode' : 'test_mode';

  try {
    const rawBody = await req.text();

    const webhookId = req.headers.get('webhook-id') || '';
    const webhookSignature = req.headers.get('webhook-signature') || '';
    const webhookTimestamp = req.headers.get('webhook-timestamp') || '';

    // If webhook signing key is configured, verify signature cryptographically
    if (webhookKey && apiKey) {
      const client = new DodoPayments({
        bearerToken: apiKey,
        environment,
        webhookKey,
      });

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
          console.log(`[Webhook] Duplicate event skipped: ${webhookId}`);
          return NextResponse.json({ received: true, note: 'duplicate_skipped' });
        }
        if (webhookId) processedWebhooks.add(webhookId);

        console.log(`[Dodo Webhook Verified] Event: ${event.type}`);

        // Handle specific Dodo Payments events
        switch (event.type) {
          case 'payment.succeeded': {
            const paymentData = event.data as any;
            console.log('✅ Payment Succeeded for customer:', paymentData?.customer?.email);
            console.log('💰 Amount:', paymentData?.total_amount, paymentData?.currency);
            // Business logic: e.g., send download link / license key email
            break;
          }
          case 'refund.succeeded': {
            const refundData = event.data as any;
            console.log('↩️ Refund Succeeded:', refundData);
            break;
          }
          case 'dispute.opened': {
            const disputeData = event.data as any;
            console.warn('⚠️ Dispute Opened:', disputeData);
            break;
          }
          default:
            console.log(`Unhandled webhook event type: ${event.type}`);
        }

        return NextResponse.json({ received: true });
      } catch (err: any) {
        console.error('Webhook signature verification failed:', err?.message || err);
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
      }
    } else {
      // Fallback in dev/test when webhook key is not yet set
      console.warn('[Webhook Notice] Webhook signing secret not set. Processing in dev mode.');
      let parsedEvent: any = {};
      try {
        parsedEvent = JSON.parse(rawBody);
      } catch {
        // Unparsed
      }
      console.log('Event received (unverified):', parsedEvent?.type || 'unknown');
      return NextResponse.json({ received: true, status: 'dev_unverified' });
    }
  } catch (error: any) {
    console.error('Error handling webhook:', error);
    return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 });
  }
}
