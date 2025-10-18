"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateReviewData } from "@/store/useReviewStore";
import { useToast } from "@/hooks/use-toast";

interface ReviewFormProps {
  productId: string;
  orderId: string;
  onSubmit: (data: CreateReviewData) => Promise<void>;
  onCancel?: () => void;
}

export function ReviewForm({
  productId,
  orderId,
  onSubmit,
  onCancel,
}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        productId,
        orderId,
        rating,
        title: title.trim() || undefined,
        comment: comment.trim() || undefined,
      });

      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      });

      // Reset form
      setRating(0);
      setTitle("");
      setComment("");
    } catch (error: any) {
      toast({
        title: "Failed to submit review",
        description: error.response?.data?.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold">Write a Review</h3>

      <div>
        <Label className="text-sm font-medium mb-2 block">
          Rating <span className="text-red-500">*</span>
        </Label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= (hoveredRating || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="title" className="text-sm font-medium mb-2 block">
          Review Title (Optional)
        </Label>
        <Input
          id="title"
          placeholder="Summarize your experience"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
        />
      </div>

      <div>
        <Label htmlFor="comment" className="text-sm font-medium mb-2 block">
          Review (Optional)
        </Label>
        <textarea
          id="comment"
          placeholder="Share your thoughts about this product"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={1000}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">
          {comment.length}/1000 characters
        </p>
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          disabled={isSubmitting || rating === 0}
          className="flex-1"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
