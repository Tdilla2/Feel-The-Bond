import heroImage from "../../assets/hero-bottle.png";
import { Mail, Phone, Globe } from "lucide-react";

export function BusinessCard() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Business Card - Front */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8 aspect-[3.5/2] max-w-[900px] mx-auto">
          <div className="grid grid-cols-2 h-full">
            {/* Left Side - Image */}
            <div className="bg-gradient-to-br from-primary to-primary/80 overflow-hidden">
              <img
                src={heroImage}
                alt="Feel the Bond Product"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Side - Contact Info */}
            <div className="bg-secondary p-8 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl mb-2 text-primary">Feel the Bond</h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Natural Pain Relief
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-4xl mb-4 text-primary">Nina Dillahunt</h2>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-foreground">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl">704-806-3082</span>
                  </div>

                  <div className="flex items-center space-x-3 text-foreground">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl">support.feelthebond@gmail.com</span>
                  </div>

                  <div className="flex items-center space-x-3 text-foreground">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl">feelthebond.com</span>
                  </div>
                </div>
              </div>

              <div className="text-lg text-muted-foreground mt-4">
                Premium Hemp CBD & CBG Roll-On Formula
              </div>
            </div>
          </div>
        </div>

        {/* Print Instructions */}
        <div className="text-center text-muted-foreground">
          <p className="text-sm">
            Press Ctrl+P (or Cmd+P on Mac) to print this business card
          </p>
        </div>
      </div>

      {/* Print-specific styles */}
      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .min-h-screen {
            min-height: auto;
            display: block;
          }
          @page {
            size: 3.5in 2in;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}
