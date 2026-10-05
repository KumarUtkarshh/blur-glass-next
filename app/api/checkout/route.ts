import { NextRequest, NextResponse } from 'next/server';
import {
  getDodoClient,
  getDodoApiKey,
  getDodoEnvironment,
  getDodoProductId,
} from '@/lib/dodopayments';

export async function POST(req: NextRequest) {
  try {
    const apiKey = getDodoApiKey();
    const environment = getDodoEnvironment();

    if (!apiKey) {
      return NextResponse.json(
        {
          error: `Dodo Payments API Key is not configured for ${environment}.`,
          hint: 'Add DODO_PAYMENTS_API_KEY (or mode-specific DODO_PAYMENTS_LIVE_API_KEY / DODO_PAYMENTS_TEST_API_KEY) to your environment variables.',
        },
        { status: 500 }
      );
    }

    const client = getDodoClient();

    // Determine the base URL for redirect dynamically based on the current request:
    // (Local development automatically redirects to localhost:3000, production redirects to blurglass.vercel.app)
    const host = req.headers.get('x-forwarded-host') || req.headers.get('host');
    const proto = req.headers.get('x-forwarded-proto') || (host?.includes('localhost') ? 'http' : 'https');
    const detectedOrigin = host ? `${proto}://${host}` : req.headers.get('origin') || req.nextUrl?.origin;

    const origin =
      detectedOrigin ||
      process.env.NEXT_PUBLIC_APP_URL ||
      'http://localhost:3000';

    const returnUrl = `${origin}/checkout/success`;

    let body: {
      customerEmail?: string;
      customerName?: string;
      customerPhone?: string;
      productId?: string;
    } = {};
    try {
      body = await req.json();
    } catch {
      // Body is optional
    }

    const productId = body.productId || getDodoProductId();

    // Create Dodo Checkout Session
    // NOTE: billing_address is intentionally omitted — we only collect email + phone
    const session = await client.checkoutSessions.create({
      product_cart: [
        {
          product_id: productId,
          quantity: 1,
        },
      ],
      customer: body.customerEmail
        ? {
            email: body.customerEmail,
            name: body.customerName || 'BlurGlass Customer',
            ...(body.customerPhone ? { phone_number: body.customerPhone } : {}),
          }
        : undefined,
      metadata: {
        app_name: 'BlurGlass',
        platform: 'macOS',
        price: '3.99',
        currency: 'USD',
        environment,
      },
      feature_flags: {
        allow_discount_code: true,
        allow_currency_selection: true,
        // Collect optional phone number
        allow_phone_number_collection: true,
        require_phone_number: false,
        // Disable all address and tax-related fields
        allow_tax_id: false,
        require_tax_id: false,
        allow_customer_editing_city: false,
        allow_customer_editing_state: false,
        allow_customer_editing_street: false,
        allow_customer_editing_zipcode: false,
        allow_customer_editing_country: false,
        allow_customer_editing_tax_id: false,
        allow_customer_editing_business_name: false,
      },
      // Collect only the minimum required — suppresses the full address form
      // (Dodo may still show a country selector for tax jurisdiction, which is mandatory)
      minimal_address: true,
      return_url: returnUrl,
    });

    if (!session.checkout_url) {
      return NextResponse.json(
        { error: 'Checkout URL was not returned by Dodo Payments.' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      checkoutUrl: session.checkout_url,
      sessionId: session.session_id,
      environment,
    });
  } catch (error: unknown) {
    const environment = getDodoEnvironment();
    const err = error as { message?: string; error?: string; status?: number };
    console.error(`Error creating Dodo Payments checkout session (${environment}):`, error);
    return NextResponse.json(
      {
        error: err?.message ?? 'Failed to create checkout session',
        details: err?.error ?? String(error),
        environment,
        hint: `Verify that your Dodo Payments API key and Product ID are valid for ${environment}.`,
      },
      { status: err?.status ?? 500 }
    );
  }
}
