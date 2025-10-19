import { API_ROUTES } from "@/utils/api";
import axiosInstance from "@/lib/axios";
import { create } from "zustand";

export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usageCount: number;
}

interface CouponStore {
  couponList: Coupon[];
  isLoading: boolean;
  error: string | null;
  fetchCoupons: () => Promise<void>;
  createCoupon: (
    coupon: Omit<Coupon, "id" | "usageCount">
  ) => Promise<Coupon | null>;
  deleteCoupon: (id: string) => Promise<boolean>;
}

export const useCouponStore = create<CouponStore>((set, get) => ({
  couponList: [],
  isLoading: false,
  error: null,
  fetchCoupons: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(
        `${API_ROUTES.COUPON}/fetch-all-coupons`
      );
      set({ couponList: response.data.couponList, isLoading: false });
    } catch (e) {
      set({ isLoading: false, error: "Failed to fetch coupons" });
    }
  },
  createCoupon: async (coupon) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post(
        `${API_ROUTES.COUPON}/create-coupon`,
        coupon
      );

      set({ isLoading: false });
      return response.data.coupon;
    } catch (e) {
      set({ isLoading: false, error: "Failed to fetch coupons" });
      return null;
    }
  },
  deleteCoupon: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.delete(`${API_ROUTES.COUPON}/${id}`);
      set({ isLoading: false });
      return response.data.success;
    } catch (error) {
      set({ isLoading: false, error: "Failed to fetch coupons" });
      return null;
    }
  },
}));
