"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import { useRouter, useSearchParams } from "next/navigation";
import { protectSignInAction, phoneLoginRequest, phoneLoginVerify, phoneLoginResendOtp } from "@/actions/auth";
import { X, Mail, Lock, ArrowRight, Phone, Smartphone } from "lucide-react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useSettingsStore } from "@/store/useSettingsStore";

function LoginForm() {
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    otp: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const { toast } = useToast();
  const { login, phoneLogin, isLoading, error } = useAuthStore();
  const { syncGuestCartWithServer } = useCartStore();
  const { storeSettings, fetchStoreSettings } = useSettingsStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  useEffect(() => {
    fetchStoreSettings();
  }, [fetchStoreSettings]);

  // Timer for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSendOtp = async () => {
    if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await phoneLoginRequest(formData.phoneNumber);
      if (result.success) {
        setOtpSent(true);
        setResendTimer(60);
        toast({
          title: "OTP Sent",
          description: result.message || "OTP sent to your WhatsApp",
        });
      } else {
        toast({
          title: "Failed to Send OTP",
          description: result.message || "Please try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;

    setIsSubmitting(true);
    try {
      const result = await phoneLoginResendOtp(formData.phoneNumber);
      if (result.success) {
        setResendTimer(60);
        toast({
          title: "OTP Resent",
          description: result.message || "OTP resent to your WhatsApp",
        });
      } else {
        toast({
          title: "Failed to Resend OTP",
          description: result.message || "Please try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      if (loginMethod === "email") {
        // Email login flow
        const checkFirstLevelOfValidation = await protectSignInAction(
          formData.email
        );

        if (!checkFirstLevelOfValidation.success) {
          toast({
            title: checkFirstLevelOfValidation.error,
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }

        const success = await login(formData.email, formData.password);
        console.log("Login success:", success);
        if (success.success && success.data) {
          const { accessToken, refreshToken, user } = success.data;

          // Store tokens in localStorage
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          // Set cookies using js-cookie
          Cookies.set("accessToken", accessToken, {
            expires: 1, // 1 day
            secure: true,
            sameSite: "none",
          });

          Cookies.set("refreshToken", refreshToken, {
            expires: 30, // 30 days
            secure: true,
            sameSite: "none",
          });

          console.log("✅ Cookies set successfully:", {
            accessToken: Cookies.get("accessToken")?.substring(0, 20) + "...",
            refreshToken:
              Cookies.get("refreshToken")?.substring(0, 20) + "...",
          });

          // Sync guest cart with server
          await syncGuestCartWithServer();

          toast({
            title: "Login Successful!",
            description: `Welcome back, ${user?.name || "User"}!`,
          });
          router.push(redirectPath);
        } else {
          // Use the error from the store if available
          toast({
            title: "Login Failed",
            description: error || "Invalid email or password",
            variant: "destructive",
          });
          setIsSubmitting(false);
        }
      } else {
        // Phone login flow
        if (!otpSent) {
          // First, send OTP
          await handleSendOtp();
          setIsSubmitting(false);
          return;
        }

        // Verify OTP and login
        if (!formData.otp || formData.otp.length !== 6) {
          toast({
            title: "Invalid OTP",
            description: "Please enter a valid 6-digit OTP",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }

        const success = await phoneLogin(formData.phoneNumber, formData.otp);
        console.log("Phone login success:", success);

        if (success.success && success.data) {
          const { accessToken, refreshToken, user } = success.data;

          // Store tokens in localStorage
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          // Set cookies using js-cookie
          Cookies.set("accessToken", accessToken, {
            expires: 1, // 1 day
            secure: true,
            sameSite: "none",
          });

          Cookies.set("refreshToken", refreshToken, {
            expires: 30, // 30 days
            secure: true,
            sameSite: "none",
          });

          console.log("✅ Cookies set successfully:", {
            accessToken: Cookies.get("accessToken")?.substring(0, 20) + "...",
            refreshToken:
              Cookies.get("refreshToken")?.substring(0, 20) + "...",
          });

          // Sync guest cart with server
          await syncGuestCartWithServer();

          toast({
            title: "Login Successful!",
            description: `Welcome back, ${user?.name || "User"}!`,
          });
          router.push(redirectPath);
        } else {
          toast({
            title: "Login Failed",
            description: success.message || error || "Invalid OTP",
            variant: "destructive",
          });
          setIsSubmitting(false);
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-6xl shadow-2xl overflow-hidden my-8">
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          {/* Left Side - Image */}
          <div className="hidden lg:block relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Image */}
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070"
              alt="Fashion Shopping"
              layout="fill"
              objectFit="cover"
              className="opacity-90"
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold leading-tight">
                  Welcome Back to
                  <br />
                  SAREE GHAR
                </h2>
                <p className="text-lg text-gray-200 max-w-md">
                  Discover the finest collection of traditional and contemporary
                  sarees. Sign in to continue your shopping journey.
                </p>
                <div className="flex items-center gap-6 pt-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">1000+</div>
                    <div className="text-sm text-gray-300">Products</div>
                  </div>
                  <div className="w-px h-12 bg-gray-400"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">50K+</div>
                    <div className="text-sm text-gray-300">Happy Customers</div>
                  </div>
                  <div className="w-px h-12 bg-gray-400"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">4.8★</div>
                    <div className="text-sm text-gray-300">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="relative flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            {/* Close Button */}
            <Link
              href="/"
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <X size={24} />
            </Link>

            <div className="w-full max-w-md mx-auto">
              {/* Logo - Centered */}
              <Link
                href="/"
                className="flex items-center justify-center mb-8 hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/logo/saree-ghar.jpg"
                  alt={`${storeSettings?.name || "Saree Ghar"} Logo`}
                  width={80}
                  height={100}
                  className="object-contain"
                />
              </Link>

              {/* Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">Login</h1>
                <p className="text-gray-600 text-lg">
                  New here?{" "}
                  <Link
                    href="/auth/register"
                    className="font-semibold text-gray-900 hover:underline"
                  >
                    Create an account
                  </Link>
                </p>
              </div>

              {/* Login Method Toggle */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-3 p-1 bg-gray-100 rounded-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMethod("email");
                      setOtpSent(false);
                      setFormData({
                        email: "",
                        password: "",
                        phoneNumber: "",
                        otp: "",
                      });
                    }}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-md font-semibold transition-all ${loginMethod === "email"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                      }`}
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMethod("phone");
                      setOtpSent(false);
                      setFormData({
                        email: "",
                        password: "",
                        phoneNumber: "",
                        otp: "",
                      });
                    }}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-md font-semibold transition-all ${loginMethod === "phone"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                      }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    Phone
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {loginMethod === "email" ? (
                  <>
                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleOnChange}
                          required
                          className="w-full pl-12 pr-4 py-6 border-2 border-gray-200 rounded-lg bg-white placeholder-gray-400 focus:border-gray-900 focus:ring-0 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="password"
                          type="password"
                          name="password"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleOnChange}
                          required
                          className="w-full pl-12 pr-4 py-6 border-2 border-gray-200 rounded-lg bg-white placeholder-gray-400 focus:border-gray-900 focus:ring-0 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="remember"
                          className="w-4 h-4 border-gray-300 rounded text-gray-900 focus:ring-gray-900"
                        />
                        <label
                          htmlFor="remember"
                          className="ml-2 text-sm text-gray-600"
                        >
                          Remember me
                        </label>
                      </div>
                      <Link
                        href="/auth/forgot-password"
                        className="text-sm font-semibold text-gray-900 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Phone Number Field */}
                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="phoneNumber"
                          type="tel"
                          name="phoneNumber"
                          placeholder="Enter your phone number"
                          value={formData.phoneNumber}
                          onChange={handleOnChange}
                          required
                          disabled={otpSent}
                          className="w-full pl-12 pr-4 py-6 border-2 border-gray-200 rounded-lg bg-white placeholder-gray-400 focus:border-gray-900 focus:ring-0 transition-colors disabled:bg-gray-50 disabled:text-gray-500"
                        />
                      </div>
                      {otpSent && (
                        <p className="mt-2 text-sm text-green-600">
                          OTP sent to your WhatsApp
                        </p>
                      )}
                    </div>

                    {/* OTP Field - Only show after OTP is sent */}
                    {otpSent && (
                      <div>
                        <label
                          htmlFor="otp"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Enter OTP
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="otp"
                            type="text"
                            name="otp"
                            placeholder="Enter 6-digit OTP"
                            value={formData.otp}
                            onChange={handleOnChange}
                            required
                            maxLength={6}
                            className="w-full pl-12 pr-4 py-6 border-2 border-gray-200 rounded-lg bg-white placeholder-gray-400 focus:border-gray-900 focus:ring-0 transition-colors"
                          />
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <button
                            type="button"
                            onClick={handleResendOtp}
                            disabled={resendTimer > 0}
                            className={`text-sm font-semibold ${resendTimer > 0
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-gray-900 hover:underline"
                              }`}
                          >
                            {resendTimer > 0
                              ? `Resend OTP in ${resendTimer}s`
                              : "Resend OTP"}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setOtpSent(false);
                              setFormData((prev) => ({ ...prev, otp: "" }));
                            }}
                            className="text-sm font-semibold text-gray-900 hover:underline"
                          >
                            Change Number
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-900 text-white font-semibold py-6 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? (
                    loginMethod === "email" ? (
                      "LOGGING IN..."
                    ) : otpSent ? (
                      "VERIFYING..."
                    ) : (
                      "SENDING OTP..."
                    )
                  ) : (
                    <>
                      {loginMethod === "email"
                        ? "LOG IN"
                        : otpSent
                          ? "VERIFY & LOGIN"
                          : "SEND OTP"}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              {/* Footer Links */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 border-t border-gray-200 pt-6">
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-gray-900 hover:underline font-medium"
                >
                  Terms & Conditions
                </Link>
                <span className="text-gray-300">•</span>
                <Link
                  href="/privacy-policy"
                  className="hover:text-gray-900 hover:underline font-medium"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}

export default LoginPage;
