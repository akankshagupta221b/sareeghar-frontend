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
    // Try to refresh token on mount to validate existing session
    const validateSession = async () => {
      try {
        await refreshAccessToken();
      } catch (error) {
        console.error("Session validation failed:", error);
      }
    };

    validateSession();

    // Set up periodic token refresh (every 14 minutes for 15min token)
    const refreshInterval = setInterval(() => {
      refreshAccessToken().catch(console.error);
    }, 14 * 60 * 1000); // 14 minutes

    return () => clearInterval(refreshInterval);
  }, [refreshAccessToken]);

  return <>{children}</>;
}
