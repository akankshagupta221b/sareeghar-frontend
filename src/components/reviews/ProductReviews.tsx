"use client";

import { useEffect, useState } from "react";
import { useReviewStore } from "@/store/useReviewStore";
import { useAuthStore } from "@/store/useAuthStore";
import { ReviewStats } from "./ReviewStats";
import { ReviewList } from "./ReviewList";
import { ReviewForm } from "./ReviewForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ProductReviewsProps {
  productId: string;
  orderId?: string; // Optional: if user purchased, they can review
}

export function ProductReviews({ productId, orderId }: ProductReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { toast } = useToast();
  const { user } = useAuthStore();

  const {
    reviews,
    reviewStats,
    isLoading,
    currentPage,
    totalPages,
    fetchProductReviews,
    fetchProductReviewStats,
    createReview,
    markReviewHelpful,
  } = useReviewStore();

  useEffect(() => {
    fetchProductReviews(productId);
    fetchProductReviewStats(productId);
  }, [productId, fetchProductReviews, fetchProductReviewStats]);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      fetchProductReviews(productId, currentPage + 1);
    }
  };

  const handleCreateReview = async (data: any) => {
    await createReview(data);
    setShowReviewForm(false);
    // Refresh stats after creating a review
    fetchProductReviewStats(productId);
  };

  const handleMarkHelpful = (reviewId: string) => {
    markReviewHelpful(reviewId);
  };

  const canWriteReview = user && orderId;

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold">Reviews</h2>
            {canWriteReview && !showReviewForm && (
              <Button onClick={() => setShowReviewForm(true)}>
                Write a Review
              </Button>
            )}
          </div>

          {/* Review Form */}
          {showReviewForm && canWriteReview && (
            <ReviewForm
              productId={productId}
              orderId={orderId}
              onSubmit={handleCreateReview}
              onCancel={() => setShowReviewForm(false)}
            />
          )}

          {/* Review Stats */}
          {reviewStats && reviewStats.totalReviews > 0 && (
            <ReviewStats stats={reviewStats} />
          )}

          {/* Review List */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Customer Reviews</h3>
            <ReviewList
              reviews={reviews}
              isLoading={isLoading}
              hasMore={currentPage < totalPages}
              onLoadMore={handleLoadMore}
              onMarkHelpful={handleMarkHelpful}
              isAuthenticated={!!user}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
