import { API_ROUTES } from "@/utils/api";
import axiosInstance from "@/lib/axios";
import { create } from "zustand";
import { Product } from "./useProductStore";

export interface SearchSuggestion {
  text: string;
  type: "product" | "category" | "brand";
  count?: number;
}

export interface SearchResult {
  products: Product[];
  categories: string[];
  brands: string[];
}

interface SearchState {
  // Search query
  query: string;
  setQuery: (query: string) => void;

  // Search results
  results: SearchResult;
  isLoading: boolean;
  error: string | null;

  // Pagination
  currentPage: number;
  totalPages: number;
  totalResults: number;

  // Suggestions
  suggestions: SearchSuggestion[];
  isSuggestionsLoading: boolean;

  // Popular searches
  popularSearches: string[];

  // Recent searches (stored in localStorage)
  recentSearches: string[];

  // Actions
  search: (params: {
    query: string;
    page?: number;
    limit?: number;
    categories?: string[];
    brands?: string[];
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }) => Promise<void>;

  fetchSuggestions: (query: string) => Promise<void>;
  fetchPopularSearches: () => Promise<void>;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  clearSearch: () => void;
}

const RECENT_SEARCHES_KEY = "recentSearches";
const MAX_RECENT_SEARCHES = 5;

// Helper functions for localStorage
const getRecentSearches = (): string[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveRecentSearches = (searches: string[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
};

export const useSearchStore = create<SearchState>((set, get) => ({
  // Initial state
  query: "",
  results: {
    products: [],
    categories: [],
    brands: [],
  },
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalResults: 0,
  suggestions: [],
  isSuggestionsLoading: false,
  popularSearches: [],
  recentSearches: getRecentSearches(),

  // Set query
  setQuery: (query: string) => set({ query }),

  // Search products
  search: async (params) => {
    const { query, page = 1, limit = 20, ...filters } = params;

    if (!query || query.trim().length === 0) {
      set({ error: "Please enter a search query" });
      return;
    }

    set({ isLoading: true, error: null, query });

    try {
      const queryParams: Record<string, any> = {
        q: query.trim(),
        page,
        limit,
        ...filters,
      };

      // Convert arrays to comma-separated strings
      if (filters.categories?.length) {
        queryParams.categories = filters.categories.join(",");
      }
      if (filters.brands?.length) {
        queryParams.brands = filters.brands.join(",");
      }

      const response = await axiosInstance.get(`${API_ROUTES.SEARCH}`, {
        params: queryParams,
      });

      const data = response.data;

      set({
        results: {
          products: data.results?.products || data.products || [],
          categories: data.results?.categories || [],
          brands: data.results?.brands || [],
        },
        currentPage: data.currentPage || page,
        totalPages: data.totalPages || 1,
        totalResults: data.totalResults || data.total || 0,
        isLoading: false,
      });

      // Add to recent searches
      get().addRecentSearch(query.trim());
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to search products",
        isLoading: false,
        results: {
          products: [],
          categories: [],
          brands: [],
        },
      });
    }
  },

  // Fetch autocomplete suggestions
  fetchSuggestions: async (query: string) => {
    if (!query || query.trim().length < 2) {
      set({ suggestions: [] });
      return;
    }

    set({ isSuggestionsLoading: true });

    try {
      const response = await axiosInstance.get(
        `${API_ROUTES.SEARCH}/suggestions`,
        {
          params: { q: query.trim(), limit: 10 },
        }
      );

      set({
        suggestions: response.data.suggestions || [],
        isSuggestionsLoading: false,
      });
    } catch (error) {
      set({ suggestions: [], isSuggestionsLoading: false });
    }
  },

  // Fetch popular searches
  fetchPopularSearches: async () => {
    try {
      const response = await axiosInstance.get(`${API_ROUTES.SEARCH}/popular`, {
        params: { limit: 10 },
      });

      set({ popularSearches: response.data.popularSearches || [] });
    } catch (error) {
      set({ popularSearches: [] });
    }
  },

  // Add to recent searches
  addRecentSearch: (query: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    const current = get().recentSearches;
    const updated = [
      trimmedQuery,
      ...current.filter((q) => q.toLowerCase() !== trimmedQuery.toLowerCase()),
    ].slice(0, MAX_RECENT_SEARCHES);

    set({ recentSearches: updated });
    saveRecentSearches(updated);
  },

  // Clear recent searches
  clearRecentSearches: () => {
    set({ recentSearches: [] });
    saveRecentSearches([]);
  },

  // Clear search
  clearSearch: () => {
    set({
      query: "",
      results: {
        products: [],
        categories: [],
        brands: [],
      },
      currentPage: 1,
      totalPages: 1,
      totalResults: 0,
      error: null,
    });
  },
}));
