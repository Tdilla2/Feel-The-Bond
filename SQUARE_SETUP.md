# Square Hosted Checkout — Setup Guide

This site uses **Square hosted checkout (Payment Links)**. The flow:

1. Customer fills out shipping on the checkout page and clicks **Continue to Payment**.
2. The frontend calls the `create-payment-link` Amplify function (a Lambda Function URL).
3. The function recomputes the order total **server-side** and asks Square to create a hosted **Payment Link**.
4. The customer is redirected to Square's secure payment page (Square handles all card data / PCI).
5. After payment, Square redirects back to `…/?payment=success` and the site shows the order confirmation.

Prices are never trusted from the browser — the function recomputes them from a server-side catalog (`amplify/functions/create-payment-link/handler.ts`).

---

## What you need from Square

Create / sign in at <https://developer.squareup.com/apps> and open (or create) an application. From the app you need:

| Value | Where in Square Dashboard | Used as |
| --- | --- | --- |
| **Access token** | *Credentials* → "Production Access token" (or *Sandbox* tab for testing) | secret `SQUARE_ACCESS_TOKEN` |
| **Location ID** | *Locations* (production) or *Sandbox Test Account → Locations* | secret `SQUARE_LOCATION_ID` |

> Production vs Sandbox: the function defaults to **production** (`SQUARE_ENV=production`). To test safely first, set `SQUARE_ENV=sandbox` and use **sandbox** credentials + [test cards](https://developer.squareup.com/docs/devtools/sandbox/payments). Switch back to `production` when ready to take real payments.

---

## One-time Amplify console setup

The Amplify app currently only builds the **frontend**. To deploy the backend function you must enable backend builds once:

1. **Amplify Console → your app (`Feel-The-Bond`) → App settings → Build settings.**
   - Confirm the build spec includes the `backend:` phase (already committed in `amplify.yml`).
2. **Enable a service role** with permission to deploy the backend:
   - *App settings → IAM roles* → create/attach a service role (Amplify can create one with the needed CloudFormation/Lambda permissions).
3. **Add the Square secrets** (these back the `secret()` references in the function):
   - *App settings → Secrets* (or `Hosting → Secrets`) → add:
     - `SQUARE_ACCESS_TOKEN`
     - `SQUARE_LOCATION_ID`
4. **Trigger a deploy** (push to `main`, or "Redeploy this version"). The backend phase runs `npx ampx pipeline-deploy …` and provisions the function + Function URL.
   - The build prints the Function URL; it's also written to `amplify_outputs.json` as `custom.paymentApiUrl`.

> The backend phase is **soft-failing**: if the role/secrets aren't set yet, the build logs a warning and still deploys the frontend, so the live site never breaks. Payment simply stays disabled until configured.

---

## Wire the frontend to the function

The frontend reads the endpoint from `VITE_PAYMENT_API_URL` at build time.

1. After the first successful backend deploy, copy the Function URL (from the build log or `amplify_outputs.json`).
2. **Amplify Console → App settings → Environment variables** → add:
   - `VITE_PAYMENT_API_URL = https://<id>.lambda-url.<region>.on.aws/`
3. Redeploy so the frontend build bakes it in.

If `VITE_PAYMENT_API_URL` is unset, the checkout button shows a friendly "online payment isn't available" message instead of failing.

---

## Update the redirect/site URL

The function redirects back to `SITE_URL` after payment. It defaults to the Amplify domain
`https://main.d1ix4c3jk1h2mg.amplifyapp.com`. When you attach a custom domain, update `SITE_URL`
in `amplify/functions/create-payment-link/resource.ts` (and the CORS origins in `amplify/backend.ts`).

---

## Local development

- Frontend only: `npm run dev` (set `VITE_PAYMENT_API_URL` in a local `.env` to test against a deployed function).
- Full backend sandbox (requires AWS creds + Square secrets): `npm run sandbox` (runs `ampx sandbox`), then set the secrets with:
  ```bash
  npx ampx sandbox secret set SQUARE_ACCESS_TOKEN
  npx ampx sandbox secret set SQUARE_LOCATION_ID
  ```

---

## Files involved

| File | Purpose |
| --- | --- |
| `amplify/backend.ts` | Defines the backend + the public Function URL (CORS-locked) |
| `amplify/functions/create-payment-link/resource.ts` | Function config, runtime, env/secrets |
| `amplify/functions/create-payment-link/handler.ts` | Validates the cart, calls Square Payment Links API |
| `amplify.yml` | Adds the backend deploy phase |
| `src/app/components/CheckoutPage.tsx` | Posts the cart, redirects to Square |
| `src/app/App.tsx` | Handles the `?payment=success/cancelled` return |

---

## Optional next step: order webhook

This v1 confirms orders via Square's browser redirect. For guaranteed server-side
confirmation (and email/SNS notifications like the old Stripe webhook), add a Square
`payment.updated` webhook handler. Ask and it can be added as a second function.
