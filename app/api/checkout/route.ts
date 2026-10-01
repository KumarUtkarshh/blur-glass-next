import { NextRequest, NextResponse } from 'next/server';
import DodoPayments from 'dodopayments';
import { BLURGLASS_PRODUCT_ID } from '@/lib/dodopayments';

export async function POST(req: NextRequest) {
  try {
    const apiKey =
      process.env.DODO_PAYMENTS_API_KEY ||
      process.env.DODO_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: 'Dodo Payments API Key is not configured.',
          hint: 'Add DODO_PAYMENTS_API_KEY to your .env.local file.',
        },
        { status: 500 }
      );
    }

    const environment =
      process.env.DODO_PAYMENTS_ENVIRONMENT === 'live_mode' ? 'live_mode' : 'test_mode';

    const client = new DodoPayments({
      bearerToken: apiKey,
      environment,
    });

    // Determine the base URL for redirect
    const origin =
      process.env.NEXT_PUBLIC_APP_URL ||
      req.nextUrl.origin ||
      'https://blurglass.vercel.app';

    const returnUrl = `${origin}/checkout/success`;

    let body: { customerEmail?: string; customerName?: string; productId?: string } = {};
    try {
      body = await req.json();
    } catch {
      // Body is optional
    }

    const productId = body.productId || BLURGLASS_PRODUCT_ID;

    // Create Dodo Checkout Session
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
          }
        : undefined,
      metadata: {
        app_name: 'BlurGlass',
        platform: 'macOS',
        price: '3.99',
        currency: 'USD',
      },
      feature_flags: {
        allow_discount_code: true,
        allow_currency_selection: true,
      },
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
    });
  } catch (error: any) {
    console.error('Error creating Dodo Payments checkout session:', error);
    return NextResponse.json(
      {
        error: error?.message || 'Failed to create checkout session',
        details: error?.error || error?.toString(),
        hint: 'Verify that your Dodo Payments API key and Product ID are valid in test_mode or live_mode.',
      },
      { status: error?.status || 500 }
    );
  }
}
