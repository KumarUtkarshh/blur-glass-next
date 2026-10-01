# Dodo Payments Setup & Testing Guide

This guide walks you through the exact steps to configure Dodo Payments for **BlurGlass** ($3.99 one-time payment) in Test Mode and perform test transactions.

---

## Step 1: Open the Dodo Payments Dashboard

1. Navigate to the **Dodo Payments Test Dashboard**: [https://test.dodopayments.com](https://test.dodopayments.com)
2. Sign in or create an account if you haven't already.
3. Ensure the environment toggle in the top navigation is set to **Test Mode** (orange badge).

---

## Step 2: Create your BlurGlass Product

1. In the sidebar, click on **Products** (or go to [https://test.dodopayments.com/products](https://test.dodopayments.com/products)).
2. Click **+ Create Product** (top right).
3. Fill in the product details:
   - **Product Name**: `BlurGlass for macOS`
   - **Description**: `Lifetime license for BlurGlass on-device privacy screen.`
   - **Pricing Model**: `One-time payment`
   - **Currency**: `USD`
   - **Amount**: `$3.99` (enter `3.99` or `399` cents)
4. Click **Save Product**.
5. Once created, copy the **Product ID** (it looks like `pdt_...`).

---

## Step 3: Generate your API Key

1. In the sidebar, go to **Developer → API Keys** (or [https://test.dodopayments.com/developer/api-keys](https://test.dodopayments.com/developer/api-keys)).
2. Click **+ Create API Key**.
3. Name it: `BlurGlass Next App (Test)`.
4. Copy the newly generated secret key (starts with `test_` or your Dodo secret token).

---

## Step 4: Configure Webhooks (Optional for local, Required for Live)

1. In the sidebar, go to **Developer → Webhooks** (or [https://test.dodopayments.com/developer/webhooks](https://test.dodopayments.com/developer/webhooks)).
2. Click **+ Add Endpoint**.
3. **Endpoint URL**: `https://your-domain.com/api/webhooks/dodo` (or your ngrok tunnel URL for local testing).
4. **Events to subscribe**:
   - `payment.succeeded`
   - `refund.succeeded`
   - `dispute.opened`
5. Click **Create**.
6. Copy the **Webhook Signing Secret** (starts with `whsec_...`).

---

## Step 5: Update Your Environment Variables

Update your `.env` or `.env.local` file in the project root with the values obtained from the steps above:

```env
# Dodo Payments Configuration
DODO_PAYMENTS_API_KEY=your_test_api_key_here
DODO_PAYMENTS_WEBHOOK_KEY=whsec_your_webhook_signing_secret_here
DODO_PAYMENTS_ENVIRONMENT=test_mode
DODO_PRODUCT_ID=pdt_your_product_id_here

# App URL for redirection
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Step 6: Test Transactions in Test Mode

When clicking **"Get BlurGlass — $3.99"** on the website, Dodo Payments checkout will open. Use the following official test payment credentials:

### Test Credit Cards (Dodo Payments / Stripe Engine)

| Card Brand | Card Number | Expiry | CVC | Expected Result |
|---|---|---|---|---|
| **Success Card** | `4242 4242 4242 4242` | Any future date (e.g. `12/28`) | Any 3 digits (`123`) | **Payment Succeeded (200)** → Redirects to `/checkout/success` |
| **Card Declined** | `4000 0000 0000 0002` | Any future date | `123` | Declined test error |
| **Insufficient Funds** | `4000 0000 0000 0999` | Any future date | `123` | Insufficient funds error |

---

## Step 7: Verifying Successful Flow

1. On completing payment with `4242 4242 4242 4242`, Dodo Payments will automatically redirect to:
   `https://blurglass.vercel.app/checkout/success?session_id=cks_...`
2. The customer will see the **BlurGlass Download & Setup** confirmation screen.
3. The webhook endpoint at `/api/webhooks/dodo` receives the verified `payment.succeeded` event.

---

## Going Live to Production

When you are ready to collect real payments:
1. Switch the Dodo dashboard to **Live Mode**.
2. Create the `$3.99` BlurGlass product in Live Mode.
3. Generate a Live API Key and Webhook Secret.
4. Update your production environment variables (e.g. in Vercel Project Settings > Environment Variables):
   ```env
   DODO_PAYMENTS_API_KEY=live_your_live_api_key
   DODO_PAYMENTS_WEBHOOK_KEY=whsec_live_webhook_key
   DODO_PAYMENTS_ENVIRONMENT=live_mode
   DODO_PRODUCT_ID=pdt_live_product_id
   NEXT_PUBLIC_APP_URL=https://blurglass.vercel.app
   ```
