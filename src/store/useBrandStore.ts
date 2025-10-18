import { API_ROUTES } from "@/utils/api";
import axios from "axios";
import { create } from "zustand";

export interface Brand {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface BrandsStore {
  brands: Brand[];
  isLoading: boolean;
  error: string | null;
  fetchBrands: () => Promise<void>;
  createBrand: (brand: Omit<Brand, "id">) => Promise<Brand | null>;
  updateBrand: (id: string, brand: Partial<Brand>) => Promise<Brand | null>;
  deleteBrand: (id: string) => Promise<boolean>;
}

export const useBrandStore = create<BrandsStore>((set, get) => ({
  brands: [],
  isLoading: false,
  error: null,
  fetchBrands: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_ROUTES.BRANDS}/`, {
        withCredentials: true,
      });

      set({ brands: response.data.data.brands, isLoading: false });
    } catch (e) {
      set({ isLoading: false, error: "Failed to fetch brands" });
    }
  },
  createBrand: async (brand) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_ROUTES.BRANDS}/`, brand, {
        withCredentials: true,
      });

      const newBrand = response.data.brand;

      set((state) => ({
        brands: [newBrand, ...state.brands],
        isLoading: false,
      }));

      return newBrand;
    } catch (e) {
      set({ isLoading: false, error: "Failed to create brand" });
      return null;
    }
  },
  updateBrand: async (id, brand) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(
        `${API_ROUTES.BRANDS}/update-brand/${id}`,
        brand,
        {
          withCredentials: true,
        }
      );

      const updatedBrand = response.data.brand;

      set((state) => ({
        brands: state.brands.map((item) =>
          item.id === id ? updatedBrand : item
        ),
        isLoading: false,
      }));

      return updatedBrand;
    } catch (e) {
      set({ isLoading: false, error: "Failed to update brand" });
      return null;
    }
  },
  deleteBrand: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_ROUTES.BRANDS}/delete-brand/${id}`, {
        withCredentials: true,
      });

      set((state) => ({
        brands: state.brands.filter((brand) => brand.id !== id),
        isLoading: false,
      }));

      return true;
    } catch (e) {
      set({ isLoading: false, error: "Failed to delete brand" });
      return false;
    }
  },
}));
