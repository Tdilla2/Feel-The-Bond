# Square Checkout (no-code Payment Link)

Payments use a **Square no-code Payment Link**. There's no backend — the
checkout button simply redirects the customer to Square's secure hosted page,
where they choose quantity, enter shipping, and pay. We never see card details.

## The link

The payment link is a single constant in
[`src/app/components/CheckoutPage.tsx`](src/app/components/CheckoutPage.tsx):

```ts
const SQUARE_PAYMENT_LINK = "https://square.link/u/nz0qQAw0";
```

## Changing the product / price

1. Square Dashboard → **Payment Links** → <https://app.squareup.com/dashboard/payment-links/new>
2. Create a link (name, price, enable "let customers choose quantity", optionally
   "collect shipping address").
3. Copy the generated `https://square.link/u/...` URL and replace the constant above.

## Optional: on-site "Order Confirmed" screen after payment

By default Square shows its own confirmation page. To return customers to this
site's confirmation screen instead:

1. In the payment link's settings, set the **post-purchase redirect URL** to:
   `https://main.d1ix4c3jk1h2mg.amplifyapp.com/?payment=success`
   (or your custom domain).
2. The app already handles `?payment=success` and shows the "Order Confirmed"
   screen (see [`src/app/App.tsx`](src/app/App.tsx)).

## Notes

- The on-site order summary (subtotal/shipping/total) is indicative; the amount
  actually charged is whatever the Square link is configured for. Keep the
  Square link's price ($19.99) and any shipping rules in sync with the site if
  you want them to match exactly.
- For a fully dynamic cart (server-computed totals, multiple SKUs) you'd need a
  backend; that approach was removed in favor of this simpler no-code link.
