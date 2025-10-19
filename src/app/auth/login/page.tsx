"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { protectSignInAction } from "@/actions/auth";
import { X, Mail, Lock, ArrowRight } from "lucide-react";
import Image from "next/image";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "admin@gmail.com",
    password: "123456",
  });
  const { toast } = useToast();
  const { login, isLoading } = useAuthStore();
  const router = useRouter();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const checkFirstLevelOfValidation = await protectSignInAction(
      formData.email
    );

    if (!checkFirstLevelOfValidation.success) {
      toast({
        title: checkFirstLevelOfValidation.error,
        variant: "destructive",
      });
      return;
    }

    const success = await login(formData.email, formData.password);
    if (success.success) {
      const { accessToken, refreshToken } = success.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      toast({
        title: "Login Successfull!",
      });
      const user = useAuthStore.getState().user;
      if (user?.role === "SUPER_ADMIN") router.push("/");
      else router.push("/home");
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

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
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

                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gray-900 text-white font-semibold py-6 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 group"
                >
                  {isLoading ? (
                    "LOGGING IN..."
                  ) : (
                    <>
                      LOG IN
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

export default LoginPage;
