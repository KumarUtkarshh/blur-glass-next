import DodoPayments from 'dodopayments';

export type DodoEnvironment = 'test_mode' | 'live_mode';

/**
 * Determine the active Dodo Payments environment.
 * Defaults to 'test_mode' locally unless explicitly set to 'live_mode' or running in production with live mode set.
 */
export const getDodoEnvironment = (): DodoEnvironment => {
  const env = (
    process.env.DODO_PAYMENTS_ENVIRONMENT ||
    process.env.DODO_ENVIRONMENT ||
    ''
  ).toLowerCase().trim();

  if (env === 'live_mode' || env === 'live' || env === 'production' || env === 'prod') {
    return 'live_mode';
  }

  // If in production build on Vercel without explicit test_mode, default to live_mode if live key exists
  if (process.env.NODE_ENV === 'production' && !env) {
    if (process.env.DODO_PAYMENTS_LIVE_API_KEY || (process.env.DODO_PAYMENTS_API_KEY && !process.env.DODO_PAYMENTS_API_KEY.startsWith('dodo_test_'))) {
      return 'live_mode';
    }
  }

  return 'test_mode';
};

/**
 * Returns true if running in Live Mode
 */
export const isLiveMode = (): boolean => {
  return getDodoEnvironment() === 'live_mode';
};

/**
 * Mode-aware API Key resolver
 * Resolves mode-specific keys first, then falls back to generic keys
 */
export const getDodoApiKey = (): string => {
  const isLive = isLiveMode();
  if (isLive) {
    return (
      process.env.DODO_PAYMENTS_LIVE_API_KEY ||
      process.env.DODO_LIVE_API_KEY ||
      process.env.DODO_PAYMENTS_API_KEY ||
      process.env.DODO_API_KEY ||
      ''
    ).trim();
  } else {
    return (
      process.env.DODO_PAYMENTS_TEST_API_KEY ||
      process.env.DODO_TEST_API_KEY ||
      process.env.DODO_PAYMENTS_API_KEY ||
      process.env.DODO_API_KEY ||
      ''
    ).trim();
  }
};

/**
 * Mode-aware Webhook Signing Secret resolver
 */
export const getDodoWebhookKey = (): string | undefined => {
  const isLive = isLiveMode();
  const key = isLive
    ? process.env.DODO_PAYMENTS_LIVE_WEBHOOK_KEY ||
      process.env.DODO_LIVE_WEBHOOK_KEY ||
      process.env.DODO_PAYMENTS_WEBHOOK_KEY ||
      process.env.DODO_WEBHOOK_KEY
    : process.env.DODO_PAYMENTS_TEST_WEBHOOK_KEY ||
      process.env.DODO_TEST_WEBHOOK_KEY ||
      process.env.DODO_PAYMENTS_WEBHOOK_KEY ||
      process.env.DODO_WEBHOOK_KEY;

  return key ? key.trim() : undefined;
};

/**
 * Mode-aware Product ID resolver for BlurGlass
 */
export const getDodoProductId = (): string => {
  const isLive = isLiveMode();
  if (isLive) {
    return (
      process.env.DODO_LIVE_PRODUCT_ID ||
      process.env.DODO_PAYMENTS_LIVE_PRODUCT_ID ||
      process.env.DODO_PRODUCT_ID ||
      'pdt_blurglass_mac'
    ).trim();
  } else {
    return (
      process.env.DODO_TEST_PRODUCT_ID ||
      process.env.DODO_PAYMENTS_TEST_PRODUCT_ID ||
      process.env.DODO_PRODUCT_ID ||
      'pdt_0NodBHc21ZlHzlMt76xg6'
    ).trim();
  }
};

/**
 * Returns a configured DodoPayments SDK instance for the active environment
 */
export const getDodoClient = (): DodoPayments => {
  return new DodoPayments({
    bearerToken: getDodoApiKey(),
    environment: getDodoEnvironment(),
    webhookKey: getDodoWebhookKey(),
  });
};

// Backwards-compatible exports
export const dodoClient = getDodoClient();
export const BLURGLASS_PRODUCT_ID = getDodoProductId();
export const BLURGLASS_PRICE_CENTS = 399; // $3.99 in USD cents
