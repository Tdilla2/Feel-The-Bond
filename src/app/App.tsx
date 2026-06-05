import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { ProductPage } from "./components/ProductPage";
import { CartPage } from "./components/CartPage";
import { CheckoutPage } from "./components/CheckoutPage";
import { AboutPage } from "./components/AboutPage";
import { ContactPage } from "./components/ContactPage";
import { PrivacyPolicyPage } from "./components/PrivacyPolicyPage";
import { TermsOfServicePage } from "./components/TermsOfServicePage";
import { CookieConsent } from "./components/CookieConsent";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { BusinessCard } from "./components/BusinessCard";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

type Page =
  | "home"
  | "product"
  | "cart"
  | "checkout"
  | "about"
  | "contact"
  | "privacy"
  | "terms"
  | "business-card";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("ftb_cart");
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [lastOrder, setLastOrder] = useState<CartItem[]>([]);

  // Persist the cart so it survives the redirect to/from Square's checkout.
  useEffect(() => {
    try {
      localStorage.setItem("ftb_cart", JSON.stringify(cartItems));
    } catch {
      /* ignore storage failures (e.g. private mode) */
    }
  }, [cartItems]);

  // Handle the return from Square's hosted checkout (?payment=success|cancelled).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get("payment");
    if (!payment) return;

    if (payment === "success") {
      let order: CartItem[] = [];
      try {
        const pending = localStorage.getItem("ftb_pending_order");
        if (pending) order = JSON.parse(pending) as CartItem[];
      } catch {
        /* ignore */
      }
      localStorage.removeItem("ftb_pending_order");
      setLastOrder(order);
      setCheckoutSuccess(true);
      setCartItems([]);
      setCurrentPage("checkout");
    } else if (payment === "cancelled") {
      toast.info("Checkout canceled — your cart is still here.");
      setCurrentPage("cart");
    }

    // Strip the query string so a refresh doesn't re-trigger this.
    window.history.replaceState({}, "", window.location.pathname);
  }, []);

  const handleOrderPlaced = (items: CartItem[]) => {
    setLastOrder(items);
    setCheckoutSuccess(true);
    setCartItems([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigate = (page: string) => {
    // Handle FAQ anchor link
    if (page === "contact#faq") {
      setCurrentPage("contact");
      // Use setTimeout to ensure the page renders before scrolling
      setTimeout(() => {
        const faqSection = document.getElementById("faq");
        if (faqSection) {
          faqSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      setCurrentPage(page as Page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleAddToCart = (quantity: number) => {
    const existingItem = cartItems.find((item) => item.id === "feel-the-bond");

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === "feel-the-bond"
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          id: "feel-the-bond",
          name: "Feel the Bond",
          price: 24.99,
          quantity,
        },
      ]);
    }

    toast.success(`Added ${quantity} item(s) to cart!`, {
      description: "View your cart to proceed to checkout.",
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast.success("Item removed from cart");
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      {currentPage !== "business-card" && (
        <Header
          onNavigate={handleNavigate}
          cartCount={cartCount}
          currentPage={currentPage}
        />
      )}

      <main className="flex-1">
        {currentPage === "home" && <HomePage onNavigate={handleNavigate} />}
        {currentPage === "product" && (
          <ProductPage onAddToCart={handleAddToCart} />
        )}
        {currentPage === "cart" && (
          <CartPage
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === "checkout" && (
          <CheckoutPage
            items={cartItems}
            onNavigate={(page) => {
              setCheckoutSuccess(false);
              handleNavigate(page);
            }}
            onClearCart={handleClearCart}
            onOrderPlaced={handleOrderPlaced}
            checkoutSuccess={checkoutSuccess}
            lastOrder={lastOrder}
          />
        )}
        {currentPage === "about" && <AboutPage onNavigate={handleNavigate} />}
        {currentPage === "contact" && <ContactPage />}
        {currentPage === "privacy" && <PrivacyPolicyPage />}
        {currentPage === "terms" && <TermsOfServicePage />}
        {currentPage === "business-card" && <BusinessCard />}
      </main>

      {currentPage !== "business-card" && (
        <>
          <Footer onNavigate={handleNavigate} />
          <CookieConsent onNavigate={handleNavigate} />
        </>
      )}
      <Toaster />
    </div>
  );
}