"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  X,
  Mail,
  ArrowRight,
  ArrowLeft,
  Lock,
  ShieldCheck,
} from "lucide-react";
import {
  forgotPasswordRequest,
  forgotPasswordVerifyOtp,
  forgotPasswordReset,
  forgotPasswordResendOtp,
} from "@/actions/auth";

type Step = "request" | "verify" | "reset" | "success";

function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("request");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  const { toast } = useToast();
  const router = useRouter();

  // Start countdown timer
  const startTimer = () => {
    setOtpTimer(60);
    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Step 1: Request OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await forgotPasswordRequest(email);

      if (result.success) {
        toast({
          title: "OTP Sent!",
          description: "Please check your email for the verification code.",
        });
        setStep("verify");
        startTimer();
      } else {
        toast({
          title: "Error",
          description:
            result.message || "Failed to send OTP. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit code.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await forgotPasswordVerifyOtp(email, otp);

      if (result.success) {
        toast({
          title: "OTP Verified!",
          description: "Please create your new password.",
        });
        setStep("reset");
      } else {
        toast({
          title: "Invalid OTP",
          description: result.message || "The code you entered is incorrect.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (otpTimer > 0) return;

    setIsLoading(true);

    try {
      const result = await forgotPasswordResendOtp(email);

      if (result.success) {
        toast({
          title: "OTP Resent!",
          description: "A new verification code has been sent to your email.",
        });
        startTimer();
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to resend OTP.",
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
      setIsLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await forgotPasswordReset(
        email,
        otp,
        password,
        confirmPassword
      );

      if (result.success) {
        toast({
          title: "Password Reset Successful!",
          description: "You can now login with your new password.",
        });
        setStep("success");
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to reset password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Render different steps
  const renderStepContent = () => {
    switch (step) {
      case "request":
        return (
          <>
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Forgot Password?
              </h1>
              <p className="text-gray-600 text-lg">
                No worries! Enter your email and we'll send you a verification
                code.
              </p>
            </div>

            <form onSubmit={handleRequestOtp} className="space-y-5">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-6 border-2 border-gray-200 rounded-lg bg-white placeholder-gray-400 focus:border-gray-900 focus:ring-0 transition-colors"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gray-900 text-white font-semibold py-6 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  "SENDING..."
                ) : (
                  <>
                    SEND VERIFICATION CODE
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/auth/login"
                className="text-sm text-gray-600 hover:text-gray-900 font-medium inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          </>
        );

      case "verify":
        return (
          <>
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Enter Verification Code
              </h1>
              <p className="text-gray-600 text-lg">
                We've sent a 6-digit code to{" "}
                <span className="font-semibold text-gray-900">{email}</span>
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Verification Code
                </label>
                <div className="relative">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="otp"
                    type="text"
                    name="otp"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    maxLength={6}
                    required
                    className="w-full pl-12 pr-4 py-6 border-2 border-gray-200 rounded-lg bg-white placeholder-gray-400 focus:border-gray-900 focus:ring-0 transition-colors text-center text-2xl tracking-widest font-semibold"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading || otp.length !== 6}
                className="w-full bg-gray-900 text-white font-semibold py-6 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  "VERIFYING..."
                ) : (
                  <>
                    VERIFY CODE
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-gray-600">
                Didn't receive the code?{" "}
                {otpTimer > 0 ? (
                  <span className="font-semibold text-gray-900">
                    Resend in {otpTimer}s
                  </span>
                ) : (
                  <button
                    onClick={handleResendOtp}
                    disabled={isLoading}
                    className="font-semibold text-gray-900 hover:underline"
                  >
                    Resend Code
                  </button>
                )}
              </p>
              <button
                onClick={() => setStep("request")}
                className="text-sm text-gray-600 hover:text-gray-900 font-medium inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Change Email
              </button>
            </div>
          </>
        );

      case "reset":
        return (
          <>
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Create New Password
              </h1>
              <p className="text-gray-600 text-lg">
                Your new password must be different from previously used
                passwords.
              </p>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-5">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-6 border-2 border-gray-200 rounded-lg bg-white placeholder-gray-400 focus:border-gray-900 focus:ring-0 transition-colors"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Must be at least 6 characters long
                </p>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-6 border-2 border-gray-200 rounded-lg bg-white placeholder-gray-400 focus:border-gray-900 focus:ring-0 transition-colors"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gray-900 text-white font-semibold py-6 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  "RESETTING PASSWORD..."
                ) : (
                  <>
                    RESET PASSWORD
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </>
        );

      case "success":
        return (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Password Reset Successful!
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Your password has been successfully reset.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to login page...
            </p>
          </div>
        );

      default:
        return null;
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
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070"
              alt="Secure Account"
              className="w-full h-full object-cover opacity-90"
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold leading-tight">
                  Secure Your
                  <br />
                  Account
                </h2>
                <p className="text-lg text-gray-200 max-w-md">
                  We take security seriously. Follow the simple steps to reset
                  your password and regain access to your account.
                </p>
                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="font-bold text-lg">1</span>
                    </div>
                    <div>
                      <div className="font-semibold">Enter Your Email</div>
                      <div className="text-sm text-gray-300">
                        We'll send you a code
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="font-bold text-lg">2</span>
                    </div>
                    <div>
                      <div className="font-semibold">Verify Code</div>
                      <div className="text-sm text-gray-300">
                        Enter the 6-digit code
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="font-bold text-lg">3</span>
                    </div>
                    <div>
                      <div className="font-semibold">Reset Password</div>
                      <div className="text-sm text-gray-300">
                        Create a new password
                      </div>
                    </div>
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

            <div className="w-full max-w-md mx-auto">{renderStepContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
