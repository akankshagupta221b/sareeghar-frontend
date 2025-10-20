"use client";

import React, { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import {
  Search,
  Heart,
  User,
  ShoppingCart,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetOverlay,
  SheetPortal,
  SheetClose,
} from "@/components/ui/sheet";
import { useSettingsStore } from "@/store/useSettingsStore";
import SearchModal from "@/components/search/SearchModal";

// Main navigation items configuration
const navigationItems = [
  { label: "HOME", href: "/", bold: true },
  { label: "SHOP SAREES", href: "/listing" },
  { label: "NEW ARRIVALS", href: "/listing" },
  { label: "WEDDING COLLECTION", href: "/listing" },
  { label: "OFFERS & SALE", href: "/listing" },
];

// Dropdown options configuration
const dropdownOptions = [
  {
    label: "INR",
    options: [],
  },
];

// Site configuration
const siteConfig = {
  siteName: "SAREE GHAR",
  searchPlaceholder: "Search",
};

export default function Header2() {
  const [wishlistCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedDropdown, setExpandedDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { storeSettings } = useSettingsStore();

  const { items } = useCartStore();

  const toggleDropdown = (label: string) => {
    setExpandedDropdown(expandedDropdown === label ? null : label);
  };

  // Handle keyboard shortcut for search (Ctrl/Cmd + K)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200">
      {/* Main Header */}
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden hover:opacity-70 transition-opacity"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo - Centered on mobile, left on desktop */}
        <div className="flex items-center lg:hidden absolute left-1/2 transform -translate-x-1/2">
          <a
            href="/"
            className="text-2xl font-medium font-secondary tracking-tight"
          >
            {siteConfig.siteName}
          </a>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center w-full max-w-7xl mx-auto">
          {/* Left - Logo */}
          <div className="flex items-center flex-shrink-0">
            <img
              src="/logo/saree-ghar.jpg"
              alt="Saree Ghar Logo"
              className="w-24 h-32 object-contain"
            />
          </div>

          {/* Center - Brand Name & Navigation */}
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8">
            <a
              href="/"
              className="text-5xl font-medium font-secondary tracking-tight"
            >
              {siteConfig.siteName}
            </a>

            <nav className="flex items-center gap-6 text-base font-medium whitespace-nowrap">
              {navigationItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`hover:opacity-70 transition-opacity text-sm ${
                    item.bold ? "font-semibold" : ""
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right - Icons & Options */}
          <div className="flex items-center gap-6 flex-shrink-0">
            {/* Dropdown Options */}
            {dropdownOptions.map((dropdown, index) => (
              <button
                key={index}
                className="flex items-center gap-1 text-base font-medium hover:opacity-70 transition-opacity"
              >
                {storeSettings?.currencySymbol || "₹"} {dropdown.label}
              </button>
            ))}

            {/* Action Icons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hover:opacity-70 transition-opacity"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <button className="relative hover:opacity-70 transition-opacity">
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-black text-white text-xs rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  window.location.href = "/account";
                }}
                className="hover:opacity-70 transition-opacity"
              >
                <User className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  window.location.href = "/cart";
                }}
                className="relative hover:opacity-70 transition-opacity"
              >
                <ShoppingCart className="w-5 h-5" />
                {items && items.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-black text-white text-xs rounded-full flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Action Icons */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hover:opacity-70 transition-opacity"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <button className="relative hover:opacity-70 transition-opacity">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-black text-white text-xs rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              window.location.href = "/account";
            }}
            className="hover:opacity-70 transition-opacity"
          >
            <User className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              window.location.href = "/cart";
            }}
            className="relative hover:opacity-70 transition-opacity"
          >
            <ShoppingCart className="w-5 h-5" />
            {items && items.length > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-black text-white text-xs rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetPortal>
          <SheetOverlay className="fixed inset-0 bg-black/50 z-50" />
          <SheetContent
            className="fixed top-0 left-0 h-full w-[280px] bg-white shadow-xl z-50 overflow-y-auto"
            side="left"
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">{siteConfig.siteName}</h2>
              <SheetClose asChild>
                <button
                  className="hover:opacity-70 transition-opacity"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </SheetClose>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col p-4">
              {navigationItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-3 px-2 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    item.bold ? "font-semibold" : ""
                  }`}
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile Dropdown Options */}
              <div className="mt-4 space-y-2">
                {dropdownOptions.map((dropdown, index) => (
                  <div key={index} className="border-b border-gray-100">
                    <button
                      onClick={() => toggleDropdown(dropdown.label)}
                      className="w-full flex items-center justify-between py-3 px-2 hover:bg-gray-50 transition-colors font-medium"
                    >
                      {dropdown.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          expandedDropdown === dropdown.label
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>
                    {expandedDropdown === dropdown.label && (
                      <div className="pl-4 pb-2 space-y-2">
                        {dropdown.options.map((option, optIndex) => (
                          <button
                            key={optIndex}
                            className="block w-full text-left py-2 px-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </nav>
          </SheetContent>
        </SheetPortal>
      </Sheet>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </header>
  );
}
