import { API_ROUTES } from "@/utils/api";
import axiosInstance from "@/lib/axios";
import { create } from "zustand";

// Types based on Shiprocket API response
interface CourierDetails {
  courier_company_id: number;
  courier_name: string;
  rating: number;
  estimated_delivery_days: string;
  etd: string;
  rate: number;
  freight_charge: number;
  cod: number;
  cod_charges: number;
  realtime_tracking: string;
  delivery_performance: number;
  pickup_performance: number;
  tracking_performance: number;
}

interface ServiceabilityResponse {
  data: {
    available_courier_companies: CourierDetails[];
  };
}

interface TopCourierItem {
  score: number;
  courier: CourierDetails;
}

interface TopCouriersResponse {
  topCouriers: TopCourierItem[];
  allCouriers: ServiceabilityResponse;
}

interface CheckServicibilityParams {
  pickup_postcode: string;
  delivery_postcode: string;
  cod: number;
  weight: number;
}

interface ShiprocketStore {
  isLoading: boolean;
  error: string | null;
  serviceabilityData: ServiceabilityResponse | null;
  bestCourier: CourierDetails | null;
  topCouriers: TopCouriersResponse | null;
  checkServicibility: (
    params: CheckServicibilityParams
  ) => Promise<ServiceabilityResponse | null>;
  getBestCourier: (
    params: CheckServicibilityParams
  ) => Promise<CourierDetails | null>;
  getTopCouriers: (
    params: CheckServicibilityParams,
    count?: number
  ) => Promise<TopCouriersResponse | null>;
}

export const useShiprocketStore = create<ShiprocketStore>((set, get) => ({
  isLoading: false,
  error: null,
  serviceabilityData: null,
  bestCourier: null,
  topCouriers: null,

  checkServicibility: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post(
        `${API_ROUTES.SHIPROCKET}/serviceability`,
        params
      );

      if (!response.data.success) {
        set({
          error: response.data.error || "Failed to check serviceability",
          isLoading: false,
        });
        return null;
      }

      set({
        serviceabilityData: response.data.data,
        isLoading: false,
      });
      return response.data.data;
    } catch (error: any) {
      set({
        error: error?.response?.data?.error || "Failed to check serviceability",
        isLoading: false,
      });
      return null;
    }
  },

  getBestCourier: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post(
        `http://localhost:3001/api/shiprocket/courier/best`,
        params
      );

      if (!response.data.success) {
        set({
          error: response.data.error || "Failed to get best courier",
          isLoading: false,
        });
        return null;
      }

      set({
        bestCourier: response.data.data.bestCourier,
        isLoading: false,
      });
      return response.data.data.bestCourier;
    } catch (error: any) {
      set({
        error: error?.response?.data?.error || "Failed to get best courier",
        isLoading: false,
      });
      return null;
    }
  },

  getTopCouriers: async (params, count = 3) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post(
        `${API_ROUTES.SHIPROCKET}/top?count=${count}`,
        params
      );

      if (!response.data.success) {
        set({
          error: response.data.error || "Failed to get top couriers",
          isLoading: false,
        });
        return null;
      }

      set({
        topCouriers: response.data.data,
        isLoading: false,
      });
      return response.data.data;
    } catch (error: any) {
      set({
        error: error?.response?.data?.error || "Failed to get top couriers",
        isLoading: false,
      });
      return null;
    }
  },
}));
