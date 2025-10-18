"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

// Promo banners configuration
const promoBanners = [
  {
    title: "PREMIUM SALE",
    discount: "-10%",
    link: "#",
    linkText: "VIEW MORE",
    backgroundImage:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "FESTIVE COLLECTION",
    discount: "-25%",
    link: "#",
    linkText: "SHOP NOW",
    backgroundImage:
      "https://images.unsplash.com/photo-1583391733981-5954a3d51d05?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "NEW ARRIVALS",
    discount: "-15%",
    link: "#",
    linkText: "EXPLORE",
    backgroundImage:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=2000&auto=format&fit=crop",
  },
];

export default function PromoBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Auto-rotate banners every 5 seconds
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % promoBanners.length);
        setIsTransitioning(false);
      }, 300); // Fade duration
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentPromo = promoBanners[currentIndex];

  return (
    <div className="relative w-full h-8 overflow-hidden bg-primary">
      {/* Background Image */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 transition-opacity duration-300 ${
          isTransitioning ? "opacity-0" : "opacity-30"
        }`}
        style={{
          backgroundImage: `url('${currentPromo.backgroundImage}')`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/60" />

      {/* Content */}
      <div
        className={`relative z-10 h-full flex items-center justify-center gap-3 px-4 transition-opacity duration-300 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        <h2 className="text-white text-xs tracking-wider font-medium whitespace-nowrap">
          {currentPromo.title}
        </h2>
        <span className="px-2 py-0.5 rounded-full bg-secondary backdrop-blur-sm text-primary italic font-bold text-xs leading-none">
          {currentPromo.discount}
        </span>

        <a
          href={currentPromo.link}
          className="flex items-center gap-1.5 text-white font-medium text-xs tracking-wide hover:text-orange-200 transition-colors group whitespace-nowrap"
        >
          {currentPromo.linkText}
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}
