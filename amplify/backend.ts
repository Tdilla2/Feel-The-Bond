import { defineBackend } from "@aws-amplify/backend";
import {
  FunctionUrlAuthType,
  HttpMethod,
} from "aws-cdk-lib/aws-lambda";
import { createPaymentLink } from "./functions/create-payment-link/resource";

const backend = defineBackend({
  createPaymentLink,
});

// Public Function URL so the static SPA can call the function directly.
// CORS is locked to the site origins; auth is NONE because the endpoint only
// creates a Square hosted-checkout link (no sensitive data is returned).
const paymentUrl = backend.createPaymentLink.resources.lambda.addFunctionUrl({
  authType: FunctionUrlAuthType.NONE,
  cors: {
    allowedOrigins: [
      "https://main.d1ix4c3jk1h2mg.amplifyapp.com",
      "http://localhost:5173",
    ],
    allowedMethods: [HttpMethod.POST],
    allowedHeaders: ["content-type"],
    maxAge: undefined,
  },
});

// Surface the URL in amplify_outputs.json (custom.paymentApiUrl) for reference.
backend.addOutput({
  custom: {
    paymentApiUrl: paymentUrl.url,
  },
});
