import React, { useEffect } from "react";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { useSettingsStore } from "@/store/useSettingsStore";
import Image from "next/image";
import Link from "next/link";

// Footer menu items configuration
const footerMenus = [
  {
    title: "Customer Care",
    links: [
      { label: "Shipping & Delivery", href: "/account" },
      { label: "Order Tracking", href: "/account" },
      { label: "FAQs", href: "/contact-us" },
      { label: "Contact Us", href: "/contact-us" },
      { label: "About Us", href: "/about" },
      { label: "Help Center", href: "/about" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "New Arrivals", href: "/listing" },
      { label: "Best Sellers", href: "/listing" },
      { label: "Collections", href: "/listing" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Return Policy", href: "#" },
      { label: "Shipping Policy", href: "#" },
    ],
  },
];

export default function Footer2() {
  const { storeSettings, fetchStoreSettings } = useSettingsStore();

  useEffect(() => {
    fetchStoreSettings();
  }, [fetchStoreSettings]);

  const socialLinks = [
    { Icon: Instagram, href: storeSettings?.instagramUrl, label: "Instagram" },
    { Icon: Facebook, href: storeSettings?.facebookUrl, label: "Facebook" },
    { Icon: Youtube, href: storeSettings?.youtubeUrl, label: "Youtube" },
  ];

  return (
    <footer className="bg-secondary text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 mb-10 md:mb-12 lg:mb-16">
          {/* Left Column - Description */}
          <div className="max-w-xl">
            <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">
              {storeSettings?.name || "Saree Ghar"} is your trusted destination
              for premium sarees and ethnic wear, bringing elegance and
              tradition to your wardrobe with our carefully curated collection.
            </p>
          </div>

          {/* Right Column - Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {footerMenus.map((menu, index) => (
              <div key={index}>
                <h3 className="font-semibold text-black mb-3 sm:mb-4 text-xs sm:text-sm lg:text-base">
                  {menu.title}
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {menu.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-black transition-colors text-xs sm:text-sm lg:text-base"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mb-10 md:mb-12 lg:mb-16">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6 text-black">
            Get the latest updates from {storeSettings?.name || "Saree Ghar"}
          </h3>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-2xl">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-black placeholder-gray-400 focus:outline-none focus:border-gray-400 text-xs sm:text-sm lg:text-base"
            />
            <button className="bg-black text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm lg:text-base whitespace-nowrap">
              Subscribe
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom Section with Logo and Social Icons */}
        <div className="relative pt-8 md:pt-12 lg:pt-16">
          {/* Large Brand Name Background - Hidden on mobile to prevent overlap */}
          <div className="absolute inset-0 hidden md:flex items-center justify-center overflow-hidden pointer-events-none opacity-10">
            <div className="text-black font-bold font-secondary text-[15vw] md:text-[12vw] lg:text-[8vw] xl:text-[6vw] leading-none select-none uppercase">
              {storeSettings?.name || "Saree Ghar"}
            </div>
          </div>

          {/* Logo and Social Icons */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 mb-8 md:mb-12">
            {/* Logo */}
            <div className="flex items-center justify-center">
              <Image
                src="/logo/saree-ghar-2.png"
                alt={`${storeSettings?.name || "Saree Ghar"} Logo`}
                className="w-14 h-16 sm:w-16 sm:h-20 md:w-20 md:h-24 lg:w-24 lg:h-28 object-contain"
                width={96}
                height={112}
              />
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 sm:gap-4">
              {socialLinks.map((social, index) => {
                const { Icon } = social;
                return (
                  <Link
                    key={index}
                    href={social.href || "#"}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom Links */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 md:pt-8 border-t border-gray-300">
            <p className="text-gray-600 text-xs sm:text-sm">
              © 2024 {storeSettings?.name || "Saree Ghar"}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <Link
                href="/privacy-policy"
                className="text-gray-600 hover:text-black transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-black transition-colors"
              >
                Refund Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="text-gray-600 hover:text-black transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
