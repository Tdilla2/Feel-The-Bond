# Deploying Feel the Bond to AWS

Architecture: **S3 + CloudFront** static site.

## Prerequisites

- AWS CLI configured (`aws configure`)
- AWS SAM CLI installed (`sam --version`)
- Node 20+ and npm

## 1. Deploy the stack (first time)

```bash
sam build
sam deploy --guided
```

Accept the defaults. When it finishes, note the outputs:

- `SiteBucketName`
- `CloudFrontDomain`
- `CloudFrontDistributionId`

Subsequent deploys are just:

```bash
sam build && sam deploy
```

## 2. Build and upload the frontend

```bash
npm run build
aws s3 sync dist/ s3://<SiteBucketName>/ --delete
aws cloudfront create-invalidation \
  --distribution-id <CloudFrontDistributionId> \
  --paths "/*"
```

Open the `CloudFrontDomain` URL — the site should load.

## 3. (Optional) Convenience script

Add to `package.json` scripts:

```json
"deploy:infra": "sam build && sam deploy",
"deploy:site": "npm run build && aws s3 sync dist/ s3://$SITE_BUCKET/ --delete && aws cloudfront create-invalidation --distribution-id $CF_ID --paths '/*'"
```

Set `SITE_BUCKET` and `CF_ID` as env vars from the stack outputs.

## Notes

- **Custom domain**: add an ACM cert (in `us-east-1`) and a `Route53` record +
  `Aliases`/`ViewerCertificate` on the CloudFront distribution.
- **Local dev**: `npm run dev` starts Vite.
