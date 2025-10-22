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
      className="bg-white w-full group cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-2 sm:mb-3 md:mb-4 rounded-md">
        <Image
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          width={400}
          height={300}
        />
      </div>

      {/* Product Info */}
      <div className="space-y-1 sm:space-y-2">
        {/* Category */}
        <p className="text-xs sm:text-sm text-gray-500">{category}</p>

        {/* Brand/Product Name */}
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium uppercase tracking-wide line-clamp-2">
          {name}
        </h3>

        {/* Price Row */}
        <div className="flex items-center justify-between gap-2">
          {/* Price section */}
          <p className="text-sm sm:text-base md:text-lg font-bold whitespace-nowrap">
            ₹{sellingPrice.toFixed(2)}
            {mrp && mrp > sellingPrice && (
              <>
                <span className="ml-2 text-xs sm:text-sm text-gray-500 line-through font-normal">
                  ₹{mrp.toFixed(2)}
                </span>
                <span className="ml-2 text-xs sm:text-sm text-green-600 font-semibold">
                  ({Math.round(((mrp - sellingPrice) / mrp) * 100)}% OFF)
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
