# Deploying Feel the Bond to AWS

Architecture: **S3 + CloudFront (frontend) + Lambda + HTTP API (backend)**.
CloudFront routes `/api/*` to API Gateway so the frontend keeps using relative
URLs — no CORS config needed on the frontend side.

## Prerequisites

- AWS CLI configured (`aws configure`)
- AWS SAM CLI installed (`sam --version`)
- Node 20+ and npm
- Your Stripe secret key (`sk_test_...` or `sk_live_...`)

## 1. Install Lambda dependencies

```bash
cd lambda/create-checkout-session
npm install --omit=dev
cd ../..
```

## 2. Deploy the stack (first time)

```bash
sam build
sam deploy --guided --parameter-overrides StripeSecretKey=sk_test_YOUR_KEY
```

Accept the defaults. When it finishes, note the outputs:

- `SiteBucketName`
- `CloudFrontDomain`
- `CloudFrontDistributionId`

Subsequent deploys are just:

```bash
sam build && sam deploy --parameter-overrides StripeSecretKey=sk_test_YOUR_KEY
```

## 3. Build and upload the frontend

```bash
npm run build
aws s3 sync dist/ s3://<SiteBucketName>/ --delete
aws cloudfront create-invalidation \
  --distribution-id <CloudFrontDistributionId> \
  --paths "/*"
```

Open the `CloudFrontDomain` URL — the site should load and checkout should
redirect to Stripe.

## 4. (Optional) Convenience script

Add to `package.json` scripts:

```json
"deploy:infra": "sam build && sam deploy",
"deploy:site": "npm run build && aws s3 sync dist/ s3://$SITE_BUCKET/ --delete && aws cloudfront create-invalidation --distribution-id $CF_ID --paths '/*'"
```

Set `SITE_BUCKET` and `CF_ID` as env vars from the stack outputs.

## Notes

- **Stripe key storage**: the SAM template passes the secret as a CloudFormation
  parameter with `NoEcho`. For production, move it to AWS Secrets Manager or
  SSM Parameter Store and reference it in the template instead.
- **Custom domain**: add an ACM cert (in `us-east-1`) and a `Route53` record +
  `Aliases`/`ViewerCertificate` on the CloudFront distribution.
- **Local dev still works** with `npm run dev` — Vite proxies `/api` to the
  local Express server (`server/index.mjs`). The Lambda is only used when
  deployed.
- **Success/cancel URLs**: the Lambda reads `event.headers.origin`, which
  CloudFront forwards via the `AllViewerExceptHostHeader` origin-request policy.
  No code change needed between local and prod.
