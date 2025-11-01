"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, Search, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4 py-16">
      <div className="max-w-4xl w-full">
        <div className="text-center">
          {/* 404 Text */}
          <div className="mb-8">
            <h1 className="text-[150px] md:text-[200px] font-bold leading-none text-gray-900 opacity-10">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-2">
              The page you're looking for seems to have wandered off like a
              beautiful saree in the wind.
            </p>
            <p className="text-base text-gray-500">
              Don't worry, let's get you back on track!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/">
              <Button className="w-full sm:w-auto px-8 py-6 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 group">
                <Home className="w-5 h-5" />
                Back to Home
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="/listing">
              <Button className="w-full sm:w-auto px-8 py-6 bg-white text-gray-900 font-semibold rounded-lg border-2 border-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Browse Products
              </Button>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="border-t border-gray-200 pt-8">
            <p className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
              Quick Links
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link
                href="/about"
                className="text-gray-600 hover:text-gray-900 hover:underline font-medium"
              >
                About Us
              </Link>
              <Link
                href="/contact-us"
                className="text-gray-600 hover:text-gray-900 hover:underline font-medium"
              >
                Contact Us
              </Link>
              <Link
                href="/cart"
                className="text-gray-600 hover:text-gray-900 hover:underline font-medium"
              >
                Shopping Cart
              </Link>
              <Link
                href="/account"
                className="text-gray-600 hover:text-gray-900 hover:underline font-medium"
              >
                My Account
              </Link>
              <Link
                href="/privacy-policy"
                className="text-gray-600 hover:text-gray-900 hover:underline font-medium"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Search Suggestion */}
          <div className="mt-12 p-6 bg-gray-100 rounded-lg max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 text-gray-700 mb-2">
              <Search className="w-5 h-5" />
              <p className="font-semibold">Looking for something specific?</p>
            </div>
            <p className="text-sm text-gray-600">
              Try using the search bar at the top of the page or browse our
              collections
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
