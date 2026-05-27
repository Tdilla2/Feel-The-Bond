import image_ad90a7fff7c10394ec950960ee4217612ce5f695 from 'figma:asset/ad90a7fff7c10394ec950960ee4217612ce5f695.png'
import image_b87f6e1d9a5c6a98803b7b4ce07ccbc97aa0e7a4 from 'figma:asset/b87f6e1d9a5c6a98803b7b4ce07ccbc97aa0e7a4.png'
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Check, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import heroImage from "figma:asset/dc9419b75a09ec3159cd5b35291767b085b67200.png";
import { useState } from "react";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);

  const benefits = [
    "Verified customer review - \"Fast-acting relief\"",
    "100% natural ingredients",
    "Travel-friendly 10mL roll-on",
    "Targets nerve & muscle discomfort",
    "Soothes inflammation",
  ];

  const ingredients = [
    { name: "CBD", description: "Premium cannabidiol. No THC. 3rd Party Tested Batches" },
    { name: "CBG", description: "Premium cannabidiol. No THC. 3rd Party Tested Batches" },
    { name: "Arnica", description: "Traditional muscle recovery" },
    { name: "Frankincense", description: "Anti-inflammatory properties" },
    { name: "Myrrh", description: "Ancient healing compound" },
    { name: "Camphor", description: "Cooling sensation" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/20 to-primary/5 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-secondary rounded-full">
                <span className="text-6xl md:text-sm text-secondary-foreground">
                  Natural and Soothing
                </span>
              </div>
              <h1 className="text-[5rem] md:text-5xl lg:text-6xl leading-tight">
                Feel the Bond
              </h1>
              <p className="text-[2.5rem] md:text-xl text-muted-foreground leading-relaxed">
                Experience the Bond with our premium Hemp CBD/CBG roll on formula. No THC. Blended with time-tested botanicals.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => onNavigate("product")}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-[2rem] md:text-base py-12 md:py-2 px-8 md:px-4"
                >
                  Shop Now - $24.99
                </Button>
                <Button
                  onClick={() => onNavigate("about")}
                  variant="outline"
                  size="lg"
                  className="text-[2rem] md:text-base py-12 md:py-2 px-8 md:px-4"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Product Visual */}
            <div className="relative order-first md:order-last">
              <div 
                className="relative rounded-2xl overflow-hidden shadow-2xl aspect-square cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() => setIsImageEnlarged(true)}
              >
                <img
                  src={heroImage}
                  alt="Feel the Bond CBD Pain Relief Roll-On"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Relief Focus Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-[3.5rem] md:text-4xl mb-4 leading-tight">
              Targeted Relief for Your Discomfort
            </h2>
            <p className="text-[2rem] md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Our formula is specifically designed to address various types of discomfort
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-primary text-primary-foreground">
              <div className="aspect-video overflow-hidden">
                <ImageWithFallback
                  src={image_ad90a7fff7c10394ec950960ee4217612ce5f695}
                  alt="Nerve neurotransmitters and synapses"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <p className="text-[1.75rem] md:text-base text-white/90 leading-relaxed">
                  Deep penetrating relief for nerve discomfort
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-primary text-primary-foreground">
              <div className="aspect-video overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1768644675720-2f274f84c87a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodW1hbiUyMG11c2N1bG9za2VsZXRhbCUyMHN5c3RlbSUyMGFuYXRvbXl8ZW58MXx8fHwxNzc0NjQ4ODkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Joint pain in musculoskeletal system"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <p className="text-[1.75rem] md:text-base text-white/90 leading-relaxed">
                  Soothe arthritis and joint inflammation with natural botanicals
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-primary text-primary-foreground">
              <div className="aspect-video overflow-hidden">
                <ImageWithFallback
                  src={image_b87f6e1d9a5c6a98803b7b4ce07ccbc97aa0e7a4}
                  alt="Muscle pain and soreness"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <p className="text-[1.75rem] md:text-base text-white/90 leading-relaxed">
                  Perfect for post-workout recovery and muscle tension
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[3.5rem] md:text-4xl text-center mb-12 leading-tight">
              Why Choose Feel the Bond?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 h-16 w-16 md:h-6 md:w-6 rounded-full bg-primary flex items-center justify-center mt-1">
                    <Check className="h-10 w-10 md:h-4 md:w-4 text-white" />
                  </div>
                  <p className="text-[2rem] md:text-lg leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-[3.5rem] md:text-4xl mb-4 leading-tight">
              Premium Natural Ingredients
            </h2>
            <p className="text-[2rem] md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Every ingredient is carefully selected for maximum therapeutic benefit
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {ingredients.map((ingredient, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow bg-primary text-primary-foreground">
                <h3 className="text-[2.5rem] md:text-xl mb-2 text-white leading-tight">{ingredient.name}</h3>
                <p className="text-[1.75rem] md:text-sm text-white/90 leading-relaxed">
                  {ingredient.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-[3.5rem] md:text-4xl text-white mb-6 leading-tight">
            Ready to Experience?
          </h2>
          <p className="text-[2rem] md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Make the skin connection with Feel the Bond.
          </p>
          <Button
            onClick={() => onNavigate("product")}
            size="lg"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-[2rem] md:text-base py-12 md:py-2 px-8 md:px-4"
          >
            Order Now - $24.99
          </Button>
        </div>
      </section>

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
            alt="Feel the Bond CBD Pain Relief Roll-On - Enlarged"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}