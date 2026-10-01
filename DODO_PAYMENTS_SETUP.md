# Dodo Payments Setup, Live Mode & Testing Guide

This guide covers everything you need to run **BlurGlass** ($3.99 one-time purchase) in both **Test Mode** and **Live Mode**, and how to seamlessly toggle between them for development, testing, and production deployment.

---

## Architecture: Seamless Mode Toggling

The BlurGlass backend is designed with a centralized environment resolver in [`lib/dodopayments.ts`](file:///Users/utkarsh/Documents/blur-glass-next/lib/dodopayments.ts).

### How Environment Detection Works:
1. **Single Variable Toggle**:
   Setting `DODO_PAYMENTS_ENVIRONMENT=live_mode` or `test_mode` instantly switches the active mode.
2. **Dual-Environment Support**:
   You can either provide standard variables (`DODO_PAYMENTS_API_KEY`, etc.) or store both Test and Live credentials simultaneously with mode prefixes (`DODO_PAYMENTS_LIVE_API_KEY` and `DODO_PAYMENTS_TEST_API_KEY`).
3. **Automatic Fallback**:
   In local development, if no environment variable is specified, it defaults safely to `test_mode`.

---

## Part 1: Going Live to Production (Dodo Payments Live Mode)

Follow these steps to activate real payments on your deployed app:

### Step 1: Switch Dodo Dashboard to Live Mode
1. Open the [Dodo Payments Live Dashboard](https://live.dodopayments.com).
2. Look at the top navigation bar and switch the toggle from **Test Mode** to **Live Mode** (the badge turns from orange to dark/green).
3. Ensure your business profile and payout details are completed in Dodo.

### Step 2: Create the BlurGlass Product in Live Mode
1. In the sidebar, navigate to **Products** ([https://live.dodopayments.com/products](https://live.dodopayments.com/products)).
2. Click **+ Create Product**.
3. Fill in the product details:
   - **Product Name**: `BlurGlass for macOS`
   - **Description**: `Lifetime license for BlurGlass on-device privacy screen.`
   - **Pricing Model**: `One-time payment`
   - **Currency**: `USD`
   - **Amount**: `$3.99`
4. Click **Save Product**.
5. Copy the newly generated **Live Product ID** (e.g. `pdt_...`).

### Step 3: Generate Live API Key
1. Go to **Developer → API Keys** ([https://live.dodopayments.com/developer/api-keys](https://live.dodopayments.com/developer/api-keys)).
2. Click **+ Create API Key**.
3. Name it: `BlurGlass Production (Vercel)`.
4. Copy the secret key (store it safely; it is only shown once).

### Step 4: Configure Live Webhook Endpoint
1. Go to **Developer → Webhooks** ([https://live.dodopayments.com/developer/webhooks](https://live.dodopayments.com/developer/webhooks)).
2. Click **+ Add Endpoint**.
3. Fill in the endpoint URL:
   ```
   https://blurglass.vercel.app/api/webhooks/dodo
   ```
4. Subscribe to the following events:
   - `payment.succeeded`
   - `refund.succeeded`
   - `dispute.opened`
5. Click **Create Webhook**.
6. Copy the **Webhook Signing Secret** (starts with `whsec_...`).

### Step 5: Configure Environment Variables in Vercel
1. Go to your **Vercel Dashboard** → Select the **`blurglass`** project.
2. Go to **Settings → Environment Variables**.
3. Add the following variables for the **Production** environment:

| Variable Name | Value | Description |
|---|---|---|
| `DODO_PAYMENTS_ENVIRONMENT` | `live_mode` | Switches Dodo SDK to Live mode |
| `DODO_PAYMENTS_API_KEY` | `dodo_live_...` (your live API key) | Live Secret API key |
| `DODO_PAYMENTS_WEBHOOK_KEY` | `whsec_...` (your live webhook secret) | Live Webhook signature verification |
| `DODO_PRODUCT_ID` | `pdt_...` (your live product ID) | Live BlurGlass product ID ($3.99) |
| `NEXT_PUBLIC_APP_URL` | `https://blurglass.vercel.app` | Base app URL for success redirect |

4. Trigger a **Redeploy** on Vercel to load the new environment variables.

---

## Part 2: Local Development & Test Mode

To test locally without charging real credit cards:

### In `.env` (or `.env.local`):
```env
# Toggle to test mode
DODO_PAYMENTS_ENVIRONMENT=test_mode

# Test Mode Credentials
DODO_PAYMENTS_API_KEY=your_test_api_key_here
DODO_PAYMENTS_WEBHOOK_KEY=whsec_your_test_webhook_key
DODO_PRODUCT_ID=pdt_0NodBHc21ZlHzlMt76xg6

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Option: Dual Credentials in a Single File
You can also keep both in your `.env`:
```env
# Toggle this single line to switch between 'live_mode' and 'test_mode'
DODO_PAYMENTS_ENVIRONMENT=test_mode

# Live Credentials
DODO_PAYMENTS_LIVE_API_KEY=your_live_key
DODO_PAYMENTS_LIVE_WEBHOOK_KEY=whsec_live_key
DODO_LIVE_PRODUCT_ID=pdt_live_id

# Test Credentials
DODO_PAYMENTS_TEST_API_KEY=your_test_api_key_here
DODO_PAYMENTS_TEST_WEBHOOK_KEY=whsec_your_test_webhook_key_here
DODO_TEST_PRODUCT_ID=pdt_your_test_product_id_here

NEXT_PUBLIC_APP_URL=https://blurglass.vercel.app
```

---

## Part 3: Test Payment Scenarios (Test Mode)

When `DODO_PAYMENTS_ENVIRONMENT=test_mode`, use these official test credit cards:

| Card Brand | Card Number | Expiry | CVC | Expected Result |
|---|---|---|---|---|
| **Success Card** | `4242 4242 4242 4242` | Any future date (e.g. `12/28`) | Any 3 digits (`123`) | **Payment Succeeded (200)** → Redirects to `/checkout/success` |
| **Card Declined** | `4000 0000 0000 0002` | Any future date | `123` | Declined test error |
| **Insufficient Funds** | `4000 0000 0000 0999` | Any future date | `123` | Insufficient funds error |

---

## Part 4: Verification & Webhook Handling

- **Customer Redirect**: After payment, the user is redirected to `/checkout/success?session_id=cks_...` with immediate download instructions.
- **Webhook Endpoint**: `/api/webhooks/dodo` verifies incoming Standard Webhook HMAC signatures with `client.webhooks.unwrap()` using the mode-appropriate signing key.
- **Idempotency**: Webhook events are deduplicated by `webhook-id` to prevent duplicate processing.
