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
  phoneLogin: (
    phoneNumber: string,
    otp: string
  ) => Promise<{
    success: boolean;
    data?: { accessToken: string; refreshToken: string; user: User };
    message?: string;
  }>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<Boolean>;
  checkAuth: () => void;
  getProfile: () => Promise<User | null>;
  updateProfile: (payload: Partial<{ name: string }>) => Promise<User | null>;
  changePassword: (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => Promise<{ success: boolean; message?: string }>;
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

          // Check if the response indicates failure
          if (response.data.success === false) {
            const errorMessage = response.data.error || "Login failed";
            set({
              isLoading: false,
              error: errorMessage,
            });
            return { success: false };
          }

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
      phoneLogin: async (phoneNumber, otp) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.post(
            "/api/auth/phone-login/verify",
            {
              phoneNumber,
              otp,
            }
          );

          // Check if the response indicates failure
          if (response.data.success === false) {
            const errorMessage = response.data.error || "Login failed";
            set({
              isLoading: false,
              error: errorMessage,
            });
            return { success: false, message: errorMessage };
          }

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
            message: response.data.message || "Login successful",
          };
        } catch (error: any) {
          const errorMessage =
            error?.response?.data?.error || "Phone login failed";
          set({
            isLoading: false,
            error: errorMessage,
          });

          return { success: false, message: errorMessage };
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
      getProfile: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.get("/api/users/profile");
          const user = response?.data?.data || response?.data?.user || null;
          set({ user, isLoading: false });
          return user;
        } catch (error: any) {
          set({
            isLoading: false,
            error: error?.response?.data?.error || "Failed to fetch profile",
          });
          return null;
        }
      },
      updateProfile: async (payload) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.put(
            "/api/users/profile",
            payload
          );
          const user = response?.data?.data || response?.data?.user || null;
          if (user) set({ user, isLoading: false });
          else set({ isLoading: false });
          return user;
        } catch (error: any) {
          set({
            isLoading: false,
            error: error?.response?.data?.error || "Failed to update profile",
          });
          return null;
        }
      },
      changePassword: async (currentPassword, newPassword, confirmPassword) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.put(
            "/api/auth/change-password",
            {
              currentPassword,
              newPassword,
              confirmPassword,
            }
          );
          const ok = response?.data?.success ?? response?.status === 200;
          set({ isLoading: false });
          return { success: !!ok, message: response?.data?.message };
        } catch (error: any) {
          set({
            isLoading: false,
            error: error?.response?.data?.error || "Failed to change password",
          });
          return {
            success: false,
            message:
              error?.response?.data?.message || "Failed to change password",
          };
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
