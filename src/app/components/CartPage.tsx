import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Trash2, Plus, Minus } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartPageProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onNavigate: (page: string) => void;
}

export function CartPage({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
}: CartPageProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-20">
            <h1 className="text-[4rem] md:text-3xl mb-4 leading-tight">Your Cart is Empty</h1>
            <p className="text-[2rem] md:text-base text-muted-foreground mb-8 leading-relaxed">
              Add some products to get started
            </p>
            <Button
              onClick={() => onNavigate("product")}
              className="bg-primary hover:bg-primary/90 text-[2rem] md:text-base py-12 md:py-2 px-8 md:px-4"
            >
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-[4rem] md:text-3xl mb-8 leading-tight">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="text-[2rem] md:text-base mb-1 leading-tight">{item.name}</h3>
                      <p className="text-[1.75rem] md:text-sm text-muted-foreground leading-relaxed">10 mL Roll-On</p>
                      <p className="text-[2.5rem] md:text-lg text-primary mt-2 leading-tight">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          className="h-20 w-20 md:h-10 md:w-10"
                        >
                          <Minus className="h-10 w-10 md:h-4 md:w-4" />
                        </Button>
                        <span className="text-[2.5rem] md:text-base w-24 md:w-12 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="h-20 w-20 md:h-10 md:w-10"
                        >
                          <Plus className="h-10 w-10 md:h-4 md:w-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-destructive hover:text-destructive h-20 w-20 md:h-10 md:w-10"
                      >
                        <Trash2 className="h-10 w-10 md:h-5 md:w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-[2.5rem] md:text-xl leading-tight">Order Summary</h3>

                <div className="space-y-2 text-[1.75rem] md:text-sm leading-relaxed">
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
                  {subtotal < 50 && (
                    <p className="text-[1.5rem] md:text-xs text-muted-foreground leading-relaxed">
                      Add ${(50 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-[2.5rem] md:text-lg leading-tight">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={() => onNavigate("checkout")}
                  className="w-full bg-primary hover:bg-primary/90 text-[2rem] md:text-base py-12 md:py-2"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>

                <Button
                  onClick={() => onNavigate("product")}
                  variant="outline"
                  className="w-full text-[2rem] md:text-base py-12 md:py-2"
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}