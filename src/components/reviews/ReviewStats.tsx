"use client";

import { ReviewStats as ReviewStatsType } from "@/store/useReviewStore";
import { Star } from "lucide-react";

interface ReviewStatsProps {
  stats: ReviewStatsType;
}

export function ReviewStats({ stats }: ReviewStatsProps) {
  const { averageRating, totalReviews, ratingDistribution } = stats;

  const getRatingPercentage = (count: number) => {
    return totalReviews > 0 ? (count / totalReviews) * 100 : 0;
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>

      <div className="flex items-center gap-4 mb-6">
        <div className="text-center">
          <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
          <div className="flex items-center gap-1 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.round(averageRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <span className="text-sm w-3">{rating}</span>
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all"
                  style={{
                    width: `${getRatingPercentage(
                      ratingDistribution[
                        rating as keyof typeof ratingDistribution
                      ]
                    )}%`,
                  }}
                />
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">
                {ratingDistribution[rating as keyof typeof ratingDistribution]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
