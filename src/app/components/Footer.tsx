interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <span className="text-xl">🌿</span>
              </div>
              <span className="text-xl">Feel the Bond</span>
            </div>
            <p className="text-sm text-gray-400">
              Premium Hemp CBD & CBG formula with time-tested botanicals and No-THC.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate("home")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("product")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Product
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("about")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("contact")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate("contact")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Shipping Information
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("contact#faq")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("privacy")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("terms")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg mb-4">Get in Touch</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="mailto:support.feelthebond@gmail.com" className="hover:text-white transition-colors">
                  support.feelthebond@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Feel the Bond. All rights reserved.
          </p>
          <p className="mt-2 text-xs">
            These statements have not been evaluated by the FDA. This product is not
            intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </div>
    </footer>
  );
}