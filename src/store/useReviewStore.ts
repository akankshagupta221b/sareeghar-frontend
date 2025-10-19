import { API_ROUTES } from "@/utils/api";
import axiosInstance from "@/lib/axios";
import { create } from "zustand";

export interface Review {
  id: string;
  userId: string;
  productId: string;
  orderId: string;
  rating: number;
  title?: string;
  comment?: string;
  isVerified: boolean;
  isApproved: boolean;
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  product?: {
    id: string;
    name: string;
    code: string;
  };
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export interface CreateReviewData {
  productId: string;
  orderId: string;
  rating: number;
  title?: string;
  comment?: string;
}

interface ReviewState {
  reviews: Review[];
  reviewStats: ReviewStats | null;
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalReviews: number;

  // Actions
  fetchProductReviews: (
    productId: string,
    page?: number,
    limit?: number
  ) => Promise<void>;
  fetchProductReviewStats: (productId: string) => Promise<void>;
  createReview: (reviewData: CreateReviewData) => Promise<Review>;
  updateReview: (
    id: string,
    reviewData: Partial<CreateReviewData>
  ) => Promise<Review>;
  deleteReview: (id: string) => Promise<boolean>;
  markReviewHelpful: (id: string) => Promise<void>;
  canUserReviewProduct: (
    productId: string,
    orderId: string
  ) => Promise<boolean>;
  getUserReviews: () => Promise<Review[]>;
  clearReviews: () => void;
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  reviews: [],
  reviewStats: null,
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalReviews: 0,

  fetchProductReviews: async (productId: string, page = 1, limit = 10) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(
        `${API_ROUTES.REVIEWS}/product/${productId}`,
        {
          params: { page, limit },
        }
      );

      set({
        reviews: response.data.reviews || response.data,
        currentPage: response.data.currentPage || page,
        totalPages: response.data.totalPages || 1,
        totalReviews: response.data.totalReviews || response.data.length || 0,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch reviews",
        isLoading: false,
      });
    }
  },

  fetchProductReviewStats: async (productId: string) => {
    try {
      const response = await axiosInstance.get(
        `${API_ROUTES.REVIEWS}/product/${productId}/stats`
      );

      set({
        reviewStats: response.data.stats || response.data,
      });
    } catch (error: any) {
      console.error("Failed to fetch review stats:", error);
    }
  },

  createReview: async (reviewData: CreateReviewData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post(
        `${API_ROUTES.REVIEWS}`,
        reviewData
      );

      const newReview = response.data.review || response.data;

      // Add the new review to the beginning of the list
      set((state) => ({
        reviews: [newReview, ...state.reviews],
        totalReviews: state.totalReviews + 1,
        isLoading: false,
      }));

      return newReview;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to create review",
        isLoading: false,
      });
      throw error;
    }
  },

  updateReview: async (id: string, reviewData: Partial<CreateReviewData>) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.put(
        `${API_ROUTES.REVIEWS}/${id}`,
        reviewData
      );

      const updatedReview = response.data.review || response.data;

      // Update the review in the list
      set((state) => ({
        reviews: state.reviews.map((review) =>
          review.id === id ? updatedReview : review
        ),
        isLoading: false,
      }));

      return updatedReview;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to update review",
        isLoading: false,
      });
      throw error;
    }
  },

  deleteReview: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`${API_ROUTES.REVIEWS}/${id}`);

      // Remove the review from the list
      set((state) => ({
        reviews: state.reviews.filter((review) => review.id !== id),
        totalReviews: state.totalReviews - 1,
        isLoading: false,
      }));

      return true;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to delete review",
        isLoading: false,
      });
      return false;
    }
  },

  markReviewHelpful: async (id: string) => {
    try {
      const response = await axiosInstance.post(
        `${API_ROUTES.REVIEWS}/${id}/helpful`,
        {}
      );

      // Update the helpful count in the list
      set((state) => ({
        reviews: state.reviews.map((review) =>
          review.id === id
            ? { ...review, helpfulCount: review.helpfulCount + 1 }
            : review
        ),
      }));
    } catch (error: any) {
      console.error("Failed to mark review as helpful:", error);
    }
  },

  canUserReviewProduct: async (productId: string, orderId: string) => {
    try {
      const response = await axiosInstance.get(
        `${API_ROUTES.REVIEWS}/check/${productId}/${orderId}`
      );

      return response.data.canReview || false;
    } catch (error: any) {
      console.error("Failed to check review eligibility:", error);
      return false;
    }
  },

  getUserReviews: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(
        `${API_ROUTES.REVIEWS}/my-reviews`
      );

      const userReviews = response.data.reviews || response.data;
      set({ isLoading: false });
      return userReviews;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch user reviews",
        isLoading: false,
      });
      return [];
    }
  },

  clearReviews: () => {
    set({
      reviews: [],
      reviewStats: null,
      currentPage: 1,
      totalPages: 1,
      totalReviews: 0,
      error: null,
    });
  },
}));
