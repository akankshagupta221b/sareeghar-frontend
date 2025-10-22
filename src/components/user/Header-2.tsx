"use client";

import React, { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useCategoryStore, Category } from "@/store/useCategoryStore";
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

interface MegaMenuItem {
  id: string;
  label: string;
  href: string;
  bold?: boolean;
  subCategories: {
    id: string;
    title: string;
    items: {
      id: string;
      label: string;
      href: string;
    }[];
  }[];
}

export default function Header2() {
  const [wishlistCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedDropdown, setExpandedDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [navigationItems, setNavigationItems] = useState<MegaMenuItem[]>([]);

  const { storeSettings } = useSettingsStore();
  const { items } = useCartStore();
  const { categories, fetchCategories } = useCategoryStore();

  const toggleDropdown = (label: string) => {
    setExpandedDropdown(expandedDropdown === label ? null : label);
  };

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Build navigation structure from categories
  useEffect(() => {
    if (categories.length === 0) return;

    // Helper function to build category tree
    const buildCategoryTree = (): MegaMenuItem[] => {
      // Get root categories (parentId is null or doesn't exist)
      const rootCategories = categories.filter(
        (cat) => !cat.parentId && cat.isActive
      );

      return rootCategories.map((root) => {
        // Get second-level categories (children of root)
        const secondLevel = categories.filter(
          (cat) => cat.parentId === root.id && cat.isActive
        );

        const subCategories = secondLevel.map((secondCat) => {
          // Get third-level categories (children of second level)
          const thirdLevel = categories.filter(
            (cat) => cat.parentId === secondCat.id && cat.isActive
          );

          // If no third level, create a single item from the second level category itself
          const items =
            thirdLevel.length > 0
              ? thirdLevel.map((thirdCat) => ({
                  id: thirdCat.id,
                  label: thirdCat.name,
                  href: `/listing?categories=${encodeURIComponent(
                    thirdCat.name
                  )}`,
                }))
              : [
                  {
                    id: secondCat.id,
                    label: secondCat.name,
                    href: `/listing?categories=${encodeURIComponent(
                      secondCat.name
                    )}`,
                  },
                ];

          return {
            id: secondCat.id,
            title: secondCat.name,
            items: items,
          };
        });

        return {
          id: root.id,
          label: root.name.toUpperCase(),
          href: `/listing?categories=${encodeURIComponent(root.name)}`,
          bold: false,
          subCategories: subCategories, // Don't filter, show all second-level categories
        };
      });
    };

    // Add Home as first item
    const homeItem: MegaMenuItem = {
      id: "home",
      label: "HOME",
      href: "/",
      bold: true,
      subCategories: [],
    };

    const productListing: MegaMenuItem = {
      id: "product-listing",
      label: "PRODUCT LISTING",
      href: "/listing",
      bold: true,
      subCategories: [],
    };

    const categoryItems = buildCategoryTree();
    setNavigationItems([homeItem, productListing, ...categoryItems]);
  }, [categories]);

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
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => setActiveCategory(index)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  <a
                    href={item.href}
                    className={`hover:opacity-70 transition-opacity text-sm ${
                      item.bold ? "font-semibold" : ""
                    } flex items-center gap-1 cursor-pointer`}
                  >
                    {item.label}
                    {item.subCategories && item.subCategories.length > 0 && (
                      <ChevronDown className="w-3 h-3" />
                    )}
                  </a>

                  {/* Mega Menu Dropdown */}
                  {item.subCategories &&
                    item.subCategories.length > 0 &&
                    activeCategory === index && (
                      <div
                        className="fixed left-0 right-0 top-[137px] z-50"
                        onMouseEnter={() => setActiveCategory(index)}
                        onMouseLeave={() => setActiveCategory(null)}
                      >
                        <div className="w-full bg-white shadow-xl border-b border-gray-200">
                          <div className="max-w-7xl mx-auto px-8 py-8">
                            <div
                              className="grid gap-8"
                              style={{
                                gridTemplateColumns: `repeat(${item.subCategories.length}, 1fr)`,
                              }}
                            >
                              {item.subCategories.map((subCat, subIndex) => (
                                <div key={subIndex}>
                                  <h3 className="font-semibold text-xs text-gray-900 mb-4 tracking-wider">
                                    {subCat.title}
                                  </h3>
                                  <ul className="space-y-2">
                                    {subCat.items.map((item, itemIndex) => (
                                      <li key={itemIndex}>
                                        <a
                                          href={item.href}
                                          className="text-sm text-gray-600 hover:text-gray-900 hover:pl-2 transition-all duration-200"
                                        >
                                          {item.label}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
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
                <div key={index} className="border-b border-gray-100">
                  {item.subCategories && item.subCategories.length > 0 ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className={`w-full flex justify-between items-center py-3 text-gray-700 font-medium text-sm ${
                          item.bold ? "font-semibold" : ""
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            expandedDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {expandedDropdown === item.label && (
                        <div className="pb-3 space-y-4">
                          {item.subCategories.map((subCat, subIndex) => (
                            <div key={subIndex} className="pl-4">
                              <h4 className="font-semibold text-xs text-gray-900 mb-2 tracking-wider">
                                {subCat.title}
                              </h4>
                              <ul className="space-y-2">
                                {subCat.items.map((subItem, itemIndex) => (
                                  <li key={itemIndex}>
                                    <a
                                      href={subItem.href}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="text-sm text-gray-600 hover:text-gray-900 block py-1"
                                    >
                                      {subItem.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-3 text-gray-700 font-medium text-sm ${
                        item.bold ? "font-semibold" : ""
                      }`}
                    >
                      {item.label}
                    </a>
                  )}
                </div>
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
