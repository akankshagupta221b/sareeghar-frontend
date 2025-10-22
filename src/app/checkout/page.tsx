"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import CheckoutSuspense from "./checkoutSkeleton";

function CheckoutPage() {
  const options = {
    clientId:
      "AYYtmQuBVHm_q4fO-nRv84xIKhQk1-BdhSLckYRxcBJLhxI5EcxafPKdkvKpqLDP-pNLNXalxvlUSgZE",
  };

  return (
    <PayPalScriptProvider options={options}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-12 overflow-x-auto">
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <span className="font-semibold text-xs sm:text-sm md:text-base">
                Cart
              </span>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gray-400" />
            </div>
            <div className="w-8 sm:w-16 md:w-24 h-px bg-gray-300 flex-shrink-0" />
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <span className="font-semibold text-xs sm:text-sm md:text-base text-purple-900">
                Shipping
              </span>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-purple-900" />
            </div>
            <div className="w-8 sm:w-16 md:w-24 h-px bg-gray-300 flex-shrink-0" />
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <span className="font-semibold text-xs sm:text-sm md:text-base text-purple-900">
                Payment
              </span>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-purple-900" />
            </div>
          </div>

          {/* Checkout Content */}
          <CheckoutSuspense />
        </div>
      </div>
    </PayPalScriptProvider>
  );
}

export default CheckoutPage;
