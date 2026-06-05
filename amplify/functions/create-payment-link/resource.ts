import { defineFunction, secret } from "@aws-amplify/backend";

/**
 * Lambda that creates a Square hosted-checkout Payment Link for the cart.
 *
 * Secrets (set these in the Amplify console — see SQUARE_SETUP.md):
 *   - SQUARE_ACCESS_TOKEN : Square API access token (production or sandbox)
 *   - SQUARE_LOCATION_ID  : the Square location to attribute the order to
 *
 * Plain env vars:
 *   - SQUARE_ENV : "production" (default) or "sandbox"
 *   - SITE_URL   : base URL customers are redirected back to after payment
 */
export const createPaymentLink = defineFunction({
  name: "create-payment-link",
  entry: "./handler.ts",
  runtime: 20,
  timeoutSeconds: 20,
  environment: {
    SQUARE_ACCESS_TOKEN: secret("SQUARE_ACCESS_TOKEN"),
    SQUARE_LOCATION_ID: secret("SQUARE_LOCATION_ID"),
    // Defaults to production per project decision; override in Amplify if testing in sandbox.
    SQUARE_ENV: "production",
    // Update to your custom domain once configured.
    SITE_URL: "https://main.d1ix4c3jk1h2mg.amplifyapp.com",
  },
});
