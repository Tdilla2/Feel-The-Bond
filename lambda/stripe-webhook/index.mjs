import Stripe from 'stripe';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const sns = new SNSClient({});
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const TOPIC_ARN = process.env.SNS_TOPIC_ARN;

const resp = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: typeof body === 'string' ? body : JSON.stringify(body),
});

export const handler = async (event) => {
  const sig =
    event?.headers?.['stripe-signature'] ||
    event?.headers?.['Stripe-Signature'];

  let rawBody = event.body || '';
  if (event.isBase64Encoded) {
    rawBody = Buffer.from(rawBody, 'base64').toString('utf8');
  }

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(rawBody, sig, WEBHOOK_SECRET);
  } catch (err) {
    console.error('[webhook] signature verification failed:', err.message);
    return resp(400, { error: `Webhook Error: ${err.message}` });
  }

  console.log('[webhook] received', stripeEvent.type, stripeEvent.id);

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;

    let lineItemsText = '(unable to fetch line items)';
    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
        { limit: 100 }
      );
      lineItemsText = lineItems.data
        .map(
          (li) =>
            `  - ${li.description} x ${li.quantity} = $${(
              li.amount_total / 100
            ).toFixed(2)}`
        )
        .join('\n');
    } catch (err) {
      console.error('[webhook] listLineItems failed:', err);
    }

    const amount = (session.amount_total / 100).toFixed(2);
    const currency = (session.currency || 'usd').toUpperCase();
    const customerEmail =
      session.customer_details?.email || session.customer_email || '(none)';
    const customerName = session.customer_details?.name || '(none)';
    const shipping = session.customer_details?.address
      ? [
          session.customer_details.address.line1,
          session.customer_details.address.line2,
          `${session.customer_details.address.city || ''}, ${
            session.customer_details.address.state || ''
          } ${session.customer_details.address.postal_code || ''}`,
          session.customer_details.address.country,
        ]
          .filter(Boolean)
          .join('\n  ')
      : '(none provided)';

    const message = [
      `New order confirmed — Feel the Bond`,
      ``,
      `Total: $${amount} ${currency}`,
      `Payment status: ${session.payment_status}`,
      ``,
      `Customer:`,
      `  Name:  ${customerName}`,
      `  Email: ${customerEmail}`,
      ``,
      `Shipping address:`,
      `  ${shipping}`,
      ``,
      `Items:`,
      lineItemsText,
      ``,
      `Stripe session: ${session.id}`,
      `Payment intent: ${session.payment_intent}`,
      `Dashboard: https://dashboard.stripe.com/${
        session.livemode ? '' : 'test/'
      }payments/${session.payment_intent}`,
    ].join('\n');

    try {
      await sns.send(
        new PublishCommand({
          TopicArn: TOPIC_ARN,
          Subject: `New order — $${amount} ${currency}`,
          Message: message,
        })
      );
      console.log('[webhook] SNS published');
    } catch (err) {
      console.error('[webhook] SNS publish failed:', err);
      return resp(500, { error: 'SNS publish failed' });
    }
  }

  return resp(200, { received: true });
};
