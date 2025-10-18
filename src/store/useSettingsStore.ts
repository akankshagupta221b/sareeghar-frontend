import { API_ROUTES } from "@/utils/api";
import axios from "axios";
import { create } from "zustand";

interface FeatureBanner {
  id: string;
  imageUrl: string;
  title?: string;
  subtitle?: string;
  description?: string;
}

interface FeaturedProduct {
  id: string;
  name: string;
  price: string;
  images: string[];
}

// Store configuration interface matching Prisma schema
export interface StoreConfiguration {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  favicon?: string;
  email: string;
  phone?: string;
  website?: string;
  address?: string;
  city?: string;
  state?: string;
  country: string;
  postalCode?: string;
  taxNumber?: string;

  // Business Settings
  currency: string;
  currencySymbol: string;
  timezone: string;
  language: string;

  // E-commerce Settings
  enableTax: boolean;
  taxRate: number;
  enableShipping: boolean;
  freeShippingThreshold?: number;
  shippingFee: number;
  enableCoupons: boolean;
  enableReviews: boolean;
  enableWishlist: boolean;

  // SEO Settings
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;

  // Social Media
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;

  // Payment Settings
  enableRazorpay: boolean;
  razorpayKeyId?: string;
  enableCOD: boolean;

  // Email Settings
  enableEmailNotifications: boolean;
  orderConfirmationEmail: boolean;
  shippingNotificationEmail: boolean;

  // Store Settings
  isActive: boolean;
  isMaintenance: boolean;
  maintenanceMessage?: string;

  // Terms & Policies
  termsConditions?: string;
  privacyPolicy?: string;
  returnPolicy?: string;
  shippingPolicy?: string;

  // Business Hours
  businessHours?: any;

  createdAt: string;
  updatedAt: string;
}

export interface CreateStoreInput {
  name: string;
  description?: string;
  email: string;
  phone?: string;
  website?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  taxNumber?: string;
  currency?: string;
  currencySymbol?: string;
  timezone?: string;
  language?: string;
  enableTax?: boolean;
  taxRate?: number;
  enableShipping?: boolean;
  freeShippingThreshold?: number;
  shippingFee?: number;
  enableCoupons?: boolean;
  enableReviews?: boolean;
  enableWishlist?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  enableRazorpay?: boolean;
  razorpayKeyId?: string;
  enableCOD?: boolean;
  enableEmailNotifications?: boolean;
  orderConfirmationEmail?: boolean;
  shippingNotificationEmail?: boolean;
  termsConditions?: string;
  privacyPolicy?: string;
  returnPolicy?: string;
  shippingPolicy?: string;
  businessHours?: any;
}

export interface UpdateStoreInput extends Partial<CreateStoreInput> {
  logo?: string;
  favicon?: string;
  maintenanceMessage?: string;
}

interface SettingsState {
  // Existing banner & featured products
  banners: FeatureBanner[];
  featuredProducts: FeaturedProduct[];

  // Store configuration
  storeSettings: StoreConfiguration | null;
  storeConfigurations: StoreConfiguration[];

  // Loading & error states
  isLoading: boolean;
  error: string | null;

  // Existing methods
  fetchBanners: () => Promise<void>;
  fetchFeaturedProducts: () => Promise<void>;
  addBanners: (files: File[]) => Promise<boolean>;
  updateFeaturedProducts: (productIds: string[]) => Promise<boolean>;

  // Store configuration methods (Public)
  fetchStoreSettings: () => Promise<void>;

  // Store configuration methods (Admin)
  fetchStoreConfiguration: () => Promise<void>;
  fetchStoreById: (id: string) => Promise<void>;
  createStore: (data: CreateStoreInput) => Promise<boolean>;
  updateStore: (id: string, data: UpdateStoreInput) => Promise<boolean>;
  deleteStore: (id: string) => Promise<boolean>;
  toggleStoreStatus: (id: string) => Promise<boolean>;
  toggleMaintenanceMode: (id: string) => Promise<boolean>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  // Initial state
  banners: [],
  featuredProducts: [],
  storeSettings: null,
  storeConfigurations: [],
  isLoading: false,
  error: null,

