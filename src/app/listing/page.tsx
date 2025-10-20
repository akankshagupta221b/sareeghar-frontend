"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FilterSection from "@/components/listing/FilterSection";
import ListingBanner from "@/components/listing/ListingBanner";
import ProductGrid from "@/components/listing/ProductGrid";
import ProductPagination from "@/components/listing/ProductPagination";
import SortFilter from "@/components/listing/SortFilter";
import { useProductStore } from "@/store/useProductStore";
import { useSearchStore } from "@/store/useSearchStore";
import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useBrandStore } from "@/store/useBrandStore";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useSearchParams } from "next/navigation";

// Listing page configuration
const listingConfig = {
  banner: {
    title: "HOT COLLECTION",
    subtitle: "Discover our latest collection",
    imageUrl:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
  },
  pageTitle: "All Products",
  productsPerPage: 5,
};

function ProductListingPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const {
    products,
    currentPage,
    totalProducts,
    totalPages,
    setCurrentPage,
    fetchProductsForClient,
    isLoading,
    error,
  } = useProductStore();

  const {
    results: searchResults,
    isLoading: isSearchLoading,
    error: searchError,
    search,
    clearSearch,
  } = useSearchStore();

  const {
    brands,
    isLoading: isLoadingBrands,
    error: errorBrands,
    fetchBrands,
  } = useBrandStore();

  const {
    categories,
    isLoading: isLoadingCategories,
    error: errorCategories,
    fetchCategories,
  } = useCategoryStore();

  const fetchAllProducts = () => {
    // If there's a search query, use search API instead
    if (searchQuery) {
      // Convert brand names to brand IDs
      const brandIds = selectedBrands
        .map((brandName) => {
          const brand = brands.find((b) => b.name === brandName);
          return brand?.id;
        })
        .filter((id): id is string => id !== undefined);

      // Convert category names to category IDs
      const categoryIds = selectedCategories
        .map((categoryName) => {
          const category = categories.find((c) => c.name === categoryName);
          return category?.id;
        })
        .filter((id): id is string => id !== undefined);

      search({
        query: searchQuery,
        page: currentPage,
        limit: listingConfig.productsPerPage,
        categories: categoryIds,
        brands: brandIds,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        sortBy,
        sortOrder,
      });
    } else {
      // Normal product fetch
      const brandIds = selectedBrands
        .map((brandName) => {
          const brand = brands.find((b) => b.name === brandName);
          return brand?.id;
        })
        .filter((id): id is string => id !== undefined);

      const categoryIds = selectedCategories
        .map((categoryName) => {
          const category = categories.find((c) => c.name === categoryName);
          return category?.id;
        })
        .filter((id): id is string => id !== undefined);

      fetchProductsForClient({
        page: currentPage,
        limit: listingConfig.productsPerPage,
        categories: categoryIds,
        sizes: selectedSizes,
        colors: selectedColors,
        brands: brandIds,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        mrp: priceRange[1],
        sellingPrice: priceRange[1],
        sortBy,
        sortOrder,
      });
    }
  };

  const handleSortChange = (value: string) => {
    const [newSortBy, newSortOrder] = value.split("-");
    setSortBy(newSortBy);
    setSortOrder(newSortOrder as "asc" | "desc");
  };

  const handleToggleFilter = (
    filterType: "categories" | "sizes" | "brands" | "colors",
    value: string
  ) => {
    const setterMap = {
      categories: setSelectedCategories,
      sizes: setSelectedSizes,
      colors: setSelectedColors,
      brands: setSelectedBrands,
    };

    setterMap[filterType]((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchAllProducts();
    fetchBrands();
    fetchCategories();
  }, [
    searchQuery,
    currentPage,
    selectedCategories,
    selectedSizes,
    selectedBrands,
    selectedColors,
    priceRange,
    sortBy,
    sortOrder,
  ]);

  // Clear search when component unmounts or search query is removed
  useEffect(() => {
    if (!searchQuery) {
      clearSearch();
    }
  }, [searchQuery, clearSearch]);

  // Determine which data to display
  const displayProducts = searchQuery ? searchResults.products : products;
  const displayLoading = searchQuery ? isSearchLoading : isLoading;
  const displayError = searchQuery ? searchError : error;
  const pageTitle = searchQuery
    ? `Search Results for "${searchQuery}"`
    : listingConfig.pageTitle;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Header with Title and Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
              {pageTitle}
            </h2>
            {searchQuery && (
              <p className="text-sm text-gray-600 mt-1">
                {totalProducts} {totalProducts === 1 ? "result" : "results"}{" "}
                found
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto">
            {/* Clear Search Button */}
            {searchQuery && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  window.location.href = "/listing";
                }}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Clear Search
              </Button>
            )}

            {/* Mobile Filter Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="lg:hidden flex-1 sm:flex-none"
                  size="sm"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] sm:w-[90vw] max-h-[85vh] sm:max-h-[600px] overflow-auto max-w-[400px]">
                <DialogHeader>
                  <DialogTitle>Filters</DialogTitle>
                </DialogHeader>
                <FilterSection
                  selectedCategories={selectedCategories}
                  selectedSizes={selectedSizes}
                  selectedColors={selectedColors}
                  selectedBrands={selectedBrands}
                  priceRange={priceRange}
                  brands={brands}
                  categories={categories}
                  onToggleFilter={handleToggleFilter}
                  onPriceRangeChange={setPriceRange}
                />
              </DialogContent>
            </Dialog>

            {/* Sort Filter */}
            <div className="flex-1 sm:flex-none">
              <SortFilter
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
              />
            </div>
          </div>
        </div>
        {/* Main Content: Filters and Products */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-64 xl:w-72 flex-shrink-0">
            <FilterSection
              selectedCategories={selectedCategories}
              selectedSizes={selectedSizes}
              selectedColors={selectedColors}
              selectedBrands={selectedBrands}
              priceRange={priceRange}
              brands={brands}
              categories={categories}
              onToggleFilter={handleToggleFilter}
              onPriceRangeChange={setPriceRange}
            />
          </div>

          {/* Product Grid and Pagination */}
          <div className="flex-1 min-w-0">
            <ProductGrid
              products={displayProducts}
              isLoading={displayLoading}
              error={displayError}
            />

            {/* Pagination */}
            {!displayLoading && !displayError && displayProducts.length > 0 && (
              <ProductPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductListingPage;
