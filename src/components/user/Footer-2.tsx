import React, { useEffect } from "react";
import { Gift, Instagram, Facebook, Twitter } from "lucide-react";
import { useSettingsStore } from "@/store/useSettingsStore";

// Footer menu items configuration
const footerMenus = [
  {
    title: "Customer Care",
    links: [
      { label: "Return & Exchange Policy", href: "#" },
      { label: "Shipping & Delivery", href: "#" },
      { label: "Order Tracking", href: "#" },
      { label: "FAQs", href: "/contact-us" },
      { label: "Contact Us", href: "#" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "New Arrivals", href: "#" },
      { label: "Best Sellers", href: "#" },
      { label: "Gift Cards", href: "#" },
      { label: "Size Guide", href: "#" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms & Conditions", href: "#" },
      { label: "Return Policy", href: "#" },
      { label: "Shipping Policy", href: "#" },
    ],
  },
];

// Social media links configuration

// Bottom links configuration
const bottomLinks = [
  { label: "TERMS & CONDITIONS", href: "/about" },
  { label: "PRIVACY POLICY", href: "/about" },
];

export default function Footer2() {
  const { storeSettings, fetchStoreSettings } = useSettingsStore();

  useEffect(() => {
    fetchStoreSettings();
  }, [fetchStoreSettings]);

  const socialLinks = [
    { Icon: Instagram, href: storeSettings?.instagramUrl, label: "Instagram" },
    { Icon: Facebook, href: storeSettings?.facebookUrl, label: "Facebook" },
    { Icon: Twitter, href: storeSettings?.twitterUrl, label: "Twitter" },
    {
      Icon: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95 0-5.52-4.48-10-10-10z" />
        </svg>
      ),
      href: storeSettings?.facebookUrl,
      label: "Facebook",
    },
  ];

  return (
    <footer className="bg-white">
      {/* Newsletter Section */}
      <div className="border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left - Image */}
            <div className="relative h-44 md:h-48 overflow-hidden">
              <img
                src="/images/footer-image.jpg"
                alt="Shopping"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right - Newsletter Form */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-sm">
                <Gift className="w-5 h-5" />
                <span>Get -10% on any order</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-medium text-secondary-foreground leading-tight">
                ON YOUR FIRST PURCHASE
                <br />
                BY SUBSCRIBING
              </h2>

              <div className="relative">
                <input
                  type="email"
                  placeholder="YOUR E-MAIL"
                  className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-black outline-none text-sm placeholder:text-gray-400 bg-transparent"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all">
                  <span className="text-lg">→</span>
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            {/* Logo + Brand Name */}
            <div className="flex items-center space-x-3">
              <img
                src="/logo/saree-ghar.jpg" // Replace with your actual logo path
                alt="Saree Ghar Logo"
                className="w-24 h-32 object-contain"
              />
              <h3 className="text-3xl font-bold font-secondary">
                {storeSettings?.name != null
                  ? storeSettings?.name.toUpperCase()
                  : "SAREE GHAR"}
              </h3>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <p>
                {storeSettings?.email != null
                  ? storeSettings?.email
                  : "contact@sareeghar.com"}
              </p>
              <p>
                {storeSettings?.phone != null
                  ? storeSettings?.phone
                  : "+91 789-502-3356"}
              </p>
            </div>
          </div>

          {/* Dynamic Menu Columns */}
          {footerMenus.map((menu, index) => (
            <div key={index} className="space-y-4">
              <h4 className="text-base text-gray-500 mb-6">{menu.title}</h4>
              <ul className="space-y-3 text-base text-secondary-foreground font-medium">
                {menu.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="hover:underline">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Follow Us Column */}
          <div className="space-y-4">
            <h4 className="text-base text-black/50 mb-6">Follow us</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const { Icon } = social;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="hover:opacity-70 transition-opacity"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-gray-500">
            <div className="flex flex-wrap items-center gap-4">
              {bottomLinks.map((link, index) => (
                <a key={index} href={link.href} className="hover:underline">
                  {link.label}
                </a>
              ))}
            </div>

            <div className="text-right">
              <p>made with love</p>
              <p className="font-medium">{storeSettings?.name}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
