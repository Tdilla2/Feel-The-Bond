import heroImage from "../../assets/hero-bottle.png";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Plus, Minus, Star, X } from "lucide-react";
import { useState } from "react";

interface ProductPageProps {
  onAddToCart: (quantity: number) => void;
}

export function ProductPage({ onAddToCart }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(quantity);
    setQuantity(1);
  };

  const reviews = [
    {
      name: "Rhett S.",
      rating: 5,
      comment: "Works quickly and the scent is pleasant. Highly recommend!",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
          {/* Product Image */}
          <div className="space-y-4">
            <div 
              className="relative aspect-square rounded-2xl overflow-hidden shadow-xl cursor-pointer hover:opacity-95 transition-opacity"
              onClick={() => setIsImageEnlarged(true)}
            >
              <img
                src={heroImage}
                alt="Feel the Bond 10mL Roll-On"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-[4rem] md:text-4xl mb-2 leading-tight">Feel the Bond</h1>
              <p className="text-[2rem] md:text-lg text-muted-foreground leading-relaxed">
                Botanicals and CBD / CBG Roll-On
              </p>
              <p className="text-[2rem] md:text-lg text-muted-foreground leading-relaxed">
                No THC - 3rd Party Tested
              </p>
            </div>

            <div className="text-[3.5rem] md:text-3xl text-primary">$24.99</div>

            <div className="space-y-3">
              <p className="text-[2rem] md:text-lg leading-relaxed">
                <strong>Size:</strong> 10 mL Roll-On
              </p>
              <p className="text-[1.75rem] md:text-base text-muted-foreground leading-relaxed">
                Premium Hemp CBD and CBG blend with arnica, frankincense, myrrh, and
                camphor. Natural and soothing for muscles, joints, and
                nerves.
              </p>
            </div>

            {/* Active Ingredients */}
            <Card className="bg-secondary/20">
              <CardContent className="p-6">
                <h3 className="text-[2.5rem] md:text-xl mb-3 leading-tight">Active Ingredients - No THC</h3>
                <ul className="space-y-2 text-[1.75rem] md:text-sm leading-relaxed">
                  <li>• CBD (Cannabidiol) - Premium hemp extract</li>
                  <li>• CBG (Cannabigerol) - Enhanced support</li>
                  <li>• Arnica Montana - Natural anti-inflammatory</li>
                  <li>• Frankincense Oil - Ancient healing compound</li>
                  <li>• Myrrh Oil - Pain relief & healing</li>
                  <li>• Camphor - Cooling, soothing sensation</li>
                </ul>
              </CardContent>
            </Card>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="text-[2rem] md:text-base leading-relaxed">Quantity</label>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-20 w-20 md:h-10 md:w-10"
                >
                  <Minus className="h-10 w-10 md:h-4 md:w-4" />
                </Button>
                <span className="text-[2.5rem] md:text-xl w-24 md:w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-20 w-20 md:h-10 md:w-10"
                >
                  <Plus className="h-10 w-10 md:h-4 md:w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              onClick={handleAddToCart}
              className="w-full bg-primary hover:bg-primary/90 text-[2rem] md:text-base py-12 md:py-2"
              size="lg"
            >
              Add to Cart - ${(24.99 * quantity).toFixed(2)}
            </Button>

            <div className="pt-6 border-t space-y-2 text-[1.75rem] md:text-sm text-muted-foreground leading-relaxed">
              <p>✓ Free shipping on orders over $50</p>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <section className="mb-16 py-12 bg-secondary/10 rounded-2xl">
          <div className="container mx-auto px-8">
            <h2 className="text-[3.5rem] md:text-3xl mb-8 text-center leading-tight">How to Use</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-28 h-28 md:w-16 md:h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-[3rem] md:text-2xl">
                  1
                </div>
                <h3 className="text-[2.5rem] md:text-xl mb-2 leading-tight">Roll On</h3>
                <p className="text-[1.75rem] md:text-sm text-muted-foreground leading-relaxed">
                  Apply directly to the affected area
                </p>
              </div>
              <div className="text-center">
                <div className="w-28 h-28 md:w-16 md:h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-[3rem] md:text-2xl">
                  2
                </div>
                <h3 className="text-[2.5rem] md:text-xl mb-2 leading-tight">Massage</h3>
                <p className="text-[1.75rem] md:text-sm text-muted-foreground leading-relaxed">
                  Gently massage into skin
                </p>
              </div>
              <div className="text-center">
                <div className="w-28 h-28 md:w-16 md:h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-[3rem] md:text-2xl">
                  3
                </div>
                <h3 className="text-[2.5rem] md:text-xl mb-2 leading-tight">Feel Relief</h3>
                <p className="text-[1.75rem] md:text-sm text-muted-foreground leading-relaxed">
                  Experience soothing relief within minutes
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section>
          <h2 className="text-[3.5rem] md:text-3xl mb-8 leading-tight">Customer Reviews</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-10 w-10 md:h-4 md:w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="mb-3 text-[1.75rem] md:text-sm leading-relaxed">{review.comment}</p>
                  <p className="text-[1.75rem] md:text-sm text-muted-foreground">- {review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Image Enlargement Modal */}
      {isImageEnlarged && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsImageEnlarged(false)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setIsImageEnlarged(false)}
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={heroImage}
            alt="Feel the Bond 10mL Roll-On - Enlarged"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}