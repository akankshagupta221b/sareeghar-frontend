"use client";

import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  Truck,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-[#F2F2F2] text-gray-900">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm font-archivo">
                  S
                </span>
              </div>
              <h2 className="text-xl font-bold font-archivo">SareeGhar</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your trusted destination for authentic and beautiful sarees. We
              bring you the finest collection of traditional and modern sarees
              from across India.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 hover:text-blue-600 transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-gray-600" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-pink-100 hover:text-pink-600 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-gray-600" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 hover:text-blue-400 transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-gray-600" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-archivo">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/listing"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm"
                >
                  Shop All Sarees
                </Link>
              </li>
              <li>
                <Link
                  href="/listing?category=silk"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm"
                >
                  Silk Sarees
                </Link>
              </li>
              <li>
                <Link
                  href="/listing?category=cotton"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm"
                >
                  Cotton Sarees
                </Link>
              </li>
              <li>
                <Link
                  href="/listing?category=designer"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm"
                >
                  Designer Sarees
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm"
                >
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-archivo">
              Customer Service
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  href="/size-guide"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm"
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-archivo">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    123 Fashion Street,
                    <br />
                    Mumbai, Maharashtra 400001
                    <br />
                    India
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-600 flex-shrink-0" />
                <div>
                  <p className="text-gray-600 text-sm">+91 98765 43210</p>
                  <p className="text-gray-600 text-sm">+91 87654 32109</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-600 flex-shrink-0" />
                <p className="text-gray-600 text-sm">support@sareeghar.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#F2F2F2] border-t border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600">
              <p>&copy; 2025 SareeGhar. All rights reserved.</p>
              <div className="flex space-x-4">
                <Link
                  href="/privacy"
                  className="hover:text-gray-900 transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-gray-900 transition-colors duration-300"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/cookies"
                  className="hover:text-gray-900 transition-colors duration-300"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Powered by</span>
              <span className="text-gray-900 font-semibold">Next.js 15</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
