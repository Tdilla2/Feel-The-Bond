import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
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

export function CheckoutPage({
  items,
  onNavigate,
  onClearCart,
  onOrderPlaced,
  checkoutSuccess,
  lastOrder,
}: CheckoutPageProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [loading, setLoading] = useState(false);

  const displayItems = checkoutSuccess && lastOrder ? lastOrder : items;

  const subtotal = displayItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    onOrderPlaced(items);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-[2.5rem] md:text-xl mb-4 leading-tight">Shipping Information</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-[1.75rem] md:text-sm">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="text-[1.75rem] md:text-base h-20 md:h-10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-[1.75rem] md:text-sm">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="text-[1.75rem] md:text-base h-20 md:h-10"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="email" className="text-[1.75rem] md:text-sm">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="text-[1.75rem] md:text-base h-20 md:h-10"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="phone" className="text-[1.75rem] md:text-sm">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="text-[1.75rem] md:text-base h-20 md:h-10"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address" className="text-[1.75rem] md:text-sm">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="text-[1.75rem] md:text-base h-20 md:h-10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-[1.75rem] md:text-sm">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="text-[1.75rem] md:text-base h-20 md:h-10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-[1.75rem] md:text-sm">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="text-[1.75rem] md:text-base h-20 md:h-10"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="zipCode" className="text-[1.75rem] md:text-sm">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        className="text-[1.75rem] md:text-base h-20 md:h-10"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

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
                    Online payment is not yet available. Place your order and
                    we'll reach out to confirm payment details.
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

                  <Button
                    type="submit"
                    disabled={loading || items.length === 0}
                    className="w-full bg-primary hover:bg-primary/90 text-[2rem] md:text-base py-12 md:py-2"
                    size="lg"
                  >
                    {loading ? "Placing order…" : "Place Order"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full text-[2rem] md:text-base py-12 md:py-2"
                    size="lg"
                    onClick={() => onNavigate("cart")}
                  >
                    Cancel
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
