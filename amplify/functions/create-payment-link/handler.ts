/**
 * Creates a Square hosted-checkout Payment Link for the incoming cart and
 * returns its URL. The browser then redirects the customer to Square.
 *
 * Security notes:
 *  - Prices are NEVER trusted from the client. We recompute every amount from
 *    the server-side CATALOG below using only the item id + quantity.
 *  - The Square access token lives only in this function's environment.
 *
 * Invoked via a Lambda Function URL (Lambda proxy event/response shape).
 */

type Incoming = {
  items?: Array<{ id?: string; quantity?: number }>;
  customer?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
  };
};

// Canonical catalog — the single source of truth for prices (in cents).
const CATALOG: Record<string, { name: string; price: number }> = {
  "feel-the-bond": { name: "Feel the Bond", price: 2499 },
};

const CURRENCY = "USD";
const FREE_SHIPPING_THRESHOLD = 5000; // $50.00
const SHIPPING_FEE = 599; // $5.99

function json(statusCode: number, body: unknown) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

export const handler = async (event: any) => {
  const method =
    event?.requestContext?.http?.method ?? event?.httpMethod ?? "POST";
  if (method !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  const accessToken = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;
  const squareEnv = (process.env.SQUARE_ENV ?? "production").toLowerCase();
  const siteUrl = (process.env.SITE_URL ?? "").replace(/\/+$/, "");

  if (!accessToken || !locationId) {
    // Misconfiguration — surface a clear, non-sensitive message.
    return json(500, {
      error:
        "Payment is not configured yet. Missing Square credentials on the server.",
    });
  }

  // ---- Parse + validate the cart ----
  let payload: Incoming;
  try {
    payload = event?.body
      ? JSON.parse(
          event.isBase64Encoded
            ? Buffer.from(event.body, "base64").toString("utf8")
            : event.body
        )
      : {};
  } catch {
    return json(400, { error: "Invalid request body" });
  }

  const items = Array.isArray(payload.items) ? payload.items : [];
  if (items.length === 0) {
    return json(400, { error: "Cart is empty" });
  }

  const lineItems: Array<Record<string, unknown>> = [];
  let subtotal = 0;

  for (const item of items) {
    const entry = item?.id ? CATALOG[item.id] : undefined;
    const quantity = Number(item?.quantity);
    if (!entry) {
      return json(400, { error: `Unknown product: ${item?.id}` });
    }
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      return json(400, { error: "Invalid quantity" });
    }
    subtotal += entry.price * quantity;
    lineItems.push({
      name: entry.name,
      quantity: String(quantity),
      base_price_money: { amount: entry.price, currency: CURRENCY },
    });
  }

  const shipping = subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

  const order: Record<string, unknown> = {
    location_id: locationId,
    line_items: lineItems,
  };
  if (shipping > 0) {
    order.service_charges = [
      {
        name: "Shipping",
        amount_money: { amount: shipping, currency: CURRENCY },
        calculation_phase: "TOTAL_PHASE",
      },
    ];
  }

  // ---- Pre-populate buyer details (optional, improves Square UX) ----
  const c = payload.customer ?? {};
  const prePopulatedData: Record<string, unknown> = {};
  if (c.email) prePopulatedData.buyer_email = c.email;
  if (c.phone) prePopulatedData.buyer_phone_number = c.phone;

  const body = {
    idempotency_key: globalThis.crypto.randomUUID(),
    order,
    checkout_options: {
      redirect_url: `${siteUrl}/?payment=success`,
      ask_for_shipping_address: false,
    },
    ...(Object.keys(prePopulatedData).length
      ? { pre_populated_data: prePopulatedData }
      : {}),
  };

  const base =
    squareEnv === "sandbox"
      ? "https://connect.squareupsandbox.com"
      : "https://connect.squareup.com";

  try {
    const res = await fetch(`${base}/v2/online-checkout/payment-links`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Square-Version": "2025-01-23",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    const data: any = await res.json().catch(() => ({}));

    if (!res.ok) {
      const detail =
        data?.errors?.[0]?.detail ?? `Square returned ${res.status}`;
      console.error("Square payment-link error:", JSON.stringify(data));
      return json(502, { error: `Payment provider error: ${detail}` });
    }

    const url = data?.payment_link?.url;
    if (!url) {
      console.error("Square response missing url:", JSON.stringify(data));
      return json(502, { error: "Payment provider returned no checkout URL" });
    }

    return json(200, { url });
  } catch (err) {
    console.error("create-payment-link failed:", err);
    return json(500, { error: "Could not reach the payment provider" });
  }
};
