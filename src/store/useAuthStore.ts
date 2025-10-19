import { API_ROUTES } from "@/utils/api";
import axiosInstance from "@/lib/axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  name: string | null;
  email: string;
  role: "USER" | "SUPER_ADMIN";
};

type AuthStore = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<string | null>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<Boolean>;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,
      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.post("/api/auth/register", {
            name,
            email,
            password,
          });

          set({ isLoading: false });
          return response.data.userId;
        } catch (error: any) {
          set({
            isLoading: false,
            error: error?.response?.data?.error || "Registration failed",
          });

          return null;
        }
      },
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.post("/api/auth/login", {
            email,
            password,
          });

          set({ isLoading: false, user: response.data.user });
          return true;
        } catch (error: any) {
          set({
            isLoading: false,
            error: error?.response?.data?.error || "Login failed",
          });

          return false;
        }
      },
      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await axiosInstance.post("/api/auth/logout");
          set({ user: null, isLoading: false });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error?.response?.data?.error || "Logout failed",
          });
        }
      },
      refreshAccessToken: async () => {
        try {
          await axiosInstance.post("/api/auth/refresh-token");
          return true;
        } catch (e) {
          console.error(e);
          return false;
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
