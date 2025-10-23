"use client";

import {
  ColorSelector,
  ProductActions,
  ProductHeader,
  ProductImageGallery,
  ProductInfoPanel,
  QuantitySelector,
  SizeSelector,
} from "@/components/product-details";
import { ProductReviews } from "@/components/reviews";
import { useCartStore } from "@/store/useCartStore";
import { useProductStore } from "@/store/useProductStore";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useSearchStore } from "@/store/useSearchStore";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import ProductDetailsSkeleton from "./productSkeleton";
import Link from "next/link";
import ProductCard from "@/components/common/ProductCard";
import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/utils/api";

function ProductDetailsContent({ id }: { id: string }) {
  const [product, setProduct] = useState<any>(null);
  const { getProductById, isLoading } = useProductStore();
  const { categories, fetchCategories } = useCategoryStore();
  const { addToCart } = useCartStore();
  const { toast } = useToast();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [isLoadingRelated, setIsLoadingRelated] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const productDetails = await getProductById(id);
      if (productDetails) {
        setProduct(productDetails);
      } else {
        router.push("/404");
      }
    };

    fetchProduct();
  }, [id, getProductById, router]);

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories.length, fetchCategories]);

  // Get category name from category ID
  const categoryName = useMemo(() => {
    if (!product?.category) return "Saree";
    const category = categories.find((cat) => cat.id === product.category);
    return category?.name || "Saree";
  }, [product?.category, categories]);

  // Fetch related products based on category
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product?.category || categories.length === 0) return;

      setIsLoadingRelated(true);
      try {
        // Get the category name
        const category = categories.find((cat) => cat.id === product.category);
        if (!category) {
          // No category found, fetch popular products
          console.log("No category found, fetching popular products");
          const response = await axiosInstance.get(
            `${API_ROUTES.SEARCH}/popular`
          );
          if (response.data.popularSearches?.length > 0) {
            const popularResponse = await axiosInstance.get(
              `${API_ROUTES.SEARCH}`,
              {
                params: {
                  q: response.data.popularSearches[0],
                  limit: 8,
                },
              }
            );
            const products =
              popularResponse.data.results?.products ||
              popularResponse.data.products ||
              [];
            const filtered = products
              .filter((p: any) => p.id !== id)
              .slice(0, 4);
            setRelatedProducts(filtered);
          }
          return;
        }

        // Make direct API call to search by category name
        console.log("Fetching products for category:", category.name);
        // q=saree&page=1&limit=32&minPrice=0&maxPrice=100000&sortBy=createdAt&sortOrder=desc

        const response = await axiosInstance.get(`${API_ROUTES.SEARCH}`, {
          params: {
            // q: category.name != null ? category.name.toLowerCase() : "", // Using product name as search query
            q: category.name.toLowerCase(), // Using product name as search query
            // categories: "sarees",
            limit: 8,
          },
        });

        console.log("response of the products: ", response);
        const products =
          response.data.results?.products || response.data.products || [];
        console.log("Products fetched:", products);

        // Filter out current product and limit to 4
        const filtered = products.filter((p: any) => p.id !== id).slice(0, 4);
        setRelatedProducts(filtered);
        setIsLoadingRelated(false);
      } catch (error) {
        console.error("Error fetching related products:", error);
        // Fallback: try to get popular products
        try {
          const response = await axiosInstance.get(
            `${API_ROUTES.SEARCH}/popular`
          );
          if (response.data.popularSearches?.length > 0) {
            const popularResponse = await axiosInstance.get(
              `${API_ROUTES.SEARCH}`,
              {
                params: {
                  q: response.data.popularSearches[0],
                  limit: 8,
                },
              }
            );
            const products =
              popularResponse.data.results?.products ||
              popularResponse.data.products ||
              [];
            const filtered = products
              .filter((p: any) => p.id !== id)
              .slice(0, 4);
            setRelatedProducts(filtered);
          }
        } catch (fallbackError) {
          console.error("Error fetching popular products:", fallbackError);
        }
        setIsLoadingRelated(false);
      }
    };

    fetchRelatedProducts();
  }, [product?.category, categories, id]);

  const handleAddToCart = () => {
    if (product) {
      if (!selectedSize) {
        toast({
          title: "Please select a size",
          variant: "destructive",
        });
        return;
      }

      addToCart({
        productId: product.id,
        name: product.name,
        price: product.sellingPrice ? product.sellingPrice : product.price,
        mrp: product.mrp,
        sellingPrice: product.sellingPrice,
        image: product.images[0],
        color: product.colors[selectedColor],
        size: selectedSize,
        quantity: quantity,
      });

      toast({
        title: "Product added to cart",
        description: `${quantity}x ${product.name} has been added to your cart.`,
      });
    }
  };

  if (!product || isLoading) return <ProductDetailsSkeleton />;

  // Product specifications
  const specifications = [
    "TRADITIONAL STYLE",
    "PREMIUM FABRIC",
    "INTRICATE DESIGN",
    "COMFORTABLE FIT",
    "HAND-CRAFTED DETAILS",
    "AUTHENTIC CRAFTSMANSHIP",
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
          <Link href="/" className="font-semibold hover:underline">
            MAIN
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/listing" className="font-semibold hover:underline">
            PRODUCTS
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400 line-clamp-1">{product.name}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-5 sm:py-6 md:py-8">
        <div className="grid lg:grid-cols-2 gap-5 sm:gap-6 md:gap-8 lg:gap-12">
          {/* Left - Images */}
          <ProductImageGallery
            images={product.images}
            productName={product.name}
          />

          {/* Right - Product Info */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {/* Header with Favorite */}
            <ProductHeader
              category={categoryName}
              name={product.name}
              price={product.sellingPrice}
              mrp={product.mrp}
              sellingPrice={product.sellingPrice}
              onFavoriteToggle={(isFavorite) => {
                console.log("Favorite toggled:", isFavorite);
              }}
            />

            {/* Color Selection */}
            <ColorSelector
              colors={product.colors}
              selectedColor={selectedColor}
              onColorSelect={setSelectedColor}
            />

            {/* Size Selection */}
            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSizeSelect={setSelectedSize}
            />

            {/* Quantity Selection */}
            <QuantitySelector
              quantity={quantity}
              onQuantityChange={setQuantity}
              min={1}
              max={10}
            />

            {/* Add to Cart & Delivery Info */}
            <ProductActions
              onAddToCart={handleAddToCart}
              disabled={!selectedSize}
              product={product}
            />
          </div>
        </div>
      </div>

      {/* Product Reviews Section */}
      <ProductReviews productId={id} />

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
              Related Products
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              More products from {categoryName}
            </p>
          </div>

          {isLoadingRelated ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-4 text-gray-600">
                  Loading related products...
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  id={relatedProduct.id}
                  image={relatedProduct.images[0]}
                  name={relatedProduct.name}
                  category={categoryName}
                  colors={relatedProduct.colors}
                  price={relatedProduct.price}
                  mrp={relatedProduct.mrp}
                  sellingPrice={relatedProduct.sellingPrice}
                />
              ))}
            </div>
          )}

          {/* View All Link */}
          <div className="mt-6 sm:mt-8 text-center">
            <Link
              href={`/listing?categories=${encodeURIComponent(categoryName)}`}
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-black text-black font-medium hover:bg-black hover:text-white transition-colors"
            >
              View All {categoryName}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailsContent;
