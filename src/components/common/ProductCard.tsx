"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id: string;
  image: string;
  category?: string;
  name: string;
  colors: string[];
  price: number;
  mrp: number;
  sellingPrice: number;
}

export default function ProductCard({
  id,
  image,
  category = "Saree",
  name,
  colors,
  price,
  mrp,
  sellingPrice,
}: ProductCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/listing/${id}`)}
      className="group relative bg-white overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={name}
          width={500}
          height={700}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* NEW Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-primary text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full shadow">
            NEW
          </span>
        </div>

        {/* Quick View Overlay - Desktop */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 hidden sm:flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/listing/${id}`);
            }}
            className="bg-white text-black hover:bg-gray-100 px-6 py-3 text-sm font-semibold rounded-full shadow-lg transition-all duration-300"
          >
            QUICK VIEW
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4 flex flex-col gap-3">
        {/* Category */}
        <p className="hidden sm:block text-xs text-gray-500 tracking-wide uppercase">
          {category}
        </p>

        {/* Product Name */}
        <h3 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2 min-h-[42px] group-hover:text-primary transition-colors">
          {name}
        </h3>

        {/* Price + Arrow */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            {/* MRP */}
            {mrp > sellingPrice && (
              <p className="line-through text-gray-400 text-xs sm:text-sm">
                ₹{mrp.toLocaleString("en-IN")}
              </p>
            )}

            {/* Selling Price + Discount */}
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-base sm:text-lg font-semibold text-gray-900">
                ₹{sellingPrice.toLocaleString("en-IN")}
              </p>

              {mrp > sellingPrice && (
                <p className="text-xs sm:text-sm font-medium text-green-600">
                  {Math.round(
                    ((mrp - sellingPrice) / mrp) * 100
                  )}
                  % OFF
                </p>
              )}
            </div>
          </div>

          {/* Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/listing/${id}`);
            }}
            className="shrink-0 p-2 rounded-full border border-gray-200 text-primary hover:bg-primary hover:text-white transition-all duration-300"
            aria-label="View product"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 sm:w-5 sm:h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}