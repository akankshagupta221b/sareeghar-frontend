/**
 * Review System - Usage Examples
 *
 * This file demonstrates how to use the review system components
 * in different scenarios throughout the application.
 */

import { ProductReviews } from "@/components/reviews";
import { useReviewStore } from "@/store/useReviewStore";
import { useEffect } from "react";

// ==========================================
// Example 1: Basic Product Page Integration
// ==========================================
export function ProductPageExample() {
  return (
    <div>
      {/* Your product details */}
      <div className="product-details">{/* ... product info ... */}</div>

      {/* Add reviews section */}
      <ProductReviews productId="cmgv8qrxn0002v7f8h4u7tre5" />
    </div>
  );
}

// ==========================================
// Example 2: Product Page with Order ID
// ==========================================
// When user has purchased the product, pass orderId
// to enable the review form
export function ProductPageWithOrderExample() {
  const orderId = "cmgv9dbls0005v7ckdijazipr"; // From user's order history

  return (
    <div>
      <div className="product-details">{/* ... product info ... */}</div>

      {/* User can write review because orderId is provided */}
      <ProductReviews productId="cmgv8qrxn0002v7f8h4u7tre5" orderId={orderId} />
    </div>
  );
}

// ==========================================
// Example 3: Programmatic Review Creation
// ==========================================
export function CreateReviewExample() {
  const { createReview } = useReviewStore();

  const handleSubmitReview = async () => {
    try {
      const review = await createReview({
        productId: "cmgv8qrxn0002v7f8h4u7tre5",
        orderId: "cmgv9dbls0005v7ckdijazipr",
        rating: 5,
        title: "Excellent product!",
        comment: "Highly recommend this to everyone. Quality is top-notch.",
      });

      console.log("Review created:", review);
    } catch (error) {
      console.error("Failed to create review:", error);
    }
  };

  return <button onClick={handleSubmitReview}>Submit Review</button>;
}

// ==========================================
// Example 4: Fetch and Display Stats Only
// ==========================================
export function ReviewStatsExample() {
  const { reviewStats, fetchProductReviewStats } = useReviewStore();
  const productId = "cmgv8qrxn0002v7f8h4u7tre5";

  useEffect(() => {
    fetchProductReviewStats(productId);
  }, [productId]);

  if (!reviewStats) return <div>Loading stats...</div>;

  return (
    <div>
      <h3>Product Rating</h3>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold">
          {reviewStats.averageRating.toFixed(1)}
        </span>
        <span>⭐</span>
        <span className="text-gray-600">
          ({reviewStats.totalReviews} reviews)
        </span>
      </div>
    </div>
  );
}

// ==========================================
// Example 5: Check if User Can Review
// ==========================================
export function CheckReviewEligibilityExample() {
  const { canUserReviewProduct } = useReviewStore();

  const checkEligibility = async () => {
    const canReview = await canUserReviewProduct(
      "cmgv8qrxn0002v7f8h4u7tre5", // productId
      "cmgv9dbls0005v7ckdijazipr" // orderId
    );

    if (canReview) {
      console.log("User can write a review");
    } else {
      console.log("User already reviewed this product for this order");
    }
  };

  return <button onClick={checkEligibility}>Check Review Eligibility</button>;
}

// ==========================================
// Example 6: Get User's Reviews
// ==========================================
export function UserReviewsExample() {
  const { getUserReviews } = useReviewStore();

  useEffect(() => {
    const fetchMyReviews = async () => {
      const myReviews = await getUserReviews();
      console.log("My reviews:", myReviews);
    };

    fetchMyReviews();
  }, []);

  return <div>Check console for user reviews</div>;
}

// ==========================================
// Example 7: Update Existing Review
// ==========================================
export function UpdateReviewExample() {
  const { updateReview } = useReviewStore();

  const handleUpdateReview = async () => {
    try {
      const updated = await updateReview(
        "cmgw00l960001910vrwyrby8m", // reviewId
        {
          rating: 5,
          title: "Updated: Even better than I thought!",
          comment: "After using it for a week, I'm even more impressed.",
        }
      );

      console.log("Review updated:", updated);
    } catch (error) {
      console.error("Failed to update review:", error);
    }
  };

  return <button onClick={handleUpdateReview}>Update Review</button>;
}

// ==========================================
// Example 8: Delete Review
// ==========================================
export function DeleteReviewExample() {
  const { deleteReview } = useReviewStore();

  const handleDeleteReview = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this review?"
    );

    if (confirmDelete) {
      const success = await deleteReview("cmgw00l960001910vrwyrby8m");

      if (success) {
        console.log("Review deleted successfully");
      }
    }
  };

  return <button onClick={handleDeleteReview}>Delete Review</button>;
}

// ==========================================
// Example 9: Mark Review as Helpful
// ==========================================
export function MarkHelpfulExample() {
  const { markReviewHelpful } = useReviewStore();

  const handleMarkHelpful = async () => {
    await markReviewHelpful("cmgw00l960001910vrwyrby8m");
    console.log("Review marked as helpful");
  };

  return <button onClick={handleMarkHelpful}>👍 Helpful</button>;
}

// ==========================================
// Example 10: Order Confirmation Page
// ==========================================
// Show review form after order is delivered
export function OrderConfirmationExample() {
  const orderId = "cmgv9dbls0005v7ckdijazipr";
  const purchasedProducts = [
    { id: "cmgv8qrxn0002v7f8h4u7tre5", name: "Product 1" },
    { id: "cmgv8qrxn0002v7f8h4u7tre6", name: "Product 2" },
  ];

  return (
    <div>
      <h2>Order Delivered! Leave a Review</h2>

      {purchasedProducts.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <ProductReviews productId={product.id} orderId={orderId} />
        </div>
      ))}
    </div>
  );
}
