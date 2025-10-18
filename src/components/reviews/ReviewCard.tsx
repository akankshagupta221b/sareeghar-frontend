"use client";

import { Review } from "@/store/useReviewStore";
import { Star, ThumbsUp, BadgeCheck } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ReviewCardProps {
  review: Review;
  onMarkHelpful?: (reviewId: string) => void;
  isAuthenticated?: boolean;
}

export function ReviewCard({ review, onMarkHelpful, isAuthenticated }: ReviewCardProps) {
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount);

  const handleMarkHelpful = () => {
    if (!isAuthenticated || isHelpful) return;
    
    setIsHelpful(true);
    setHelpfulCount((prev) => prev + 1);
    onMarkHelpful?.(review.id);
  };

  return (
    <div className="border-b border-gray-200 pb-6 last:border-b-0">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-600">
              {review.user.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-sm">{review.user.name}</h4>
            {review.isVerified && (
              <div className="flex items-center gap-1 text-green-600">
                <BadgeCheck className="w-4 h-4" />
                <span className="text-xs">Verified Purchase</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= review.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(review.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>

          {review.title && (
            <h5 className="font-semibold text-sm mb-2">{review.title}</h5>
          )}

          {review.comment && (
            <p className="text-sm text-gray-700 mb-3 leading-relaxed">
              {review.comment}
            </p>
          )}

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkHelpful}
              disabled={!isAuthenticated || isHelpful}
              className="text-xs h-8 px-3"
            >
              <ThumbsUp className={`w-3 h-3 mr-1 ${isHelpful ? "fill-current" : ""}`} />
              Helpful ({helpfulCount})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
