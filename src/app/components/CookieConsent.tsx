import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface CookieConsentProps {
  onNavigate: (page: string) => void;
}

export function CookieConsent({ onNavigate }: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    document.cookie = "cookieConsent=accepted; path=/; max-age=31536000"; // 1 year
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    document.cookie = "cookieConsent=declined; path=/; max-age=31536000"; // 1 year
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-sm border-t shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-sm text-muted-foreground">
            <p>
              We use cookies to enhance your browsing experience, analyze website
              traffic, and improve our services. By clicking "Accept", you consent to
              our use of cookies.{" "}
              <button
                onClick={() => onNavigate("privacy")}
                className="text-primary underline hover:no-underline"
              >
                Learn more
              </button>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className="whitespace-nowrap"
            >
              Decline
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="bg-primary hover:bg-primary/90 whitespace-nowrap"
            >
              Accept Cookies
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
