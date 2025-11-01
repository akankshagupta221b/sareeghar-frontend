"use client";

import { Calendar, ShoppingCart } from "lucide-react";
import { HandBag02Icon } from "hugeicons-react";
import DeliveryInfoPanel from "./DeliveryInfoPanel";
import ProductInfoPanel from "./ProductInfoPanel";
import { useRouter } from "next/navigation";

interface ProductActionsProps {
  onAddToCart: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  product: any;
  isAddedToCart?: boolean;
}

// Product specifications
const specifications = [
  "TRADITIONAL STYLE",
  "PREMIUM FABRIC",
  "INTRICATE DESIGN",
  "COMFORTABLE FIT",
  "HAND-CRAFTED DETAILS",
  "AUTHENTIC CRAFTSMANSHIP",
];

export default function ProductActions({
  onAddToCart,
  isLoading = false,
  disabled = false,
  product,
  isAddedToCart = false,
}: ProductActionsProps) {
  const router = useRouter();

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Add to Cart Button */}
      <button
        onClick={onAddToCart}
        disabled={isLoading}
        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 sm:py-4 rounded-lg flex items-center justify-center gap-2 sm:gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
      >
        <HandBag02Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        {isLoading
          ? "Adding..."
          : isAddedToCart
          ? "PROCEED TO BUY"
          : "ADD TO CART"}
      </button>

      {/* Go to Cart Button */}
      <button
        onClick={() => router.push("/cart")}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 sm:py-4 rounded-lg flex items-center justify-center gap-2 sm:gap-3 transition-colors text-sm sm:text-base border border-gray-300"
      >
        <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
        GO TO CART
      </button>

      {/* Resend Date */}
      <button className="w-full flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 hover:text-gray-700 py-1.5 sm:py-2 transition-colors text-center">
        {/* <Calendar className="w-4 h-4" /> */}
        {/* <span className="hidden xs:inline">WILL YOU RESEND IT ON THE SELECTED DATE?</span> */}
        <span className="xs:hidden">RESEND ON SELECTED DATE?</span>
      </button>

      <div className="mt-8 sm:mt-10 md:mt-12">
        <ProductInfoPanel
          description={product.description}
          specifications={specifications}
          composition="100% Premium Fabric"
          productId={product.id}
          manufacturerCode={product.sku || "N/A"}
        />
      </div>
    </div>
  );
}
