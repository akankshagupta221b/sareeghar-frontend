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
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-base">Cart</span>
              <div className="w-3 h-3 rounded-full bg-gray-400" />
            </div>
            <div className="w-24 h-px bg-gray-300" />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-base text-purple-900">
                Shipping
              </span>
              <div className="w-3 h-3 rounded-full bg-purple-900" />
            </div>
            <div className="w-24 h-px bg-gray-300" />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-base text-purple-900">
                Payment
              </span>
              <div className="w-3 h-3 rounded-full bg-purple-900" />
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
