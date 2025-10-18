"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { protectSignUpAction } from "@/actions/auth";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { ArrowRight, User, Mail, Lock, X, ShieldCheck } from "lucide-react";

function Registerpage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { toast } = useToast();
  const { register, isLoading } = useAuthStore();
  const router = useRouter();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!acceptedTerms) {
      toast({
        title: "Please accept the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    const checkFirstLevelOfValidation = await protectSignUpAction(
      formData.email
    );
    if (!checkFirstLevelOfValidation.success) {
      toast({
        title: checkFirstLevelOfValidation.error,
        variant: "destructive",
      });
      return;
    }

    const userId = await register(
      formData.name,
      formData.email,
      formData.password
    );
    if (userId) {
      toast({
        title: "Registration Successful!",
      });
      router.push("/auth/login");
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
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070"
              alt="Fashion Shopping"
              className="w-full h-full object-cover opacity-90"
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold leading-tight">
                  Join the SAREE GHAR
                  <br />
                  Family Today
                </h2>
                <p className="text-lg text-gray-200 max-w-md">
                  Create your account and unlock exclusive access to premium
                  sarees, special offers, and personalized shopping experience.
                </p>
                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold">Secure Shopping</div>
                      <div className="text-sm text-gray-300">
                        Your data is protected
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold">Order Tracking</div>
                      <div className="text-sm text-gray-300">
                        Track every purchase
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold">Exclusive Offers</div>
                      <div className="text-sm text-gray-300">
                        Members-only deals
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

            <div className="w-full max-w-md mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">
                  Create Account
                </h1>
                <p className="text-gray-600 text-lg">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="font-semibold text-gray-900 hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleOnChange}
                      required
                      className="w-full pl-12 pr-4 py-6 border-2 border-gray-200 rounded-lg bg-white placeholder-gray-400 focus:border-gray-900 focus:ring-0 transition-colors"
                    />
                  </div>
                </div>

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
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleOnChange}
                      required
                      className="w-full pl-12 pr-4 py-6 border-2 border-gray-200 rounded-lg bg-white placeholder-gray-400 focus:border-gray-900 focus:ring-0 transition-colors"
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Must be at least 6 characters long
                  </p>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="w-4 h-4 mt-1 border-gray-300 rounded text-gray-900 focus:ring-gray-900"
                  />
                  <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
                    I agree to the{" "}
                    <Link
                      href="/terms-and-conditions"
                      className="font-semibold text-gray-900 hover:underline"
                      target="_blank"
                    >
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy-policy"
                      className="font-semibold text-gray-900 hover:underline"
                      target="_blank"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                {/* Register Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gray-900 text-white font-semibold py-6 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 group"
                >
                  {isLoading ? (
                    "Creating Account..."
                  ) : (
                    <>
                      CREATE ACCOUNT
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              {/* Footer Note */}
              <p className="text-center text-xs text-gray-500">
                By creating an account, you agree to receive marketing emails
                from SAREE GHAR. You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerpage;
