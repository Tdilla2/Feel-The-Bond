import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Mail, MapPin } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the message
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="mb-6">
              <div className="w-40 h-40 md:w-20 md:h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <div className="text-[5rem] md:text-4xl">✓</div>
              </div>
              <h1 className="text-[4rem] md:text-3xl mb-4 leading-tight">Message Sent!</h1>
              <p className="text-[2rem] md:text-lg text-muted-foreground leading-relaxed">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
            </div>
            <Button
              onClick={() => setSubmitted(false)}
              className="bg-primary hover:bg-primary/90 text-[2rem] md:text-base py-12 md:py-2 px-8 md:px-4"
            >
              Send Another Message
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-[4rem] md:text-4xl mb-4 leading-tight">Contact Us</h1>
          <p className="text-[2rem] md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have questions? We'd love to hear from you. Send us a message and we'll
            respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-[1.75rem] md:text-sm">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="text-[1.75rem] md:text-base h-20 md:h-10"
                    />
                  </div>

                  <div>
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

                  <div>
                    <Label htmlFor="subject" className="text-[1.75rem] md:text-sm">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="text-[1.75rem] md:text-base h-20 md:h-10"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-[1.75rem] md:text-sm">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      required
                      className="text-[1.75rem] md:text-base"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-[2rem] md:text-base py-12 md:py-2"
                    size="lg"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-12 w-12 md:h-5 md:w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-[2.5rem] md:text-xl mb-1 leading-tight">Email</h3>
                    <p className="text-[1.75rem] md:text-sm text-muted-foreground leading-relaxed">
                      <a href="mailto:support.feelthebond@gmail.com" className="hover:underline">
                        support.feelthebond@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-12 w-12 md:h-5 md:w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-[2.5rem] md:text-xl mb-1 leading-tight">Location</h3>
                    <p className="text-[1.75rem] md:text-sm text-muted-foreground leading-relaxed">
                      Lancaster, SC 29720
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <section id="faq" className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-[3.5rem] md:text-3xl mb-8 text-center leading-tight">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left text-[2rem] md:text-base">
                <span className="font-semibold">How long does shipping take?</span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground text-[1.75rem] md:text-sm leading-relaxed">
                  Standard shipping typically takes 3-5 business days. We also offer
                  expedited shipping options at checkout.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left text-[2rem] md:text-base">
                <span className="font-semibold">What is your return policy?</span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground text-[1.75rem] md:text-sm leading-relaxed">
                  Due to the nature of the product, only fully sealed, unopened products will receive a full refund after contacting us.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left text-[2rem] md:text-base">
                <span className="font-semibold">Is CBD legal?</span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground text-[1.75rem] md:text-sm leading-relaxed">
                  Our CBD is derived from hemp and contains No THC,
                  making it legal under federal law in the United States.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left text-[2rem] md:text-base">
                <span className="font-semibold">How should I use the roll-on?</span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground text-[1.75rem] md:text-sm leading-relaxed">
                  Simply apply to the affected area and gently massage into skin.
                  Use 2-3 times daily or as needed for best results.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left text-[2rem] md:text-base">
                <span className="font-semibold">Will this product make me feel high?</span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground text-[1.75rem] md:text-sm leading-relaxed">
                  No. Our formula contains CBD and CBG from hemp with No THC,
                  which is non-psychoactive and will not produce any intoxicating effects. This product is for external use only. It should not be consumed.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left text-[2rem] md:text-base">
                <span className="font-semibold">Can I use this product with other medications?</span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground text-[1.75rem] md:text-sm leading-relaxed">
                  While our product is made with natural ingredients, if you are concerned regarding topical use, we recommend
                  consulting with your healthcare provider before use.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </div>
  );
}