import React, { useState } from "react";
import { Check, Lock, HelpCircle, ChevronDown } from "lucide-react";

export default function CheckoutForms() {
  const [activeStep, setActiveStep] = useState("shipping"); // 'shipping' or 'payment'

  // Shipping state
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [shippingForm, setShippingForm] = useState({
    street: "",
    country: "",
    aptSuit: "",
    zipcode: "",
    city: "",
    state: "",
  });

  // Payment state
  const [paymentForm, setPaymentForm] = useState({
    email: "",
    newsletter: false,
    cardNumber: "",
    mmYy: "",
    cvc: "",
    cardholderName: "",
    useShoppingAddress: false,
    billingCountry: "United States",
    zipcode: "",
    city: "",
    vatNumber: "",
  });

  const [discount, setDiscount] = useState("-19%");

  const deliveryFee = 0;
  const vatAmount = 18.36;
  const subtotal = 180.11;
  const total = subtotal + deliveryFee + vatAmount;

  const handleShippingChange = (field: any, value: any) => {
    setShippingForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field: any, value: any) => {
    setPaymentForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Tab Navigation */}
        <div className="flex gap-2 sm:gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => setActiveStep("shipping")}
            className={`px-4 sm:px-6 py-2 font-semibold text-xs sm:text-sm rounded-t-lg transition-colors ${
              activeStep === "shipping"
                ? "bg-white text-black border-b-2 border-black"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            SHIPPING
          </button>
          <button
            onClick={() => setActiveStep("payment")}
            className={`px-4 sm:px-6 py-2 font-semibold text-xs sm:text-sm rounded-t-lg transition-colors ${
              activeStep === "payment"
                ? "bg-white text-black border-b-2 border-black"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            PAYMENT
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-6 md:gap-8 lg:gap-12">
          {/* Left Section - Forms */}
          <div className="bg-white">
            {activeStep === "shipping" ? (
              /* SHIPPING FORM */
              <div className="p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
                  SHIPPING
                </h2>

                {/* Shipping Method */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <button
                    onClick={() => setShippingMethod("standard")}
                    className={`flex-1 p-3 sm:p-4 border-2 rounded-lg transition-all ${
                      shippingMethod === "standard"
                        ? "border-purple-900 bg-purple-900 text-white"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm sm:text-base">
                        Standard
                      </span>
                      {shippingMethod === "standard" && (
                        <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span
                        className={
                          shippingMethod === "standard"
                            ? "text-purple-200"
                            : "text-gray-500"
                        }
                      >
                        2-3 DAYS DELIVERY
                      </span>
                      <span className="font-semibold">Free</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setShippingMethod("express")}
                    className={`flex-1 p-3 sm:p-4 border-2 rounded-lg transition-all ${
                      shippingMethod === "express"
                        ? "border-purple-900 bg-purple-900 text-white"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm sm:text-base">
                        Express
                      </span>
                      {shippingMethod === "express" && (
                        <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span
                        className={
                          shippingMethod === "express"
                            ? "text-purple-200"
                            : "text-gray-500"
                        }
                      >
                        1-2 DAYS DELIVERY
                      </span>
                      <span className="font-semibold">+13,89$</span>
                    </div>
                  </button>
                </div>

                {/* Address Form */}
                <div className="space-y-3 sm:space-y-4">
                  <input
                    type="text"
                    placeholder="St. Stalowa na Nekteen"
                    value={shippingForm.street}
                    onChange={(e) =>
                      handleShippingChange("street", e.target.value)
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-400"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <input
                      type="text"
                      placeholder="Country"
                      value={shippingForm.country}
                      onChange={(e) =>
                        handleShippingChange("country", e.target.value)
                      }
                      className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="Apt./Suit no."
                      value={shippingForm.aptSuit}
                      onChange={(e) =>
                        handleShippingChange("aptSuit", e.target.value)
                      }
                      className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <input
                      type="text"
                      placeholder="Zip code"
                      value={shippingForm.zipcode}
                      onChange={(e) =>
                        handleShippingChange("zipcode", e.target.value)
                      }
                      className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={shippingForm.city}
                      onChange={(e) =>
                        handleShippingChange("city", e.target.value)
                      }
                      className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-400"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="State"
                    value={shippingForm.state}
                    onChange={(e) =>
                      handleShippingChange("state", e.target.value)
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-400"
                  />
                </div>
              </div>
            ) : (
              /* PAYMENT FORM */
              <div className="p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
                  PAYMENT
                </h2>

                {/* Email */}
                <div className="space-y-4 mb-6">
                  <input
                    type="email"
                    placeholder="E-mail"
                    value={paymentForm.email}
                    onChange={(e) =>
                      handlePaymentChange("email", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-400"
                  />

                  {/* Newsletter Checkbox */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paymentForm.newsletter}
                      onChange={(e) =>
                        handlePaymentChange("newsletter", e.target.checked)
                      }
                      className="w-5 h-5 border-2 border-gray-300 rounded appearance-none checked:bg-purple-900 checked:border-purple-900 cursor-pointer relative"
                      style={{
                        backgroundImage: paymentForm.newsletter
                          ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='white'%3E%3Cpath d='M13 4L6 11L3 8'/%3E%3C/svg%3E\")"
                          : "none",
                        backgroundSize: "16px",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    />
                    <span className="text-sm font-medium uppercase tracking-wide">
                      SIGN UP TO OUR NEWSLATTER
                    </span>
                  </label>
                </div>

                {/* Card Details */}
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-[2fr,1fr,1fr] gap-4">
                    <input
                      type="text"
                      placeholder="Card number"
                      value={paymentForm.cardNumber}
                      onChange={(e) =>
                        handlePaymentChange("cardNumber", e.target.value)
                      }
                      className="px-4 py-3 border border-gray-300 rounded text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="MM / YY"
                      value={paymentForm.mmYy}
                      onChange={(e) =>
                        handlePaymentChange("mmYy", e.target.value)
                      }
                      className="px-4 py-3 border border-gray-300 rounded text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-400"
                    />
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="CVC"
                        value={paymentForm.cvc}
                        onChange={(e) =>
                          handlePaymentChange("cvc", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-400"
                      />
                      <HelpCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder="Cardholder name"
                    value={paymentForm.cardholderName}
                    onChange={(e) =>
                      handlePaymentChange("cardholderName", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-400"
                  />
                </div>

                {/* Billing Address */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Billing addres</h3>
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                      <span className="uppercase tracking-wide">
                        USE SHOPPING ADDRESS
                      </span>
                    </label>
                  </div>

                  <div className="space-y-4">
                    <select
                      value={paymentForm.billingCountry}
                      onChange={(e) =>
                        handlePaymentChange("billingCountry", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-400 appearance-none bg-white"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 12px center",
                      }}
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                    </select>

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Zip code"
                        value={paymentForm.zipcode}
                        onChange={(e) =>
                          handlePaymentChange("zipcode", e.target.value)
                        }
                        className="px-4 py-3 border border-gray-300 rounded text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-400"
                      />
                      <input
                        type="text"
                        placeholder="City"
                        value={paymentForm.city}
                        onChange={(e) =>
                          handlePaymentChange("city", e.target.value)
                        }
                        className="px-4 py-3 border border-gray-300 rounded text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-400"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="VAT Number"
                      value={paymentForm.vatNumber}
                      onChange={(e) =>
                        handlePaymentChange("vatNumber", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-400"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Section - Order Summary (Same for both) */}
          <div className="bg-gray-900 text-white p-4 sm:p-6 md:p-8 rounded-lg h-fit lg:sticky lg:top-6">
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 uppercase tracking-wide">
              TOTAL
            </h3>

            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="uppercase tracking-wide">
                    DELIVERY 3-4 B.D
                  </span>
                  <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                </div>
                <span className="font-semibold">FREE</span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="uppercase tracking-wide">VAT +9%</span>
                  <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                </div>
                <span className="font-semibold">{vatAmount.toFixed(2)}$</span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm pb-4 sm:pb-6 border-b border-gray-700">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="uppercase tracking-wide">DISCONT</span>
                  <span className="px-2 py-0.5 bg-pink-600 text-white text-xs rounded uppercase">
                    FIRSTUKI10
                  </span>
                </div>
                <span className="text-gray-400">{discount}</span>
              </div>
            </div>

            <div className="text-right mb-6 sm:mb-8">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold">
                {total.toFixed(2)}
              </span>
              <span className="text-xl sm:text-2xl text-gray-400"> $</span>
            </div>

            <button className="w-full py-3 sm:py-4 bg-white text-gray-900 font-semibold text-sm sm:text-base rounded-lg hover:bg-gray-100 transition-colors uppercase tracking-wide mb-3 sm:mb-4">
              COMPLETE PURCHASE
            </button>

            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-400">
              <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
              PAYMENT SECURITY SSL
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
