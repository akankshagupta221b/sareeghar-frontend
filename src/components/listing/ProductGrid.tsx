"use client";

import ProductCard from "../common/ProductCard";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useEffect, useMemo } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  mrp: number;
  sellingPrice: number;
  images: string[];
  colors: string[];
  category?: string;
}

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

export default function ProductGrid({
  products,
  isLoading,
  error,
}: ProductGridProps) {
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories.length, fetchCategories]);

  // Create a map for quick category lookup
  const categoryMap = useMemo(() => {
    return categories.reduce((acc, category) => {
      acc[category.id] = category.name;
      return acc;
    }, {} as Record<string, string>);
  }, [categories]);

  // Helper function to get category name by ID
  const getCategoryName = (categoryId?: string) => {
    if (!categoryId) return "Saree";
    return categoryMap[categoryId] || "Saree";
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">
            Error loading products
          </p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-600 text-lg">No products found</p>
          <p className="text-gray-500 text-sm mt-2">
            Try adjusting your filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 md:gap-5 lg:gap-6">
      {products.map((productItem) => (
        <ProductCard
          key={productItem.id}
          id={productItem.id}
          image={productItem.images[0]}
          name={productItem.name}
          category={getCategoryName(productItem.category)}
          colors={productItem.colors}
          price={productItem.price}
          mrp={productItem.mrp}
          sellingPrice={productItem.sellingPrice}
        />
      ))}
    </div>
  );
}
