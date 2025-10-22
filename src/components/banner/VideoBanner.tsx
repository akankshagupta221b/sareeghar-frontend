import React, { useState, useRef } from "react";
import { Play, Pause, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function VideoBanner() {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  return (
    <section className="relative w-full h-[500px] sm:h-[600px] md:h-[650px] lg:h-[700px] overflow-hidden bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://www.youtube.com/watch?v=pgI-zL1rAZ8"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Elegant Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-purple-900/50 to-pink-900/60" />

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="text-center text-white max-w-5xl w-full">
          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold mb-1 sm:mb-2 tracking-tight leading-tight px-2">
            TIMELESS{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-purple-200 to-pink-200 italic font-serif">
              Elegance
            </span>
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 tracking-tight leading-tight px-2">
            IN EVERY DRAPE
          </h2>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="h-px w-8 sm:w-12 md:w-16 bg-gradient-to-r from-transparent to-white/50" />
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/70" />
            <div className="h-px w-8 sm:w-12 md:w-16 bg-gradient-to-l from-transparent to-white/50" />
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 md:mb-10 text-white/90 font-light leading-relaxed max-w-2xl mx-auto px-4">
            Discover our exquisite collection of handcrafted sarees
            <br className="hidden sm:block" />
            <span className="text-pink-200">
              Where tradition meets contemporary fashion
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
            <Link
              href="/listing"
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-white text-black font-semibold text-sm sm:text-base rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl group w-full sm:w-auto justify-center"
            >
              SHOP SAREES
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
            <Link
              href="/listing"
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-transparent border-2 border-white text-white font-semibold text-sm sm:text-base rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 backdrop-blur-sm group w-full sm:w-auto justify-center"
            >
              VIEW COLLECTIONS
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform duration-500" />
            </Link>
          </div>

          {/* Feature Tags */}
          <div className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/80 px-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-pink-300" />
              <span>Premium Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-purple-300" />
              <span>Authentic Designs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-pink-300" />
              <span>Pan India Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-black/40 to-transparent" />
    </section>
  );
}
