import { API_ROUTES } from "@/utils/api";
import axiosInstance from "@/lib/axios";
import { create } from "zustand";

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  parentId: string;
  isActive: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

interface CategoriesStore {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  createCategory: (category: Omit<Category, "id">) => Promise<Category | null>;
  updateCategory: (
    id: string,
    category: Partial<Category>
  ) => Promise<Category | null>;
  deleteCategory: (id: string) => Promise<boolean>;
}

export const useCategoryStore = create<CategoriesStore>((set, get) => ({
  categories: [],
  isLoading: false,
  error: null,
  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`${API_ROUTES.CATEGORIES}/`);

      set({ categories: response.data.data.categories, isLoading: false });
    } catch (e) {
      set({ isLoading: false, error: "Failed to fetch categories" });
    }
  },
  createCategory: async (category) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post(
        `${API_ROUTES.CATEGORIES}/`,
        category
      );

      const newCategory = response.data.category;

      set((state) => ({
        categories: [newCategory, ...state.categories],
        isLoading: false,
      }));

      return newCategory;
    } catch (e) {
      set({ isLoading: false, error: "Failed to create category" });
      return null;
    }
  },
  updateCategory: async (id, category) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.put(
        `${API_ROUTES.CATEGORIES}/update-category/${id}`,
        category
      );

      const updatedCategory = response.data.category;

      set((state) => ({
        categories: state.categories.map((item) =>
          item.id === id ? updatedCategory : item
        ),
        isLoading: false,
      }));

      return updatedCategory;
    } catch (e) {
      set({ isLoading: false, error: "Failed to update category" });
      return null;
    }
  },
  deleteCategory: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(
        `${API_ROUTES.CATEGORIES}/delete-category/${id}`
      );

      set((state) => ({
        categories: state.categories.filter((category) => category.id !== id),
        isLoading: false,
      }));

      return true;
    } catch (e) {
      set({ isLoading: false, error: "Failed to delete category" });
      return false;
    }
  },
}));
