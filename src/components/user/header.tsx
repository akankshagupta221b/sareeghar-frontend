"use client";

import {
  ArrowLeft,
  Menu,
  ShoppingBag,
  ShoppingCart,
  User,
  Search,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";

const navItems = [
  {
    title: "HOME",
    to: "/",
  },
  {
    title: "PRODUCTS",
    to: "/listing",
  },
];

function Header() {
  const { logout } = useAuthStore();
  const router = useRouter();
  const [mobileView, setMobileView] = useState<"menu" | "account">("menu");
  const [showSheetDialog, setShowSheetDialog] = useState(false);
  const { fetchCart, items } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  async function handleLogout() {
    await logout();
    router.push("/auth/login");
  }

  const renderMobileMenuItems = () => {
    switch (mobileView) {
      case "account":
        return (
          <div className="space-y-4 animate-in slide-in-from-right-5 duration-200">
            <div className="flex items-center pb-4 border-b">
              <Button
                onClick={() => setMobileView("menu")}
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h3 className="ml-2 text-lg font-semibold text-gray-800">
                Account
              </h3>
            </div>
            <nav className="space-y-3">
              <button
                onClick={() => {
                  setShowSheetDialog(false);
                  router.push("/account");
                }}
                className="flex items-center w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <User className="mr-3 h-5 w-5 text-gray-600" />
                <span className="text-gray-800 font-medium">Your Account</span>
              </button>
              <button
                onClick={() => {
                  setShowSheetDialog(false);
                  setMobileView("menu");
                  handleLogout();
                }}
                className="flex items-center w-full p-3 text-left hover:bg-red-50 rounded-lg transition-colors duration-200 text-red-600"
              >
                <span className="font-medium">Logout</span>
              </button>
            </nav>
          </div>
        );

      default:
        return (
          <div className="space-y-6 py-6 animate-in slide-in-from-left-5 duration-200">
            <div className="space-y-2">
              {navItems.map((navItem) => (
                <button
                  className="block w-full font-semibold p-3 cursor-pointer text-left hover:bg-gray-50 rounded-lg transition-colors duration-200 text-gray-800"
                  onClick={() => {
                    setShowSheetDialog(false);
                    router.push(navItem.to);
                  }}
                  key={navItem.title}
                >
                  {navItem.title}
                </button>
              ))}
            </div>
            <div className="space-y-3 pt-4 border-t">
              <button
                onClick={() => setMobileView("account")}
                className="flex items-center w-full p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <User className="mr-3 h-5 w-5 text-gray-600" />
                <span className="text-gray-800 font-medium">Account</span>
              </button>
              <button
                onClick={() => {
                  setShowSheetDialog(false);
                  router.push("/cart");
                }}
                className="flex items-center w-full p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <ShoppingBag className="mr-3 h-5 w-5 text-gray-600" />
                <span className="text-gray-800 font-medium">
                  Cart ({items?.length || 0})
                </span>
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo Section */}
          <Link
            className="flex items-center space-x-2 text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            href="/"
          >
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </div>
            <span>ECOMMERCE</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
            <nav className="flex items-center space-x-8">
              {navItems.map((item, index) => (
                <Link
                  href={item.to}
                  key={index}
                  className="relative text-sm font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 group py-2 px-1"
                >
                  {item.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Search Button */}
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-gray-100 hover:scale-105 transition-all duration-200"
            >
              <Search className="h-5 w-5 text-gray-600" />
            </Button>

            {/* Wishlist Button */}
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-gray-100 hover:scale-105 transition-all duration-200"
            >
              <Heart className="h-5 w-5 text-gray-600" />
            </Button>

            {/* Cart Button */}
            <div
              className="relative cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105"
              onClick={() => router.push("/cart")}
            >
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              {items && items.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full flex items-center justify-center font-medium shadow-lg animate-pulse">
                  {items.length}
                </span>
              )}
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:bg-gray-100 hover:scale-105 transition-all duration-200"
                >
                  <User className="h-5 w-5 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 mt-2">
                <DropdownMenuItem
                  onClick={() => router.push("/account")}
                  className="cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                >
                  <User className="mr-2 h-4 w-4" />
                  Your Account
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer hover:bg-red-50 text-red-600 transition-colors duration-200"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Cart */}
            <div
              className="relative cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
              onClick={() => router.push("/cart")}
            >
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              {items && items.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {items.length}
                </span>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Sheet
              open={showSheetDialog}
              onOpenChange={() => {
                setShowSheetDialog(false);
                setMobileView("menu");
              }}
            >
              <Button
                onClick={() => setShowSheetDialog(!showSheetDialog)}
                size="icon"
                variant="ghost"
                className="hover:bg-gray-100 transition-all duration-200"
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </Button>
              <SheetContent side="left" className="w-80 p-0">
                <SheetHeader className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                  <SheetTitle className="text-left text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ECOMMERCE
                  </SheetTitle>
                </SheetHeader>
                <div className="p-6">{renderMobileMenuItems()}</div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
