import { Card, CardContent } from "./ui/card";

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl mb-8 text-center">Privacy Policy</h1>
          
          <p className="text-muted-foreground mb-8 text-center">
            Last Updated: January 5, 2026
          </p>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl mb-4">Introduction</h2>
                <p className="text-muted-foreground">
                  At Feel the Bond, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and purchase our products.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl mb-4">Information We Collect</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="text-foreground mb-2">Personal Information</h3>
                    <p>
                      We may collect personal information that you voluntarily provide to us when you:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Make a purchase</li>
                      <li>Create an account</li>
                      <li>Subscribe to our newsletter</li>
                      <li>Contact us for customer support</li>
                    </ul>
                    <p className="mt-2">
                      This information may include your name, email address, mailing address, and payment information.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-foreground mb-2">Automatically Collected Information</h3>
                    <p>
                      When you visit our website, we may automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies installed on your device.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl mb-4">How We Use Your Information</h2>
                <p className="text-muted-foreground mb-3">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Process and fulfill your orders</li>
                  <li>Send you order confirmations and shipping updates</li>
                  <li>Respond to your customer service requests</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Improve our website and product offerings</li>
                  <li>Detect and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl mb-4">Information Sharing and Disclosure</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We do not sell, trade, or rent your personal information to third parties. We may share your information with:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-foreground">Service Providers:</strong> Third-party companies that help us operate our business, such as payment processors, shipping companies, and email service providers
                    </li>
                    <li>
                      <strong className="text-foreground">Legal Requirements:</strong> When required by law or to protect our rights, property, or safety
                    </li>
                    <li>
                      <strong className="text-foreground">Business Transfers:</strong> In connection with a merger, sale, or acquisition of our business
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl mb-4">Data Security</h2>
                <p className="text-muted-foreground">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl mb-4">Cookies</h2>
                <p className="text-muted-foreground">
                  We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand where our visitors are coming from. You can control cookies through your browser settings, but disabling cookies may affect your ability to use certain features of our website.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl mb-4">Your Rights</h2>
                <p className="text-muted-foreground mb-3">
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>The right to access and receive a copy of your personal information</li>
                  <li>The right to correct inaccurate or incomplete information</li>
                  <li>The right to request deletion of your personal information</li>
                  <li>The right to object to or restrict processing of your information</li>
                  <li>The right to opt-out of marketing communications</li>
                </ul>
                <p className="text-muted-foreground mt-3">
                  To exercise these rights, please contact us at <a href="mailto:support.feelthebond@gmail.com" className="text-primary hover:underline">support.feelthebond@gmail.com</a>.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl mb-4">Children's Privacy</h2>
                <p className="text-muted-foreground">
                  Our website and products are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl mb-4">Third-Party Links</h2>
                <p className="text-muted-foreground">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl mb-4">Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl mb-4">Contact Us</h2>
                <p className="text-muted-foreground mb-3">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="text-muted-foreground space-y-1">
                  <p>Email: <a href="mailto:support.feelthebond@gmail.com" className="hover:underline">support.feelthebond@gmail.com</a></p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <p className="text-sm text-center text-white">
                  By using our website and purchasing our products, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}