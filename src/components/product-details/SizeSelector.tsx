"use client";

import { ChevronRight } from "lucide-react";

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeSelect: (size: string) => void;
}

export default function SizeSelector({
  sizes,
  selectedSize,
  onSizeSelect,
}: SizeSelectorProps) {
  return (
    <div>
      <button
        onClick={() => {
          // Toggle size dropdown or modal
          const nextIndex = sizes.indexOf(selectedSize);
          const newIndex = (nextIndex + 1) % sizes.length;
          onSizeSelect(sizes[newIndex]);
        }}
        className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded hover:border-gray-400 transition-colors"
      >
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-xs sm:text-sm font-medium uppercase tracking-wide">
            Size
          </span>
          <span className="text-xs sm:text-sm font-semibold">
            {selectedSize || "Select"}
          </span>
        </div>
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
      </button>

      {/* Size Grid - Alternative Display */}
      <div className="mt-3 grid grid-cols-4 xs:grid-cols-5 gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeSelect(size)}
            className={`py-1.5 sm:py-2 text-xs sm:text-sm font-medium border rounded transition-all ${
              selectedSize === size
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-300 hover:border-black"
            }`}
          >
            {size}
          </button>
        ))}
      </div>

      {/* Dimensional Grid Link */}
      <div className="text-right mt-2">
        <button className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 uppercase tracking-wide hover:underline">
          Size Guide
        </button>
      </div>
    </div>
  );
}
