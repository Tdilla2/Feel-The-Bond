import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
  },
  body: JSON.stringify(body),
});

export const handler = async (event) => {
  const method =
    event?.requestContext?.http?.method || event?.httpMethod || 'POST';

  if (method === 'OPTIONS') return json(204, {});

  try {
    const payload =
      typeof event.body === 'string' ? JSON.parse(event.body) : event.body || {};
    const { items, shipping } = payload;

    if (!Array.isArray(items) || items.length === 0) {
      return json(400, { error: 'No items provided' });
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: Math.round(Number(item.price) * 100),
      },
      quantity: Number(item.quantity),
    }));

    const subtotal = items.reduce(
      (sum, i) => sum + Number(i.price) * Number(i.quantity),
      0
    );
    if (subtotal <= 50) {
      line_items.push({
        price_data: {
          currency: 'usd',
          product_data: { name: 'Shipping' },
          unit_amount: 599,
        },
        quantity: 1,
      });
    }

    const origin =
      event?.headers?.origin ||
      event?.headers?.Origin ||
      process.env.SITE_ORIGIN ||
      '';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items,
      customer_email: shipping?.email || undefined,
      payment_intent_data: shipping?.email
        ? { receipt_email: shipping.email }
        : undefined,
      success_url: `${origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?checkout=cancel`,
    });

    return json(200, { url: session.url, id: session.id });
  } catch (err) {
    console.error('[stripe] create-checkout-session error:', err);
    return json(500, { error: err.message });
  }
};
