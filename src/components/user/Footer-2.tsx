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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
          {/* Left Column - Description */}
          <div className="max-w-xl">
            <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
              {storeSettings?.name || "Saree Ghar"} is your trusted destination
              for premium sarees and ethnic wear, bringing elegance and
              tradition to your wardrobe with our carefully curated collection.
            </p>
          </div>

          {/* Right Column - Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12">
            {footerMenus.map((menu, index) => (
              <div key={index}>
                <h3 className="font-semibold text-black mb-4 text-sm lg:text-base">
                  {menu.title}
                </h3>
                <ul className="space-y-3">
                  {menu.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base"
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
        <div className="mb-16">
          <h3 className="text-xl lg:text-2xl font-semibold mb-6 text-black">
            Get the latest updates from {storeSettings?.name || "Saree Ghar"}
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:border-gray-400 text-sm lg:text-base"
            />
            <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-sm lg:text-base whitespace-nowrap">
              Subscribe
              <svg
                className="w-4 h-4"
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
        <div className="relative pt-16">
          {/* Large Brand Name Background */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            <div className="text-black font-bold text-[12vw] font-secondary sm:text-[10vw] lg:text-[6vw] leading-none select-none uppercase">
              {storeSettings?.name || "Saree Ghar"}
            </div>
          </div>

          {/* Logo and Social Icons */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8 mb-12">
            {/* Logo */}
            <div className="flex items-center justify-center">
              <Image
                src="/logo/saree-ghar-2.png"
                alt={`${storeSettings?.name || "Saree Ghar"} Logo`}
                className="w-16 h-20  sm:w-20 sm:h-24 object-contain"
                width={80}
                height={96}
              />
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => {
                const { Icon } = social;
                return (
                  <Link
                    key={index}
                    href={social.href || "#"}
                    className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom Links */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-300">
            <p className="text-gray-600 text-sm">
              © 2024 {storeSettings?.name || "Saree Ghar"}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
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
