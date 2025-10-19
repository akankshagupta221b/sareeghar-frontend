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
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import ProductDetailsSkeleton from "./productSkeleton";
import Link from "next/link";

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
          <span className="text-gray-400 uppercase line-clamp-1">
            {product.name}
          </span>
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
    </div>
  );
}

export default ProductDetailsContent;
