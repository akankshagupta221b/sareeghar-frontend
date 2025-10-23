"use client";

import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  // Handle ESC key to close fullscreen
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullscreen) {
        closeFullscreen();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isFullscreen]);

  // Prevent body scroll when fullscreen is open
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFullscreen]);

  const thumbnails = images.slice(0, 5);

  return (
    <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
      {/* Desktop Thumbnails */}
      <div className="hidden lg:flex flex-col gap-2 sm:gap-3">
        {thumbnails.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-16 h-20 sm:w-20 sm:h-24 border-2 overflow-hidden rounded-md transition-all ${
              currentImage === index ? "border-black" : "border-gray-200"
            }`}
          >
            <Image
              src={img}
              alt={`${productName} ${index + 1}`}
              className="w-full h-full object-contain"
              width={400}
              height={300}
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 relative bg-gray-100 rounded-md overflow-hidden aspect-[3/4] group">
        <div
          onClick={openFullscreen}
          className="cursor-zoom-in w-full h-full flex items-start justify-center pt-2"
        >
          <Image
            src={images[currentImage]}
            alt={productName}
            className="w-full h-auto object-contain"
            width={400}
            height={300}
          />
        </div>

        {/* Zoom In Icon Hint */}
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-black/60 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </>
        )}

        {/* Model Info Badge */}
        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-white rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-lg flex items-center gap-2 text-[10px] sm:text-xs">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2L12 6M12 18L12 22M6 8L4 6M18 8L20 6M6 16L4 18M18 16L20 18" />
            <rect x="6" y="6" width="12" height="12" rx="1" />
          </svg>
          <div className="hidden xs:block">
            <div className="font-semibold">HEIGHT OF THE MODEL IS 173 CM</div>
            <div className="text-gray-600">SIZE ON THE MODEL IS XS</div>
          </div>
        </div>

        {/* Image Counter */}
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium">
          {currentImage + 1} / {images.length}
        </div>
      </div>

      {/* Mobile Thumbnails */}
      <div className="mt-2 flex lg:hidden gap-2 overflow-x-auto pb-1">
        {thumbnails.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`min-w-[64px] w-16 h-20 sm:min-w-[80px] sm:w-20 sm:h-24 border-2 overflow-hidden rounded-md transition-all ${
              currentImage === index ? "border-black" : "border-gray-200"
            }`}
          >
            <Image
              src={img}
              alt={`${productName} ${index + 1}`}
              className="w-full h-full object-contain"
              width={400}
              height={300}
            />
          </button>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* ESC Key Hint */}
          <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm">
            Press <kbd className="px-2 py-1 bg-white/20 rounded">ESC</kbd> to
            close
          </div>

          {/* Image Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
            {currentImage + 1} / {images.length}
          </div>

          {/* Main Fullscreen Image */}
          <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8">
            <Image
              src={images[currentImage]}
              alt={productName}
              className="max-w-full max-h-full object-contain"
              width={1200}
              height={1600}
            />
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}

          {/* Thumbnail Navigation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] pb-2">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`min-w-[60px] w-[60px] h-[80px] border-2 overflow-hidden rounded-md transition-all ${
                  currentImage === index
                    ? "border-white scale-110"
                    : "border-white/30 hover:border-white/60"
                }`}
              >
                <Image
                  src={img}
                  alt={`${productName} ${index + 1}`}
                  className="w-full h-full object-contain bg-white/10"
                  width={60}
                  height={80}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
