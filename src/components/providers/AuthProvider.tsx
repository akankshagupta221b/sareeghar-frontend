"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { refreshAccessToken } = useAuthStore();

  useEffect(() => {
    // Only validate session if tokens exist
    const hasTokens =
      typeof window !== "undefined" &&
      (localStorage.getItem("accessToken") ||
        localStorage.getItem("refreshToken"));

    if (!hasTokens) {
      // No tokens, skip validation - user is browsing as guest
      return;
    }

    // Try to refresh token on mount to validate existing session
    const validateSession = async () => {
      try {
        await refreshAccessToken();
      } catch (error) {
        // Silent fail - user can continue browsing as guest
        console.error("Session validation failed:", error);
      }
    };

    validateSession();

    // Set up periodic token refresh (every 14 minutes for 15min token)
    // Only if user has tokens
    const refreshInterval = setInterval(() => {
      const stillHasTokens =
        typeof window !== "undefined" &&
        (localStorage.getItem("accessToken") ||
          localStorage.getItem("refreshToken"));

      if (stillHasTokens) {
        refreshAccessToken().catch(console.error);
      }
    }, 14 * 60 * 1000); // 14 minutes

    return () => clearInterval(refreshInterval);
  }, [refreshAccessToken]);

  return <>{children}</>;
}
