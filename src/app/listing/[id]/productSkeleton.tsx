"use client";

import { Skeleton } from "@/components/ui/skeleton";

function ProductDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-5 sm:py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-5 sm:gap-6 md:gap-8">
          <div className="lg:w-2/3 flex gap-3 sm:gap-4">
            <div className="hidden lg:flex flex-col gap-2 w-20 sm:w-24">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="w-20 h-24 sm:w-24 sm:h-24" />
              ))}
            </div>
            <Skeleton className="flex-1 aspect-[3/4] rounded-md" />
          </div>
          <div className="lg:w-1/3 space-y-4 sm:space-y-5 md:space-y-6">
            <div>
              <Skeleton className="h-7 sm:h-8 w-2/4 mb-2" />
              <Skeleton className="h-5 sm:h-6 w-1/4" />
            </div>
            <div>
              <Skeleton className="h-4 w-1/4 mb-2" />
              <div className="flex gap-2">
                {[...Array(4)].map((_, index) => (
                  <Skeleton key={index} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" />
                ))}
              </div>
            </div>
            <div>
              <Skeleton className="h-4 w-1/4 mb-2" />
              <div className="flex gap-2">
                {[...Array(5)].map((_, index) => (
                  <Skeleton key={index} className="w-10 h-10 sm:w-12 sm:h-12" />
                ))}
              </div>
            </div>
            <div>
              <Skeleton className="h-5 w-1/4 mb-2" />
              <div className="flex gap-3">
                <Skeleton className="w-9 h-9 sm:w-10 sm:h-10" />
                <Skeleton className="w-9 h-9 sm:w-10 sm:h-10" />
                <Skeleton className="w-9 h-9 sm:w-10 sm:h-10" />
              </div>
            </div>
            <div>
              <Skeleton className="h-10 sm:h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsSkeleton;
