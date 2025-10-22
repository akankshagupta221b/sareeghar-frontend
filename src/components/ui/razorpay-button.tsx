"use client";

import { useEffect, useState } from "react";
import { useOrderStore } from "@/store/useOrderStore";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayButtonProps {
  amount: number;
  onSuccess: (response: any) => void;
  onError?: (error: any) => void;
  disabled?: boolean;
  currency?: string;
}

export function RazorpayButton({
  amount,
  onSuccess,
  onError,
  disabled = false,
  currency = "INR",
}: RazorpayButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const {
    createRazorpayOrder,
    verifyRazorpayPayment,
    getRazorpayKey,
    razorpayKey,
  } = useOrderStore();

  useEffect(() => {
    // Load Razorpay script
    const loadRazorpayScript = () => {
      if (window.Razorpay) {
        setScriptLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => setScriptLoaded(true);
      script.onerror = () => {
        toast({
          title: "Failed to load Razorpay",
          description: "Please refresh and try again",
          variant: "destructive",
        });
      };
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []);

  useEffect(() => {
    // Get Razorpay key when component mounts
    if (!razorpayKey) {
      getRazorpayKey();
    }
  }, [getRazorpayKey, razorpayKey]);

  const handlePayment = async () => {
    if (!scriptLoaded || !razorpayKey) {
      toast({
        title: "Razorpay not ready",
        description: "Please wait a moment and try again",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Create Razorpay order
      const order = await createRazorpayOrder(amount, currency);

      if (!order) {
        throw new Error("Failed to create order");
      }

      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: "Saree Ghar",
        description: razorpayKey?.startsWith("rzp_test")
          ? "Test Payment - No real money will be charged"
          : "Payment for your order",
        order_id: order.id,
        handler: async function (response: any) {
          try {
            // Verify payment
            const verificationResult = await verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verificationResult && verificationResult.success) {
              onSuccess(verificationResult.payment);
            } else {
              throw new Error("Payment verification failed");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast({
              title: "Payment verification failed",
              description: "Please contact support if amount was deducted",
              variant: "destructive",
            });
            onError?.(error);
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        notes: {
          order_type: "test_order",
          environment: razorpayKey?.startsWith("rzp_test")
            ? "test"
            : "production",
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment initiation error:", error);
      toast({
        title: "Payment failed",
        description: "Unable to initiate payment. Please try again.",
        variant: "destructive",
      });
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <Button
        onClick={handlePayment}
        disabled={disabled || isLoading || !scriptLoaded || !razorpayKey}
        className="w-full bg-primary hover:bg-primary/90 text-white"
      >
        {isLoading
          ? "Processing..."
          : `${
              razorpayKey?.startsWith("rzp_test") ? "Test Pay" : "Pay"
            } ₹${amount.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} with Razorpay`}
      </Button>
    </div>
  );
}
