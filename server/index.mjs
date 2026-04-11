import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { items, shipping } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'No items provided' });
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

    const origin = req.headers.origin || 'http://localhost:5173';

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

    res.json({ url: session.url, id: session.id });
  } catch (err) {
    console.error('[stripe] create-checkout-session error:', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`[stripe] server listening on http://localhost:${PORT}`);
});
