import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useState } from "react";
import { Lock } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutPageProps {
  items: CartItem[];
  onNavigate: (page: string) => void;
  onClearCart: () => void;
  onOrderPlaced: (items: CartItem[]) => void;
  checkoutSuccess?: boolean;
  lastOrder?: CartItem[];
}

// Square no-code hosted payment link. Customers choose quantity, enter shipping,
// and pay on Square's secure page — we never see or store card details.
// To swap products/pricing, create a new link in the Square Dashboard
// (Payment Links) and paste its URL here.
const SQUARE_PAYMENT_LINK = "https://square.link/u/nz0qQAw0";

export function CheckoutPage({
  items,
  onNavigate,
  onClearCart,
  checkoutSuccess,
  lastOrder,
}: CheckoutPageProps) {
  const [loading, setLoading] = useState(false);

  const displayItems = checkoutSuccess && lastOrder ? lastOrder : items;

  const subtotal = displayItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handlePay = () => {
    setLoading(true);
    // Save the cart so the confirmation screen can show it if the Square link
    // is configured to redirect back to /?payment=success.
    try {
      localStorage.setItem("ftb_pending_order", JSON.stringify(items));
    } catch {
      /* ignore storage failures (e.g. private mode) */
    }
    window.location.href = SQUARE_PAYMENT_LINK;
  };

  if (checkoutSuccess) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="mb-6">
              <div className="w-40 h-40 md:w-20 md:h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <div className="text-[5rem] md:text-4xl">✓</div>
              </div>
              <h1 className="text-[4rem] md:text-3xl mb-4 leading-tight">Order Confirmed!</h1>
              <p className="text-[2rem] md:text-lg text-muted-foreground mb-2 leading-relaxed">
                Thank you for your purchase
              </p>
              <p className="text-[1.75rem] md:text-base text-muted-foreground leading-relaxed">
                You'll receive a confirmation email shortly with tracking
                information.
              </p>
            </div>

            {displayItems.length > 0 && (
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="text-[2.5rem] md:text-xl mb-4 leading-tight">Order Summary</h3>
                  <div className="space-y-2 text-[1.75rem] md:text-sm leading-relaxed">
                    {displayItems.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span>
                          {item.name} x {item.quantity}
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between text-[2.5rem] md:text-lg leading-tight">
                        <span>Total</span>
                        <span className="text-primary">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Button
              onClick={() => {
                onClearCart();
                onNavigate("home");
              }}
              className="bg-primary hover:bg-primary/90 text-[2rem] md:text-base py-12 md:py-2 px-8 md:px-4"
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-[4rem] md:text-3xl mb-6 md:mb-8 leading-tight">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Payment */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[2.5rem] md:text-xl leading-tight">Payment</h2>
                  <div className="flex items-center text-[1.75rem] md:text-sm text-muted-foreground">
                    <Lock className="h-8 w-8 md:h-4 md:w-4 mr-1" />
                    <span>Secure Checkout</span>
                  </div>
                </div>
                <p className="text-[1.75rem] md:text-sm text-muted-foreground leading-relaxed">
                  Click below to finish on Square's secure checkout, where you'll
                  confirm quantity, enter your shipping address, and pay. We never
                  see or store your card details.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-[2.5rem] md:text-xl leading-tight">Order Summary</h3>

                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-[1.75rem] md:text-sm leading-relaxed">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2 text-[1.75rem] md:text-sm leading-relaxed">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-primary">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-[2.5rem] md:text-lg leading-tight">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <p className="text-[1.5rem] md:text-xs text-muted-foreground leading-relaxed">
                  Final quantity, shipping, and total are confirmed on Square's
                  secure checkout.
                </p>

                <Button
                  type="button"
                  onClick={handlePay}
                  disabled={loading || items.length === 0}
                  className="w-full bg-primary hover:bg-primary/90 text-[2rem] md:text-base py-12 md:py-2"
                  size="lg"
                >
                  {loading ? "Redirecting to Square…" : "Pay with Square"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full text-[2rem] md:text-base py-12 md:py-2"
                  size="lg"
                  onClick={() => onNavigate("cart")}
                >
                  Back to Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
