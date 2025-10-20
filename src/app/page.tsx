"use client";

import { HomePageBanner } from "@/components/banner/HomePageBanner";
import VideoBanner from "@/components/banner/VideoBanner";
import DressCollection from "@/components/collections/Collection-1";
import { Button } from "@/components/ui/button";
import { useBrandStore } from "@/store/useBrandStore";
import { useCollectionsStore } from "@/store/useCollectionsStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import Image from "next/image";
import { useEffect } from "react";

function HomePage() {
  const { banners, featuredProducts, fetchFeaturedProducts, fetchBanners } =
    useSettingsStore();
  const { collections, isLoading, error, fetchCollections } =
    useCollectionsStore();
  const {
    brands,
    isLoading: isLoadingBrands,
    error: errorBrands,
    fetchBrands,
  } = useBrandStore();

  useEffect(() => {
    fetchBanners();
    fetchFeaturedProducts();
    fetchCollections();
    fetchBrands();
  }, [fetchBanners, fetchFeaturedProducts, fetchCollections]);

  // Get the first featured or active collection
  const featuredCollection =
    collections.find((col) => col.isActive) ||
    collections.find((col) => col.isActive);

  return (
    <div className="min-h-screen bg-white">
      {/* Banner section */}
      <HomePageBanner banners={banners} />

      {/* Feature products section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-xs md:text-sm uppercase tracking-[0.3em] font-semibold text-primary">
                LATEST COLLECTION
              </span>
            </div>
            <h2 className="text-4xl font-secondary md:text-5xl font-bold mb-4 text-gray-900">
              NEW ARRIVALS
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Shop our new arrivals from established brands
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((productItem, index) => (
              <div
                key={index}
                className="group relative bg-white overflow-hidden border hover:shadow-2xl transition-all duration-500"
              >
                {/* Product Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  <Image
                    src={productItem.images[0]}
                    alt={productItem.name}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    width={300}
                    height={400}
                  />

                  {/* New Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      NEW
                    </span>
                  </div>

                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <Button
                      onClick={() => {
                        window.location.href = `/listing/${productItem.id}`;
                      }}
                      className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-base font-semibold rounded-full shadow-xl hover:scale-110 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                    >
                      QUICK VIEW
                    </Button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5 bg-white">
                  <h3 className="text-xl font-medium truncate text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    {productItem.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-gray-900">
                      ₹{productItem.price}
                    </p>
                    <button
                      onClick={() => {
                        window.location.href = `/listing/${productItem.id}`;
                      }}
                      className="text-primary hover:text-primary/80 transition-colors duration-300"
                      aria-label="View product"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Button
              onClick={() => (window.location.href = "/listing")}
              variant="outline"
              className="px-8 py-6 text-base font-semibold rounded-full border-2 border-gray-300 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 hover:scale-105"
            >
              VIEW ALL PRODUCTS
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 ml-2 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Button>
          </div>
        </div>
      </section>

      {/* Brands section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-xs md:text-sm uppercase tracking-[0.3em] font-semibold text-primary">
                OUR PARTNERS
              </span>
            </div>
            <h2 className="text-4xl font-secondary md:text-5xl font-bold mb-4 text-gray-900">
              FEATURED BRANDS
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover premium quality from the world's most trusted brands
            </p>
          </div>

          {/* Brands Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brands
              .filter((brand) => brand.isActive)
              .map((brand) => (
                <div
                  key={brand.id}
                  className="group relative bg-white rounded-sm hover:shadow-2xl transition-all duration-500 overflow-hidden "
                >
                  {/* Brand Logo Container */}
                  <div className="h-96 flex items-center justify-center bg-gradient-to-br from-white to-gray-50 group-hover:from-gray-50 group-hover:to-white transition-all duration-500">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      className="max-w-full max-h-full object-fill transition-all duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Brand Info Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                    <div className="p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                        {brand.name}
                      </h3>
                      <p className="text-sm text-gray-200 mb-4 line-clamp-2">
                        {brand.description || "Explore our collection"}
                      </p>
                      <Button
                        onClick={() => {
                          window.location.href = `/listing?brand=${brand.name}`;
                        }}
                        size="sm"
                        className="w-full bg-white text-black hover:bg-gray-100 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                      >
                        SHOP NOW
                      </Button>
                    </div>
                  </div>

                  {/* Corner Badge */}
                  <div className="absolute top-3 right-3 bg-primary/10 backdrop-blur-sm px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs font-semibold text-primary">
                      Featured
                    </span>
                  </div>
                </div>
              ))}
          </div>

          {/* View All Brands Button */}
          {brands.length > 6 && (
            <div className="text-center mt-12">
              <Button
                onClick={() => (window.location.href = "/brands")}
                variant="outline"
                className="px-8 py-6 text-base font-semibold rounded-full border-2 border-gray-300 hover:border-primary hover:text-primary transition-all duration-300 hover:scale-105"
              >
                VIEW ALL BRANDS
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 ml-2 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Collection section - Shows single featured collection */}
      {featuredCollection && (
        <DressCollection
          collection={featuredCollection}
          isLoading={isLoading}
          error={error}
        />
      )}

      <VideoBanner />
    </div>
  );
}

export default HomePage;
