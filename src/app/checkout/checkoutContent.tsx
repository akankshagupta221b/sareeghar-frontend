"use client";

import Image from "next/image";
import { paymentAction } from "@/actions/payment";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { useAddressStore } from "@/store/useAddressStore";
import { useAuthStore } from "@/store/useAuthStore";
import { CartItem, useCartStore } from "@/store/useCartStore";
import { Coupon, useCouponStore } from "@/store/useCouponStore";
import { useOrderStore } from "@/store/useOrderStore";
import { useProductStore } from "@/store/useProductStore";
import { useShiprocketStore } from "@/store/useShiprocketStore";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { RazorpayButton } from "@/components/ui/razorpay-button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function CheckoutContent() {
  const { addresses, fetchAddresses } = useAddressStore();
  const [selectedAddress, setSelectedAddress] = useState("");
  const [showPaymentFlow, setShowPaymentFlow] = useState(false);
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "paypal" | "razorpay"
  >("paypal");
  const [cartItemsWithDetails, setCartItemsWithDetails] = useState<
    (CartItem & { product: any })[]
  >([]);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponAppliedError, setCouponAppliedError] = useState("");
  const [deliveryCharges, setDeliveryCharges] = useState<number>(0);
  const [selectedCourier, setSelectedCourier] = useState<any>(null);
  const [isLoadingDelivery, setIsLoadingDelivery] = useState(false);
  const [deliveryError, setDeliveryError] = useState<string | null>(null);
  const { items, fetchCart, clearCart } = useCartStore();
  const { getProductById } = useProductStore();
  const { fetchCoupons, couponList } = useCouponStore();
  const {
    createPayPalOrder,
    capturePayPalOrder,
    createFinalOrder,
    isPaymentProcessing,
  } = useOrderStore();
  const { user } = useAuthStore();
  const { getBestCourier } = useShiprocketStore();
  const router = useRouter();

  // Warehouse postal code
  const WAREHOUSE_POSTAL_CODE = "276001";

  useEffect(() => {
    fetchCoupons();
    fetchAddresses();
    fetchCart();
  }, [fetchAddresses, fetchCart, fetchCoupons]);

  useEffect(() => {
    const findDefaultAddress = addresses.find((address) => address.isDefault);

    if (findDefaultAddress) {
      setSelectedAddress(findDefaultAddress.id);
    }
  }, [addresses]);

  useEffect(() => {
    const fetchIndividualProductDetails = async () => {
      const itemsWithDetails = await Promise.all(
        items.map(async (item) => {
          const product = await getProductById(item.productId);
          return { ...item, product };
        })
      );

      setCartItemsWithDetails(itemsWithDetails);
    };

    fetchIndividualProductDetails();
  }, [items, getProductById]);

  // Fetch delivery charges when address or cart changes
  useEffect(() => {
    const fetchDeliveryCharges = async () => {
      if (!selectedAddress || cartItemsWithDetails.length === 0) {
        setDeliveryCharges(0);
        setSelectedCourier(null);
        return;
      }

      const address = addresses.find((a) => a.id === selectedAddress);
      if (!address || !address.postalCode) {
        setDeliveryCharges(0);
        setSelectedCourier(null);
        return;
      }

      setIsLoadingDelivery(true);
      setDeliveryError(null);

      try {
        // Calculate total weight (assuming 0.5kg per item as default)
        // You can add weight field to product model for accurate calculation
        const totalWeight = cartItemsWithDetails.reduce(
          (acc, item) => acc + (item.product?.weight || 0.5) * item.quantity,
          0
        );

        // Determine COD based on payment method (0 for prepaid)
        const isCOD = selectedPaymentMethod === "razorpay" ? 0 : 0;

        const courierData = await getBestCourier({
          pickup_postcode: WAREHOUSE_POSTAL_CODE,
          delivery_postcode: address.postalCode,
          cod: isCOD,
          weight: totalWeight,
        });

        if (courierData) {
          setDeliveryCharges(courierData.rate || 49);
          setSelectedCourier(courierData);
          setDeliveryError(null);
        } else {
          // Fallback to free delivery if API fails
          setDeliveryCharges(0);
          setSelectedCourier(null);
          setDeliveryError("Unable to calculate delivery charges");
        }
      } catch (error) {
        console.error("Error fetching delivery charges:", error);
        setDeliveryCharges(0);
        setSelectedCourier(null);
        setDeliveryError("Unable to calculate delivery charges");
      } finally {
        setIsLoadingDelivery(false);
      }
    };

    fetchDeliveryCharges();
  }, [
    selectedAddress,
    cartItemsWithDetails,
    addresses,
    selectedPaymentMethod,
    getBestCourier,
  ]);

  function handleApplyCoupon() {
    fetchCoupons();
    const getCurrentCoupon = couponList.find((c) => c.code === couponCode);
    if (!getCurrentCoupon) {
      setCouponAppliedError("Invalied Coupon code");
      setAppliedCoupon(null);
      return;
    }

    const now = new Date();

    if (
      now < new Date(getCurrentCoupon.startDate) ||
      now > new Date(getCurrentCoupon.endDate)
    ) {
      setCouponAppliedError(
        "Coupon is not valid in this time or expired coupon"
      );
      setAppliedCoupon(null);
      return;
    }

    if (getCurrentCoupon.usageCount >= getCurrentCoupon.usageLimit) {
      setCouponAppliedError(
        "Coupon has reached its usage limit! Please try a diff coupon"
      );
      setAppliedCoupon(null);
      return;
    }

    setAppliedCoupon(getCurrentCoupon);
    setCouponAppliedError("");
  }

  const handlePrePaymentFlow = async () => {
    const result = await paymentAction(checkoutEmail);
    if (!result.success) {
      toast({
        title: result.error,
        variant: "destructive",
      });

      return;
    }

    setShowPaymentFlow(true);
  };

  const handleFinalOrderCreation = async (
    data: any,
    paymentMethod: "CREDIT_CARD" | "RAZORPAY" = "CREDIT_CARD"
  ) => {
    if (!user) {
      toast({
        title: "User not authenticated",
      });

      return;
    }
    try {
      const orderData = {
        userId: user?.id,
        addressId: selectedAddress,
        items: cartItemsWithDetails.map((item) => ({
          productId: item.productId,
          productName: item.product.name,
          productCategory: item.product.category,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          price: item.product.sellingPrice,
        })),
        couponId: appliedCoupon?.id,
        total,
        paymentMethod: paymentMethod,
        paymentStatus: "COMPLETED" as const,
        paymentId: data.id || data.razorpay_payment_id,
      };

      const createFinalOrderResponse = await createFinalOrder(orderData);

      if (createFinalOrderResponse) {
        await clearCart();
        router.push("/account");
      } else {
        toast({
          title: "There is some error while processing final order",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "There is some error while processing final order",
        variant: "destructive",
      });
    }
  };

  // Add cgst and sgst calculation
  const subTotal = cartItemsWithDetails.reduce(
    (acc, item) => acc + (item.product?.sellingPrice || 0) * item.quantity,
    0
  );

  const cgstAmount = subTotal * 0.025;
  const sgstAmount = subTotal * 0.025;

  const discountAmount = appliedCoupon
    ? (subTotal * appliedCoupon.discountPercent) / 100
    : 0;

  const total =
    subTotal + cgstAmount + sgstAmount - discountAmount + deliveryCharges;

  if (isPaymentProcessing) {
    return (
      <Skeleton className="w-full h-[600px] rounded-xl">
        <div className="h-full flex justify-center items-center">
          <h1 className="text-3xl font-bold">
            Processing payment...Please wait!
          </h1>
        </div>
      </Skeleton>
    );
  }

  return (
    <div className="grid lg:grid-cols-[1fr,500px] gap-12">
      {/* Left Section - Shipping & Payment */}
      <div className="bg-white p-8 rounded-lg shadow-sm">
        {/* Delivery Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-6 uppercase tracking-wide">
            SHIPPING
          </h2>
          <div className="space-y-4">
            {addresses.map((address) => (
              <label
                key={address.id}
                className="flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-purple-300"
                style={{
                  borderColor:
                    selectedAddress === address.id ? "#581c87" : "#d1d5db",
                  backgroundColor:
                    selectedAddress === address.id ? "#faf5ff" : "white",
                }}
              >
                <Checkbox
                  id={address.id}
                  checked={selectedAddress === address.id}
                  onCheckedChange={() => setSelectedAddress(address.id)}
                  className="mt-1"
                />
                <div className="flex-grow ml-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-base">
                      {address.name}
                    </span>
                    {address.isDefault && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-700 mb-1">
                    {address.address}
                  </div>
                  <div className="text-sm text-gray-600">
                    {address.city}, {address.country}, {address.postalCode}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Phone: {address.phone}
                  </div>
                </div>
              </label>
            ))}
            <Button
              onClick={() => router.push("/account")}
              variant="outline"
              className="w-full py-3 text-sm font-semibold uppercase tracking-wide"
            >
              + Add a New Address
            </Button>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Payment Section */}
        {showPaymentFlow ? (
          <div>
            <h2 className="text-3xl font-semibold mb-6 uppercase tracking-wide">
              PAYMENT
            </h2>
            <p className="mb-6 text-gray-600">
              All transactions are secure and encrypted
            </p>

            {/* Payment Method Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4 uppercase tracking-wide">
                Select Payment Method
              </h3>
              <div className="space-y-3">
                <label
                  className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-purple-300"
                  style={{
                    borderColor:
                      selectedPaymentMethod === "paypal"
                        ? "#581c87"
                        : "#d1d5db",
                    backgroundColor:
                      selectedPaymentMethod === "paypal" ? "#faf5ff" : "white",
                  }}
                >
                  <Checkbox
                    id="paypal"
                    checked={selectedPaymentMethod === "paypal"}
                    onCheckedChange={() => setSelectedPaymentMethod("paypal")}
                  />
                  <div className="flex items-center gap-3 ml-3 flex-1">
                    <div className="relative w-12 h-8 flex-shrink-0">
                      <Image
                        src={
                          "https://upload.wikimedia.org/wikipedia/commons/a/a8/Paypal_Servise.jpg"
                        }
                        alt="Paypal"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                    <Label
                      htmlFor="paypal"
                      className="cursor-pointer font-medium"
                    >
                      PayPal / Credit Card
                    </Label>
                  </div>
                </label>
                <label
                  className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-purple-300"
                  style={{
                    borderColor:
                      selectedPaymentMethod === "razorpay"
                        ? "#581c87"
                        : "#d1d5db",
                    backgroundColor:
                      selectedPaymentMethod === "razorpay"
                        ? "#faf5ff"
                        : "white",
                  }}
                >
                  <Checkbox
                    id="razorpay"
                    checked={selectedPaymentMethod === "razorpay"}
                    onCheckedChange={() => setSelectedPaymentMethod("razorpay")}
                  />
                  <div className="flex items-center gap-3 ml-3 flex-1">
                    <div className="relative w-12 h-8 flex-shrink-0">
                      <Image
                        src={
                          "https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg"
                        }
                        alt="Razorpay"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                    <Label
                      htmlFor="razorpay"
                      className="cursor-pointer font-medium"
                    >
                      Razorpay (UPI, Cards, Netbanking)
                    </Label>
                  </div>
                </label>
              </div>
            </div>

            {/* PayPal Payment */}
            {selectedPaymentMethod === "paypal" && (
              <div className="mb-6">
                <PayPalButtons
                  style={{
                    layout: "vertical",
                    color: "black",
                    shape: "rect",
                    label: "pay",
                  }}
                  fundingSource="card"
                  createOrder={async () => {
                    const orderId = await createPayPalOrder(
                      cartItemsWithDetails,
                      total
                    );

                    if (orderId === null) {
                      throw new Error("Failed to create paypal order");
                    }

                    return orderId;
                  }}
                  onApprove={async (data, actions) => {
                    const captureData = await capturePayPalOrder(data.orderID);

                    if (captureData) {
                      await handleFinalOrderCreation(
                        captureData,
                        "CREDIT_CARD"
                      );
                    } else {
                      alert("Failed to capture paypal order");
                    }
                  }}
                />
              </div>
            )}

            {/* Razorpay Payment */}
            {selectedPaymentMethod === "razorpay" && (
              <div className="mb-6">
                <RazorpayButton
                  amount={total}
                  currency="INR"
                  onSuccess={async (paymentData) => {
                    await handleFinalOrderCreation(paymentData, "RAZORPAY");
                  }}
                  onError={(error) => {
                    console.error("Razorpay payment error:", error);
                    toast({
                      title: "Payment failed",
                      description: "Please try again or contact support",
                      variant: "destructive",
                    });
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-semibold mb-6 uppercase ">
              GET STARTED
            </h2>
            <p className="mb-4 text-gray-600">
              Enter your email to proceed with the purchase
            </p>
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3"
                value={checkoutEmail}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setCheckoutEmail(event.target.value)
                }
              />
              <Button
                onClick={handlePrePaymentFlow}
                className="px-8 py-3 bg-primary hover:bg-secondary-foreground text-white font-semibold uppercase tracking-wide"
              >
                Proceed
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Right Section - Order Summary */}
      <div className="bg-gray-900 text-white p-8 rounded-lg h-fit sticky top-6">
        <h3 className="text-2xl font-bold mb-6 uppercase tracking-wide">
          ORDER SUMMARY
        </h3>

        {/* Cart Items */}
        <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
          {cartItemsWithDetails.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="relative w-16 h-20 rounded overflow-hidden flex-shrink-0 bg-gray-800">
                <Image
                  src={item?.product?.images[0]}
                  alt={item?.product?.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-lg line-clamp-2 mb-1">
                  {item?.product?.name}
                </h4>
                <p className="text-base text-gray-400">
                  {item.color} / {item.size}
                </p>
                <p className="text-base text-gray-400">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold text-lg flex-shrink-0">
                ₹ {(item?.product?.sellingPrice * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-6 mb-6">
          {/* Coupon Code */}
          <div className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="PROMO-CODE"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-600"
              />
              <button
                onClick={handleApplyCoupon}
                className="px-6 py-3 bg-gray-800 border border-gray-700 rounded font-semibold text-sm hover:bg-gray-700 transition-colors uppercase tracking-wide"
              >
                APPLY
              </button>
            </div>
            {couponAppliedError && (
              <p className="text-xs text-red-400 mt-2">{couponAppliedError}</p>
            )}
            {appliedCoupon && (
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-1 bg-pink-600 text-white text-xs rounded uppercase font-semibold">
                  {appliedCoupon.code}
                </span>
                <p className="text-xs text-green-400">Coupon Applied!</p>
              </div>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 mb-6 text-xl">
            <div className="flex items-center justify-between ">
              <span className="uppercase tracking-wide text-gray-400">
                Subtotal
              </span>
              <span className="font-semibold">₹ {subTotal.toFixed(2)}</span>
            </div>
            {appliedCoupon && (
              <div className="flex items-center justify-between text-sm text-green-400">
                <span className="uppercase tracking-wide">
                  Discount ({appliedCoupon.discountPercent}%)
                </span>
                <span className="font-semibold">
                  -₹ {discountAmount.toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex items-center text-xl justify-between">
              <span className="uppercase tracking-wide text-gray-400">
                Delivery Charges
              </span>
              {isLoadingDelivery ? (
                <Skeleton className="h-4 w-16" />
              ) : !selectedAddress ? (
                <span className="text-base text-gray-400">Select address</span>
              ) : deliveryCharges > 0 ? (
                <span className="font-semibold text-green-500">
                  ₹ {deliveryCharges.toFixed(2)}
                </span>
              ) : (
                <span className="font-semibold text-green-400">FREE</span>
              )}
            </div>
            {deliveryError && (
              <div className="text-xs text-yellow-400">{deliveryError}</div>
            )}
          </div>

          {/* Total */}
          <div className="text-right mb-6 pt-4 border-t border-gray-700">
            <div className="flex items-baseline justify-end gap-2">
              <span className="text-5xl font-bold">{total.toFixed(2)}</span>
              <span className="text-2xl text-gray-400">₹</span>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400 pt-4 border-t border-gray-700">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <span className="uppercase tracking-wide">PAYMENT SECURITY SSL</span>
        </div>
      </div>
    </div>
  );
}

export default CheckoutContent;
