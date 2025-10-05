"use client";

import { Suspense } from "react";
import ProductDetailsSkeleton from "./productSkeleton";
import ProductDetailsContent from "./productDetails";
import { useParams } from "next/navigation";

async function ProductDetailsPage() {
  const { id } = useParams();
  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetailsContent id={id} />
    </Suspense>
  );
}

export default ProductDetailsPage;
