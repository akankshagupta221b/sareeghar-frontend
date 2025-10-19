"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

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
              className="w-full h-full object-cover"
              width={400}
              height={300}
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 relative bg-gray-100 rounded-md overflow-hidden aspect-[3/4]">
        <Image
          src={images[currentImage]}
          alt={productName}
          className="absolute inset-0 w-full h-full object-cover"
          width={400}
          height={300}
        />

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
              className="w-full h-full object-cover"
              width={400}
              height={300}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
