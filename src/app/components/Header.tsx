import { ShoppingCart, Menu, X, Leaf } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface HeaderProps {
  onNavigate: (page: string) => void;
  cartCount: number;
  currentPage: string;
}

export function Header({ onNavigate, cartCount, currentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", value: "home" },
    { label: "Product", value: "product" },
    { label: "About", value: "about" },
    { label: "Contact", value: "contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center space-x-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl text-primary">Feel the Bond</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => onNavigate(item.value)}
                className={`transition-colors ${
                  currentPage === item.value
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate("cart")}
              className="relative p-2 hover:text-primary transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  onNavigate(item.value);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded transition-colors ${
                  currentPage === item.value
                    ? "bg-secondary text-secondary-foreground"
                    : "hover:bg-secondary/50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}