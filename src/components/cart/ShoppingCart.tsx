import React, { useState } from "react";
import {
  X,
  Heart,
  ChevronRight,
  ArrowLeft,
  HelpCircle,
  Lock,
} from "lucide-react";

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80",
      category: "jacket",
      brand: "MANGO — WINTOUR",
      size: "XS",
      quantity: 1,
      price: 105,
      color: "#2d2d2d",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&q=80",
      category: "jacket",
      brand: "MEDICINE — TROPICAL CHAOS",
      size: "L",
      quantity: 1,
      price: 99,
      color: "#e8d5c8",
    },
  ]);

  const [promoCode, setPromoCode] = useState("");

  const deliveryFee = 0;
  const vatRate = 0.09;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const vatAmount = subtotal * vatRate;
  const total = subtotal + deliveryFee + vatAmount;
  const discount = 0;

  const updateQuantity = (id, delta) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    console.log("Applying promo code:", promoCode);
    // Add promo code logic here
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-base">Cart</span>
            <div className="w-3 h-3 rounded-full bg-black" />
          </div>
          <div className="w-24 h-px bg-gray-300" />
          <span className="text-gray-400 text-base">Shipping</span>
          <div className="w-24 h-px bg-gray-300" />
          <span className="text-gray-400 text-base">Payment</span>
        </div>

        <div className="grid lg:grid-cols-[1fr,400px] gap-12">
          {/* Left Section - Products */}
          <div>
            {/* Table Header */}
            <div className="grid grid-cols-[1fr,100px,150px,100px] gap-4 pb-4 border-b border-gray-200 mb-6 text-xs text-gray-500 uppercase tracking-wide">
              <div>PRODUCT</div>
              <div className="text-center">SIZE</div>
              <div className="text-center">AMOUNT</div>
              <div className="text-right">PRICE (USD)</div>
            </div>

            {/* Cart Items */}
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[1fr,100px,150px,100px] gap-4 items-center pb-6 border-b border-gray-200"
                >
                  {/* Product */}
                  <div className="flex gap-4 items-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <img
                      src={item.image}
                      alt={item.brand}
                      className="w-20 h-24 object-cover"
                    />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">
                        {item.category}
                      </p>
                      <h3 className="text-sm font-semibold mb-2">
                        {item.brand}
                      </h3>
                      <div
                        className="w-5 h-5 rounded-sm border border-gray-300"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </div>

                  {/* Size */}
                  <div className="text-center">
                    <button className="flex items-center justify-center gap-1 px-4 py-2 border border-gray-300 rounded hover:border-gray-400 transition-colors text-sm font-medium">
                      {item.size}
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    >
                      +
                    </button>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                    <span className="text-xs uppercase tracking-wide text-gray-600">
                      Wishlist
                    </span>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <span className="text-lg font-bold">{item.price}</span>
                    <span className="text-sm text-gray-500"> $</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping Button */}
            <button className="mt-8 flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              CONTINUE SHOPPING
            </button>
          </div>

          {/* Right Section - Summary */}
          <div>
            <div className="space-y-4">
              {/* Total */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <span className="text-sm font-semibold uppercase tracking-wide">
                  TOTAL
                </span>
                <div className="text-right">
                  <span className="text-3xl font-bold">{total.toFixed(2)}</span>
                  <span className="text-lg text-gray-500"> $</span>
                </div>
              </div>

              {/* Delivery */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="uppercase tracking-wide">
                    DELIVERY 3-4 B.D
                  </span>
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </div>
                <span className="font-semibold">FREE</span>
              </div>

              {/* VAT */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="uppercase tracking-wide">VAT +9%</span>
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </div>
                <span className="font-semibold">{vatAmount.toFixed(2)}$</span>
              </div>

              {/* Discount */}
              <div className="flex items-center justify-between text-sm pb-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="uppercase tracking-wide">DISCONT</span>
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </div>
                <span className="text-gray-500">-{discount}%</span>
              </div>

              {/* Promo Code */}
              <div className="flex gap-2">
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
              </div>

              {/* Make Order Button */}
              <button className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-purple-900 text-white rounded-lg hover:bg-purple-800 transition-colors font-semibold uppercase tracking-wide mt-6">
                MAKE ORDER
                <span className="ml-auto">→</span>
              </button>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 pt-4">
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
