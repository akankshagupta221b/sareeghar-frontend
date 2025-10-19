"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import {
  X,
  Heart,
  ChevronRight,
  ArrowLeft,
  HelpCircle,
  Lock,
  ShoppingCart as ShoppingCartIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

function UserCartPage() {
  const {
    fetchCart,
    items,
    isLoading,
    updateCartItemQuantity,
    removeFromCart,
  } = useCartStore();
  const { user } = useAuthStore();
  const [isUpdating, setIsUpdating] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    setIsUpdating(true);
    await updateCartItemQuantity(id, Math.max(1, newQuantity));
    setIsUpdating(false);
  };

  const handleRemoveItem = async (id: string) => {
    setIsUpdating(true);
    await removeFromCart(id);
    setIsUpdating(false);
  };

  // Calculate totals
  const deliveryFee = 0;
  const subtotal = items.reduce(
    (sum, item) => sum + item.sellingPrice * item.quantity,
    0
  );
  const cgstAmount = subtotal * 0.025;
  const sgstAmount = subtotal * 0.025;
  const discount = 0;
  const total = subtotal + deliveryFee + cgstAmount + sgstAmount - discount;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              Please log in to view your cart
            </h1>
            <Link href="/auth/login">
              <Button className="bg-gray-900 hover:bg-gray-800">
                Go to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <ShoppingCartIcon className="mx-auto h-24 w-24 text-gray-400 mb-6" />
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link href="/listing">
              <Button className="bg-gray-900 hover:bg-gray-800 rounded-full px-8 py-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                CONTINUE SHOPPING
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap mb-6 sm:mb-8 md:mb-12">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm sm:text-base">Cart</span>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-black" />
          </div>
          <div className="w-16 sm:w-24 h-px bg-gray-300" />
          <span className="text-gray-400 text-sm sm:text-base">Shipping</span>
          <div className="w-16 sm:w-24 h-px bg-gray-300" />
          <span className="text-gray-400 text-sm sm:text-base">Payment</span>
        </div>

        <div className="grid lg:grid-cols-[1fr,380px] gap-6 sm:gap-8 lg:gap-12">
          {/* Left Section - Products */}
          <div>
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-[1fr,100px,150px,100px] gap-4 pb-4 border-b border-gray-200 mb-4 sm:mb-6 text-xs text-gray-500 uppercase tracking-wide">
              <div>PRODUCT</div>
              <div className="text-center">SIZE</div>
              <div className="text-center">QUANTITY</div>
              <div className="text-right">PRICE (₹)</div>
            </div>

            {/* Cart Items */}
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid md:grid-cols-[1fr,100px,150px,100px] grid-cols-1 gap-3 sm:gap-4 items-center pb-5 sm:pb-6 border-b border-gray-200"
                >
                  {/* Product */}
                  <div className="flex gap-3 sm:gap-4 items-center">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={isUpdating}
                      className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <Image
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                    <div>
                      <p className="text-[11px] xs:text-xs text-gray-500 mb-1">
                        Saree
                      </p>
                      <h3 className="text-sm sm:text-base font-semibold mb-2 line-clamp-2">
                        {item.name}
                      </h3>
                      <div
                        className="w-4 h-4 sm:w-5 sm:h-5 rounded-sm border border-gray-300"
                        style={{ backgroundColor: item.color }}
                        title={item.color}
                      />
                    </div>
                  </div>

                  {/* Size */}
                  <div className="md:text-center">
                    <div className="md:hidden text-[10px] xs:text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Size
                    </div>
                    <div className="flex items-center md:justify-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded text-xs sm:text-sm font-medium">
                      {item.size}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex md:flex-row flex-col md:items-center items-start md:justify-center gap-2 md:gap-3">
                    <div className="md:hidden text-[10px] xs:text-xs text-gray-500 uppercase tracking-wide">
                      Quantity
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={isUpdating || item.quantity <= 1}
                        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity + 1)
                        }
                        disabled={isUpdating}
                        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                      <button className="text-gray-400 hover:text-red-500 transition-colors md:ml-2">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="md:text-right flex md:block items-center justify-between w-full">
                    <span className="md:hidden text-[10px] xs:text-xs text-gray-500 uppercase tracking-wide">
                      Price
                    </span>
                    <div>
                      <span className="text-base sm:text-lg font-bold">
                        {/* {(parseFloat(item.sellingPrice) * item.quantity).toFixed(2)} */}
                        {item.sellingPrice}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500">
                        {" "}
                        ₹
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping Button */}
            <Link href="/listing">
              <button
                className="mt-6 sm:mt-8 w-full sm:w-auto justify-center flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
                disabled={isUpdating}
              >
                <ArrowLeft className="w-4 h-4" />
                CONTINUE SHOPPING
              </button>
            </Link>
          </div>

          {/* Right Section - Summary */}
          <div>
            <div className="space-y-4">
              {/* Total */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide">
                  TOTAL
                </span>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-bold">
                    {total.toFixed(2)}
                  </span>
                  <span className="text-base sm:text-lg text-gray-500"> ₹</span>
                </div>
              </div>

              {/* Delivery */}
              {/* <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="uppercase tracking-wide">
                    DELIVERY 3-4 B.D
                  </span>
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </div>
                <span className="font-semibold">FREE</span>
              </div> */}

              {/* CGST */}
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="uppercase tracking-wide">CGST +2.5%</span>
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </div>
                <span className="font-semibold">{cgstAmount.toFixed(2)}₹</span>
              </div>

              {/* SGST */}
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="uppercase tracking-wide">SGST +2.5%</span>
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </div>
                <span className="font-semibold">{sgstAmount.toFixed(2)}₹</span>
              </div>

              {/* Discount */}
              <div className="flex items-center justify-between text-xs sm:text-sm pb-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="uppercase tracking-wide">DISCOUNT</span>
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </div>
                <span className="text-gray-500">-{discount}%</span>
              </div>

              {/* Promo Code */}
              {/* <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="PROMO-CODE"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-400"
                />
                <button
                  onClick={applyPromoCode}
                  className="px-6 py-3 bg-white border border-gray-300 rounded font-semibold text-sm hover:bg-gray-50 transition-colors uppercase tracking-wide"
                >
                  APPLY
                </button>
              </div> */}

              {/* Make Order Button */}
              <button
                onClick={() => router.push("/checkout")}
                disabled={isUpdating}
                className="w-full flex items-center justify-center gap-3 px-5 sm:px-6 py-3.5 sm:py-4 bg-primary text-white rounded-full hover:bg-secondary-foreground transition-colors font-medium uppercase tracking-wide mt-4 sm:mt-6 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isUpdating ? "UPDATING..." : "MAKE ORDER"}
                <span className="ml-auto">→</span>
              </button>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600 pt-3 sm:pt-4">
                <Lock className="w-4 h-4" />
                PAYMENT SECURITY SSL
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCartPage;
