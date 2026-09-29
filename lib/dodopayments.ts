import DodoPayments from 'dodopayments';

// Helper to get environment safely
const getEnvironment = (): 'test_mode' | 'live_mode' => {
  const env = process.env.DODO_PAYMENTS_ENVIRONMENT || process.env.DODO_ENVIRONMENT;
  if (env === 'live_mode') return 'live_mode';
  return 'test_mode';
};

// Secret API key (Server-side only)
const getApiKey = (): string => {
  return (
    process.env.DODO_PAYMENTS_API_KEY ||
    process.env.DODO_API_KEY ||
    ''
  );
};

// Webhook Signing Secret
const getWebhookKey = (): string | undefined => {
  return (
    process.env.DODO_PAYMENTS_WEBHOOK_KEY ||
    process.env.DODO_WEBHOOK_KEY ||
    undefined
  );
};

export const dodoClient = new DodoPayments({
  bearerToken: getApiKey(),
  environment: getEnvironment(),
  webhookKey: getWebhookKey(),
});

export const BLURGLASS_PRODUCT_ID = process.env.DODO_PRODUCT_ID || 'pdt_blurglass_mac';
export const BLURGLASS_PRICE_CENTS = 399; // $3.99 in USD cents
