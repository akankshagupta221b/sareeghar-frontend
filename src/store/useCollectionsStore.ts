import { API_ROUTES } from "@/utils/api";
import axios from "axios";
import { create } from "zustand";
import { Product } from "./useProductStore";

export interface Collection {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  slug: string;
  productCount?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface Collection2 {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string | null;
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  products: Product[];
  _count: {
    products: number;
  };
}

interface CollectionsStore {
  collections: Collection2[];
  isLoading: boolean;
  error: string | null;
  fetchCollections: () => Promise<void>;
  createCollection: (
    collection: Omit<Collection, "id">
  ) => Promise<Collection | null>;
  updateCollection: (
    id: string,
    collection: Partial<Collection>
  ) => Promise<Collection | null>;
  deleteCollection: (id: string) => Promise<boolean>;
}

export const useCollectionsStore = create<CollectionsStore>((set, get) => ({
  collections: [],
  isLoading: false,
  error: null,
  fetchCollections: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_ROUTES.COLLECTIONS}/`, {
        withCredentials: true,
      });

      set({ collections: response.data.data, isLoading: false });
    } catch (e) {
      set({ isLoading: false, error: "Failed to fetch collections" });
    }
  },
  createCollection: async (collection) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_ROUTES.COLLECTIONS}/`,
        collection,
        {
          withCredentials: true,
        }
      );

      const newCollection = response.data.collection;

      set((state) => ({
        collections: [newCollection, ...state.collections],
        isLoading: false,
      }));

      return newCollection;
    } catch (e) {
      set({ isLoading: false, error: "Failed to create collection" });
      return null;
    }
  },
  updateCollection: async (id, collection) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(
        `${API_ROUTES.COLLECTIONS}/update-collection/${id}`,
        collection,
        {
          withCredentials: true,
        }
      );

      const updatedCollection = response.data.collection;

      set((state) => ({
        collections: state.collections.map((item) =>
          item.id === id ? updatedCollection : item
        ),
        isLoading: false,
      }));

      return updatedCollection;
    } catch (e) {
      set({ isLoading: false, error: "Failed to update collection" });
      return null;
    }
  },
  deleteCollection: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_ROUTES.COLLECTIONS}/delete-collection/${id}`, {
        withCredentials: true,
      });

      set((state) => ({
        collections: state.collections.filter(
          (collection) => collection.id !== id
        ),
        isLoading: false,
      }));

      return true;
    } catch (e) {
      set({ isLoading: false, error: "Failed to delete collection" });
      return false;
    }
  },
}));
