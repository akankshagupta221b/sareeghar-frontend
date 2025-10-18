"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/common/ProductCard";

// Configuration - Easy to modify
const collectionConfig = {
  shopNowText: "SHOP NOW",
  viewAllText: "VIEW ALL PRODUCTS",
  productsPerRow: 4, // Number of products to display per row
  maxProducts: 8, // Maximum products to show (null for all)
};

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  images: string[];
  isFeatured: boolean;
  rating: number;
  sortOrder: number;
  colors?: string[];
}

interface Collection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string | null;
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  products: Product[];
  _count: {
    products: number;
  };
}

interface CollectionProps {
  collection: Collection;
  isLoading?: boolean;
  error?: string | null;
}

export default function DressCollection({
  collection,
  isLoading = false,
  error = null,
}: CollectionProps) {
  // Loading State
  if (isLoading) {
    return (
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading collection...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-red-600 font-semibold mb-2">
                Error loading collection
              </p>
              <p className="text-gray-600">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // No Collection
  if (!collection) {
    return (
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-600">No collection available.</p>
          </div>
        </div>
      </section>
    );
  }

  // Get products to display
  const productsToDisplay = collectionConfig.maxProducts
    ? collection.products.slice(0, collectionConfig.maxProducts)
    : collection.products;

  // No Products in Collection
  if (collection.products.length === 0) {
    return (
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Collection Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-2">{collection.title}</h2>
            {collection.subtitle && (
              <p className="text-xl text-gray-600 mb-4">
                {collection.subtitle}
              </p>
            )}
            {collection.description && (
              <p className="text-gray-500 max-w-2xl mx-auto">
                {collection.description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-center h-64">
            <p className="text-gray-600">
              No products available in this collection yet.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Collection Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-2">{collection.title}</h2>
              {collection.subtitle && (
                <p className="text-xl text-gray-600 mb-2">
                  {collection.subtitle}
                </p>
              )}
              {collection.description && (
                <p className="text-gray-500 max-w-2xl">
                  {collection.description}
                </p>
              )}
            </div>

            <a
              href="/listing"
              className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-full text-sm font-semibold transition-colors group whitespace-nowrap"
            >
              {collectionConfig.shopNowText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Product Count */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-semibold">
              {collection._count.products} Product
              {collection._count.products !== 1 ? "s" : ""}
            </span>
            {collectionConfig.maxProducts &&
              collection.products.length > collectionConfig.maxProducts && (
                <>
                  <span>•</span>
                  <span>
                    Showing {collectionConfig.maxProducts} of{" "}
                    {collection.products.length}
                  </span>
                </>
              )}
          </div>
        </div>

        {/* Products Grid */}
        <div
          className="grid gap-6 mb-8"
          style={{
            gridTemplateColumns: `repeat(auto-fill, minmax(250px, 1fr))`,
          }}
        >
          {productsToDisplay.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.images[0]}
              category={collection.title}
              name={product.name}
              colors={product.colors || []}
              price={product.price}
            />
          ))}
        </div>

        {/* View All Button (if more products exist) */}
        {collectionConfig.maxProducts &&
          collection.products.length > collectionConfig.maxProducts && (
            <div className="text-center">
              <a
                href={`/listing?collection=${collection.id}`}
                className="inline-flex items-center gap-2 px-8 py-3 border-2 border-gray-300 hover:border-primary hover:text-primary rounded-full text-sm font-semibold transition-colors group"
              >
                {collectionConfig.viewAllText}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          )}
      </div>
    </section>
  );
}