  // Existing banner methods
  fetchBanners: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_ROUTES.SETTINGS}/get-banners`, {
        withCredentials: true,
      });
      set({ banners: response.data.banners, isLoading: false });
    } catch (e) {
      console.error(e);
      set({ error: "Failed to fetch banners", isLoading: false });
    }
  },

  fetchFeaturedProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${API_ROUTES.SETTINGS}/fetch-feature-products`,
        {
          withCredentials: true,
        }
      );
      set({
        featuredProducts: response.data.featuredProducts,
        isLoading: false,
      });
    } catch (e) {
      console.error(e);
      set({ error: "Failed to fetch featured products", isLoading: false });
    }
  },

  addBanners: async (files: File[]) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));
      const response = await axios.post(
        `${API_ROUTES.SETTINGS}/banners`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(" Banners Added:", response.data);
      set({ isLoading: false });
      return response.data.success;
    } catch (e) {
      console.error(e);
      set({ error: "Failed to add banners", isLoading: false });
      return false;
    }
  },

  updateFeaturedProducts: async (productIds: string[]) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_ROUTES.SETTINGS}/update-feature-products`,
        { productIds },
        {
          withCredentials: true,
        }
      );
      set({ isLoading: false });
      return response.data.success;
    } catch (e) {
      console.error(e);
      set({ error: "Failed to update featured products", isLoading: false });
      return false;
    }
  },

  // ============================================================
  // STORE CONFIGURATION METHODS
  // ============================================================

  /**
   * PUBLIC: Get store settings for frontend
   * @route GET /api/store/settings
   */
  fetchStoreSettings: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_ROUTES.STORE}/settings`);
      console.log("Store Settings:", response.data.data);
      set({ storeSettings: response.data.data, isLoading: false });
    } catch (e) {
      console.error("Failed to fetch store settings:", e);
      set({ error: "Failed to fetch store settings", isLoading: false });
    }
  },

  /**
   * ADMIN: Get all store configurations
   * @route GET /api/store
   * @access Super Admin
   */
  fetchStoreConfiguration: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_ROUTES.STORE}`, {
        withCredentials: true,
      });
      set({
        storeConfigurations: response.data.stores || [response.data.store],
        isLoading: false,
      });
    } catch (e) {
      console.error("Failed to fetch store configuration:", e);
      set({ error: "Failed to fetch store configuration", isLoading: false });
    }
  },

  /**
   * ADMIN: Get store by ID
   * @route GET /api/store/:id
   * @access Super Admin
   */
  fetchStoreById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_ROUTES.STORE}/${id}`, {
        withCredentials: true,
      });
      set({ storeSettings: response.data.store, isLoading: false });
    } catch (e) {
      console.error("Failed to fetch store:", e);
      set({ error: "Failed to fetch store", isLoading: false });
    }
  },

  /**
   * ADMIN: Create new store configuration
   * @route POST /api/store
   * @access Super Admin
   */
  createStore: async (data: CreateStoreInput) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_ROUTES.STORE}`, data, {
        withCredentials: true,
      });
      set({ isLoading: false });
      return response.data.success;
    } catch (e: any) {
      console.error("Failed to create store:", e);
      set({
        error: e.response?.data?.message || "Failed to create store",
        isLoading: false,
      });
      return false;
    }
  },

  /**
   * ADMIN: Update store configuration
   * @route PUT /api/store/:id
   * @access Super Admin
   */
  updateStore: async (id: string, data: UpdateStoreInput) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${API_ROUTES.STORE}/${id}`, data, {
        withCredentials: true,
      });
      set({ isLoading: false });
      return response.data.success;
    } catch (e: any) {
      console.error("Failed to update store:", e);
      set({
        error: e.response?.data?.message || "Failed to update store",
        isLoading: false,
      });
      return false;
    }
  },

  /**
   * ADMIN: Delete store
   * @route DELETE /api/store/:id
   * @access Super Admin
   */
  deleteStore: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.delete(`${API_ROUTES.STORE}/${id}`, {
        withCredentials: true,
      });
      set({ isLoading: false });
      return response.data.success;
    } catch (e: any) {
      console.error("Failed to delete store:", e);
      set({
        error: e.response?.data?.message || "Failed to delete store",
        isLoading: false,
      });
      return false;
    }
  },

  /**
   * ADMIN: Toggle store active status
   * @route PATCH /api/store/:id/toggle-status
   * @access Super Admin
   */
  toggleStoreStatus: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.patch(
        `${API_ROUTES.STORE}/${id}/toggle-status`,
        {},
        {
          withCredentials: true,
        }
      );
      set({ isLoading: false });
      return response.data.success;
    } catch (e: any) {
      console.error("Failed to toggle store status:", e);
      set({
        error: e.response?.data?.message || "Failed to toggle store status",
        isLoading: false,
      });
      return false;
    }
  },

  /**
   * ADMIN: Toggle store maintenance mode
   * @route PATCH /api/store/:id/toggle-maintenance
   * @access Super Admin
   */
  toggleMaintenanceMode: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.patch(
        `${API_ROUTES.STORE}/${id}/toggle-maintenance`,
        {},
        {
          withCredentials: true,
        }
      );
      set({ isLoading: false });
      return response.data.success;
    } catch (e: any) {
      console.error("Failed to toggle maintenance mode:", e);
      set({
        error: e.response?.data?.message || "Failed to toggle maintenance mode",
        isLoading: false,
      });
      return false;
    }
  },
}));
