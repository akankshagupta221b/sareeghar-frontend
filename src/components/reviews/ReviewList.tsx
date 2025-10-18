"use client";

import { Review } from "@/store/useReviewStore";
import { ReviewCard } from "./ReviewCard";
import { Button } from "@/components/ui/button";

interface ReviewListProps {
  reviews: Review[];
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  onMarkHelpful?: (reviewId: string) => void;
  isAuthenticated?: boolean;
}

export function ReviewList({
  reviews,
  isLoading,
  hasMore,
  onLoadMore,
  onMarkHelpful,
  isAuthenticated,
}: ReviewListProps) {
  if (isLoading && reviews.length === 0) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-3 bg-gray-200 rounded w-1/3" />
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          onMarkHelpful={onMarkHelpful}
          isAuthenticated={isAuthenticated}
        />
      ))}

      {hasMore && (
        <div className="text-center pt-4">
          <Button
            variant="outline"
            onClick={onLoadMore}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load More Reviews"}
          </Button>
        </div>
      )}
    </div>
  );
}
