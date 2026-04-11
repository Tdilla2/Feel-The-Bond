import { Card, CardContent } from "./ui/card";

export function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl mb-8 text-center">Terms of Service</h1>
          
          <p className="text-muted-foreground mb-8 text-center">
            Last Updated: January 5, 2026
          </p>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl mb-4">Agreement to Terms</h2>
                <p className="text-muted-foreground">
                  By accessing or using the Feel the Bond website and purchasing our products, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl mb-4">Age Requirement</h2>
                <p className="text-muted-foreground">
                  You must be at least 18 years of age to purchase products from Feel the Bond. By placing an order, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into this agreement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl mb-4">Product Information and Availability</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We strive to provide accurate product descriptions, pricing, and availability information. However:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>We reserve the right to limit quantities or discontinue products at any time</li>
                    <li>Prices are subject to change without notice</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl mb-4">Orders and Payment</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    When you place an order with us:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>You agree to provide current, complete, and accurate purchase information</li>
                    <li>You agree to promptly update your account and payment information</li>
                    <li>We reserve the right to refuse or cancel any order for any reason</li>
                    <li>All payments must be made in full at the time of purchase</li>
                    <li>We accept major credit cards and other payment methods as displayed on our site</li>
                  </ul>
                  <p className="mt-4">
                    Order confirmation does not constitute acceptance of your order. We reserve the right to cancel orders due to pricing errors, product unavailability, or suspected fraudulent activity.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl mb-4">Shipping and Delivery</h2>
                <div className="space-y-4 text-muted-foreground">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Shipping costs and delivery times are estimates and not guaranteed</li>
                    <li>Title and risk of loss pass to you upon delivery to the carrier</li>
                    <li>We are not responsible for delays caused by shipping carriers or customs</li>
                    <li>You must provide a valid shipping address; we are not responsible for products shipped to incorrect addresses provided by you</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl mb-4">Health and Safety Information</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="font-medium text-foreground">
                    IMPORTANT: These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Consult with a healthcare professional before using if you are pregnant, nursing, or have any medical conditions</li>
                    <li>Discontinue use and consult a doctor if you experience any adverse reactions</li>
                    <li>Keep out of reach of children</li>
                    <li><strong>FOR EXTERNAL USE ONLY</strong></li>
                    <li>Store in a cool, dry place away from direct sunlight</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl mb-4">Intellectual Property</h2>
                <p className="text-muted-foreground">
                  All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Feel the Bond and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written permission.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl mb-4">Prohibited Uses</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    You may not use our website for any unlawful purpose or to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Violate any international, federal, provincial, or state regulations</li>
                    <li>Infringe upon or violate our intellectual property rights</li>
                    <li>Transmit any harmful code, viruses, or malicious software</li>
                    <li>Collect or track personal information of others</li>
                    <li>Engage in any automated use of the system</li>
                    <li>Interfere with or circumvent security features</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl mb-4">Limitation of Liability</h2>
                <p className="text-muted-foreground mb-4">
                  To the maximum extent permitted by law, Feel the Bond shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Your use or inability to use our products or website</li>
                  <li>Any unauthorized access to or use of our servers</li>
                  <li>Any interruption or cessation of transmission to or from our website</li>
                  <li>Any bugs, viruses, or other harmful code</li>
                  <li>Any errors or omissions in any content</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl mb-4">Indemnification</h2>
                <p className="text-muted-foreground">
                  You agree to defend, indemnify, and hold harmless Feel the Bond, its affiliates, and their respective officers, directors, employees, and agents from and against any claims, damages, obligations, losses, liabilities, costs, or expenses arising from your use of our website or products, your violation of these Terms, or your violation of any third-party rights.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl mb-4">Governing Law</h2>
                <p className="text-muted-foreground">
                  These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the state and federal courts located in the United States.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl mb-4">Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify or replace these Terms at any time at our sole discretion. Material changes will be effective immediately upon posting to the website. Your continued use of our website and products following any changes constitutes acceptance of those changes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl mb-4">Severability</h2>
                <p className="text-muted-foreground">
                  If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl mb-4">Contact Information</h2>
                <p className="text-muted-foreground mb-3">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="text-muted-foreground space-y-1">
                  <p>Email: <a href="mailto:support.feelthebond@gmail.com" className="hover:underline">support.feelthebond@gmail.com</a></p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <p className="text-sm text-center text-white">
                  By placing an order or using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}