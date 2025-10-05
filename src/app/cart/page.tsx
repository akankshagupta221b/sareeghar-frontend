"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import { Minus, Plus, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

function UserCartPage() {
  const {
    fetchCart,
    items,
    isLoading,
    updateCartItemQuantity,
    removeFromCart,
  } = useCartStore();
  const { user } = useAuthStore();
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    setIsUpdating(true);
    await updateCartItemQuantity(id, Math.max(1, newQuantity));
    setIsUpdating(false);
  };

  const handleRemoveItem = async (id: string) => {
    setIsUpdating(true);
    await removeFromCart(id);
    setIsUpdating(false);
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Please log in to view your cart
            </h1>
            <Link href="/auth/login">
              <Button>Go to Login</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <ShoppingCart className="mx-auto h-24 w-24 text-gray-400 mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link href="/listing">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          YOUR CART
        </h1>
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">
                    PRODUCT
                  </th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-900">
                    PRICE
                  </th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">
                    QUANTITY
                  </th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-900">
                    TOTAL
                  </th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-6 px-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg border"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-lg">
                            {item.name}
                          </h3>
                          <div className="flex gap-4 mt-2">
                            <p className="text-sm text-gray-600">
                              Color:{" "}
                              <span className="font-medium">{item.color}</span>
                            </p>
                            <p className="text-sm text-gray-600">
                              Size:{" "}
                              <span className="font-medium">{item.size}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-6 text-right">
                      <span className="text-lg font-semibold text-gray-900">
                        ${item.price.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          disabled={isUpdating || item.quantity <= 1}
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity - 1)
                          }
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          className="w-16 text-center border-gray-300 focus:border-blue-500"
                          value={item.quantity}
                          min="1"
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 1;
                            handleUpdateQuantity(item.id, Math.max(1, value));
                          }}
                        />
                        <Button
                          disabled={isUpdating}
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                    <td className="py-6 px-6 text-right">
                      <span className="text-lg font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </td>
                    <td className="py-6 px-6 text-center">
                      <Button
                        disabled={isUpdating}
                        onClick={() => handleRemoveItem(item.id)}
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="mt-8 flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <Link href="/listing">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>

          <div className="lg:w-96">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.length} items)</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => router.push("/checkout")}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3"
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Proceed to Checkout"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCartPage;
