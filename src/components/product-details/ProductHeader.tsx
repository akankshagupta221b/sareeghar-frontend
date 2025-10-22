"use client";

import { Heart } from "lucide-react";
import { useState } from "react";

interface ProductHeaderProps {
  category?: string;
  name: string;
  price: number;
  mrp: number;
  sellingPrice: number;
  onFavoriteToggle?: (isFavorite: boolean) => void;
}

export default function ProductHeader({
  category = "Saree",
  name,
  price,
  mrp,
  sellingPrice,
  onFavoriteToggle,
}: ProductHeaderProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    onFavoriteToggle?.(newFavoriteState);
  };

  const discount =
    mrp > sellingPrice ? Math.round(((mrp - sellingPrice) / mrp) * 100) : 0;

  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-xs sm:text-sm text-black/50 mb-1 sm:mb-2">
          {category}
        </p>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-medium mb-2 sm:mb-4 leading-snug">
          {name}
        </h1>

        <div className="text-xl sm:text-2xl md:text-3xl font-medium flex items-center space-x-2">
          <span>₹{sellingPrice.toFixed(2)}</span>

          {mrp > sellingPrice && (
            <>
              <span className="text-base sm:text-lg text-gray-500 line-through font-normal">
                ₹{mrp.toFixed(2)}
              </span>
              <span className="text-sm sm:text-base text-green-600 font-semibold">
                ({discount}% OFF)
              </span>
            </>
          )}
        </div>
      </div>

      {/* <button
        onClick={handleFavoriteClick}
        className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${
            isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
          }`}
        />
      </button> */}
    </div>
  );
}
