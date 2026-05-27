import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Leaf, Award, Heart, Users } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const values = [
    {
      icon: Leaf,
      title: "100% Natural",
      description:
        "We use only the finest natural ingredients, sourced sustainably and ethically.",
    },
    {
      icon: Award,
      title: "Lab Tested CBD & CBG",
      description:
        "Every batch is 3rd-party tested for purity, potency, and safety.",
    },
    {
      icon: Heart,
      title: "Made with Care",
      description:
        "Crafted in small batches with attention to quality and effectiveness.",
    },
    {
      icon: Users,
      title: "Customer First",
      description:
        "Your satisfaction is our priority. We stand behind our products 100%.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/20 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-[4rem] md:text-5xl mb-6 leading-tight">About Feel the Bond</h1>
            <p className="text-[2rem] md:text-xl text-muted-foreground leading-relaxed">
              We believe in the power of nature to heal and restore. Our mission is
              to provide effective, natural means that you can trust.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-[3.5rem] md:text-3xl leading-tight">Our Story</h2>
              <p className="text-[1.75rem] md:text-base text-muted-foreground leading-relaxed">
                Feel the Bond was born from a personal journey to find natural
                solutions for a chronic illness. After years of relying on conventional
                treatments with limited success, we discovered the powerful
                combination of CBD, CBG, and time-tested botanical remedies.
              </p>
              <p className="text-[1.75rem] md:text-base text-muted-foreground leading-relaxed">
                We worked diligently on our formula to create a blend that calms the discomfort. The result is a product we're proud to share with you and
                your loved ones.
              </p>
              <Button
                onClick={() => onNavigate("product")}
                className="bg-primary hover:bg-primary/90 text-[2rem] md:text-base py-12 md:py-2 px-8 md:px-4"
              >
                Try Our Product
              </Button>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1659328376647-52ec39d1a5cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwaGVhbGluZyUyMGhlcmJzfGVufDF8fHx8MTc2NzU5NTQ1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Natural healing herbs"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-[3.5rem] md:text-3xl mb-4 leading-tight">Our Values</h2>
            <p className="text-[2rem] md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              What sets us apart and drives everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-28 h-28 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-16 w-16 md:h-8 md:w-8 text-primary" />
                  </div>
                  <h3 className="text-[2.5rem] md:text-xl mb-2 leading-tight">{value.title}</h3>
                  <p className="text-[1.75rem] md:text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredient Philosophy */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[3.5rem] md:text-3xl mb-8 text-center leading-tight">
              Our Ingredient Philosophy
            </h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-[2.5rem] md:text-xl mb-3 leading-tight">Cannabinoids & Botanicals: The Power Duo</h3>
                  <p className="text-[1.75rem] md:text-base text-muted-foreground leading-relaxed">
                    Our premium formula works synergistically.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-[2.5rem] md:text-xl mb-3 leading-tight">Ancient Botanicals, Modern Application</h3>
                  <p className="text-[1.75rem] md:text-base text-muted-foreground leading-relaxed">
                    Arnica, frankincense, and myrrh have been used for centuries in
                    traditional medicine. We've combined these time-tested ingredients
                    to maximize their therapeutic
                    potential. Camphor adds a cooling, soothing sensation that enhances
                    the overall relief experience.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-[2.5rem] md:text-xl mb-3 leading-tight">Quality You Can Trust</h3>
                  <p className="text-[1.75rem] md:text-base text-muted-foreground leading-relaxed">
                    Every ingredient is carefully sourced from trusted suppliers who
                    share our commitment to quality and sustainability.
                    No artificial additives, fillers, or harsh chemicals—just pure and natural.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-[3.5rem] md:text-4xl text-white mb-6 leading-tight">
            Experience the Difference
          </h2>
          <p className="text-[2rem] md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          </p>
          <Button
            onClick={() => onNavigate("product")}
            size="lg"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-[2rem] md:text-base py-12 md:py-2 px-8 md:px-4"
          >
            Shop Now
          </Button>
        </div>
      </section>
    </div>
  );
}