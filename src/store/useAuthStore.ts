import { API_ROUTES } from "@/utils/api";
import axiosInstance from "@/lib/axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

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
  login: (
    email: string,
    password: string
  ) => Promise<{
    success: boolean;
    data?: { accessToken: string; refreshToken: string; user: User };
  }>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<Boolean>;
  checkAuth: () => void;
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

          console.log("Login response: ", response);

          const { accessToken, refreshToken, user } = response.data.data;

          // Store tokens in localStorage
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          set({ isLoading: false, user: user || response.data.user });
          return {
            success: true,
            data: {
              accessToken,
              refreshToken,
              user: user || response.data.user,
            },
          };
        } catch (error: any) {
          set({
            isLoading: false,
            error: error?.response?.data?.error || "Login failed",
          });

          return { success: false };
        }
      },
      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await axiosInstance.post("/api/auth/logout");

          // Clear tokens from localStorage
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          // Clear cookies
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");

          console.log("✅ Logout successful, tokens and cookies cleared");

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
      checkAuth: () => {
        const accessToken = Cookies.get("accessToken");
        const refreshToken = Cookies.get("refreshToken");

        console.log("🔍 Checking auth status:", {
          hasAccessToken: !!accessToken,
          hasRefreshToken: !!refreshToken,
        });

        // If tokens exist in cookies but not in localStorage, sync them
        if (accessToken && !localStorage.getItem("accessToken")) {
          localStorage.setItem("accessToken", accessToken);
        }
        if (refreshToken && !localStorage.getItem("refreshToken")) {
          localStorage.setItem("refreshToken", refreshToken);
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
