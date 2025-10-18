"use client";

import { useEffect, useState } from "react";
import { useReviewStore, Review } from "@/store/useReviewStore";
import { Star, Trash2, Edit, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

export function MyReviews() {
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { getUserReviews, updateReview, deleteReview } = useReviewStore();
  const { toast } = useToast();

  useEffect(() => {
    fetchUserReviews();
  }, []);

  const fetchUserReviews = async () => {
    setIsLoading(true);
    try {
      const reviews = await getUserReviews();
      setUserReviews(reviews);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setIsEditDialogOpen(true);
  };

  const handleUpdateReview = async (data: any) => {
    if (!editingReview) return;

    try {
      await updateReview(editingReview.id, {
        rating: data.rating,
        title: data.title,
        comment: data.comment,
      });

      toast({
        title: "Review updated successfully",
      });

      setIsEditDialogOpen(false);
      setEditingReview(null);
      fetchUserReviews();
    } catch (error: any) {
      toast({
        title: "Failed to update review",
        description: error.response?.data?.message || "Please try again later",
        variant: "destructive",
      });
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) return;

    try {
      const success = await deleteReview(reviewId);
      if (success) {
        toast({
          title: "Review deleted successfully",
        });
        fetchUserReviews();
      }
    } catch (error) {
      toast({
        title: "Failed to delete review",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white">
        <h2 className="text-2xl font-bold mb-6 tracking-wide">MY REVIEWS</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse border border-gray-200 rounded-lg p-6"
            >
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
              <div className="h-3 bg-gray-200 rounded w-full mb-2" />
              <div className="h-3 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (userReviews.length === 0) {
    return (
      <div className="bg-white">
        <h2 className="text-2xl font-bold mb-6 tracking-wide">MY REVIEWS</h2>
        <div className="border border-gray-200 rounded-lg p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <Star className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Reviews Yet
          </h3>
          <p className="text-gray-600 mb-6">
            You haven't written any reviews yet. Purchase products and share
            your experience!
          </p>
          <Button
            onClick={() => (window.location.href = "/account?tab=orders")}
          >
            View My Orders
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-wide mb-2">MY REVIEWS</h2>
          <p className="text-gray-600">
            Manage your product reviews ({userReviews.length} total)
          </p>
        </div>

        <div className="space-y-4">
          {userReviews.map((review) => (
            <div
              key={review.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              {/* Product Info */}
              {review.product && (
                <div className="mb-4 pb-4 border-b border-gray-100">
                  <a
                    href={`/listing/${review.productId}`}
                    className="font-semibold text-lg hover:text-blue-600 transition-colors"
                  >
                    {review.product.name}
                  </a>
                  <p className="text-sm text-gray-500 mt-1">
                    Product Code: {review.product.code}
                  </p>
                </div>
              )}

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(review.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              {/* Title */}
              {review.title && (
                <h4 className="font-semibold text-base mb-2">{review.title}</h4>
              )}

              {/* Comment */}
              {review.comment && (
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {review.comment}
                </p>
              )}

              {/* Badges */}
              <div className="flex items-center gap-3 mb-4">
                {review.isVerified && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✓ Verified Purchase
                  </span>
                )}
                {review.isApproved ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    ✓ Approved
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    ⏳ Pending Approval
                  </span>
                )}
                {review.helpfulCount > 0 && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    <ThumbsUp className="w-3 h-3 mr-1" />
                    {review.helpfulCount} helpful
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditReview(review)}
                  className="flex items-center gap-1"
                >
                  <Edit className="w-3 h-3" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteReview(review.id)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Review Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Edit Your Review
            </DialogTitle>
            {editingReview?.product && (
              <p className="text-sm text-gray-600 mt-1">
                {editingReview.product.name}
              </p>
            )}
          </DialogHeader>

          {editingReview && (
            <ReviewForm
              productId={editingReview.productId}
              orderId={editingReview.orderId}
              onSubmit={handleUpdateReview}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setEditingReview(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
