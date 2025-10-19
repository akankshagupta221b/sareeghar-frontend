import { NextRequest, NextResponse } from "next/server";

// Routes that don't require authentication
const publicRoutes = [
  "/",
  "/home",
  "/about",
  "/contact-us",
  "/listing",
  "/privacy-policy",
  "/terms-and-conditions",
  "/auth/register",
  "/auth/login",
  "/auth/forgot-password",
];

// Routes that require authentication
const protectedRoutes = ["/account", "/cart", "/checkout"];

// Super admin routes
const superAdminRoutes = ["/super-admin"];

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  console.log("🔍 [MIDDLEWARE] ===== START =====");
  console.log("🔍 [MIDDLEWARE] Pathname:", pathname);
  console.log("🔍 [MIDDLEWARE] Has accessToken:", !!accessToken);
  console.log(
    "🔍 [MIDDLEWARE] AccessToken (first 20 chars):",
    accessToken?.substring(0, 20)
  );
  console.log("🔍 [MIDDLEWARE] API_BASE_URL:", API_BASE_URL);

  // Helper function to check if path matches routes (including dynamic routes)
  const matchesRoute = (path: string, routes: string[]): boolean => {
    return routes.some((route) => {
      if (route === path) return true;
      if (route.endsWith("*")) {
        return path.startsWith(route.slice(0, -1));
      }
      // Handle dynamic routes like /listing/[id]
      if (path.startsWith(route + "/")) return true;
      return false;
    });
  };

  // Check if the route is explicitly public
  const isPublicRoute = matchesRoute(pathname, publicRoutes);

  // Check if the route requires authentication
  const isProtectedRoute = matchesRoute(pathname, protectedRoutes);

  // Check if the route is super admin
  const isSuperAdminRoute = matchesRoute(pathname, superAdminRoutes);

  console.log("🔍 [MIDDLEWARE] Route classification:");
  console.log("   - isPublicRoute:", isPublicRoute);
  console.log("   - isProtectedRoute:", isProtectedRoute);
  console.log("   - isSuperAdminRoute:", isSuperAdminRoute);

  if (accessToken) {
    console.log(
      "✅ [MIDDLEWARE] Access token found, verifying with backend..."
    );

    try {
      // Validate token with backend instead of local verification
      const verifyUrl = `${API_BASE_URL}/api/auth/verify-token`;
      console.log("🔍 [MIDDLEWARE] Verification URL:", verifyUrl);

      const verifyResponse = await fetch(verifyUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      console.log(
        "🔍 [MIDDLEWARE] Verify response status:",
        verifyResponse.status
      );

      if (!verifyResponse.ok) {
        const errorText = await verifyResponse.text();
        console.log("❌ [MIDDLEWARE] Verify failed, response:", errorText);
        throw new Error("Token verification failed");
      }

      const responseData = await verifyResponse.json();
      console.log(
        "🔍 [MIDDLEWARE] Verify response data:",
        JSON.stringify(responseData)
      );

      const { user } = responseData;
      const role = user?.role;

      console.log("✅ [MIDDLEWARE] Token verified successfully");
      console.log("🔍 [MIDDLEWARE] User role:", role);

      // If authenticated user tries to access auth pages, redirect to home
      if (pathname.startsWith("/auth/")) {
        console.log(
          "🔄 [MIDDLEWARE] Authenticated user accessing auth page, redirecting to home"
        );
        return NextResponse.redirect(new URL("/", request.url));
      }

      // If regular user tries to access super admin routes, redirect to home
      if (role !== "SUPER_ADMIN" && isSuperAdminRoute) {
        console.log(
          "🔄 [MIDDLEWARE] Non-admin user trying to access admin route, redirecting to home"
        );
        return NextResponse.redirect(new URL("/", request.url));
      }

      console.log("✅ [MIDDLEWARE] Access granted, proceeding to next");
      return NextResponse.next();
    } catch (e) {
      console.error("❌ [MIDDLEWARE] Token verification error:", e);
      console.error(
        "❌ [MIDDLEWARE] Error details:",
        JSON.stringify(e, null, 2)
      );

      // If token is invalid and trying to access protected route, try refresh
      if (isProtectedRoute || isSuperAdminRoute) {
        console.log(
          "🔄 [MIDDLEWARE] Token invalid on protected route, attempting refresh..."
        );

        const refreshTokenValue = request.cookies.get("refreshToken")?.value;
        console.log("🔍 [MIDDLEWARE] Has refreshToken:", !!refreshTokenValue);
        console.log(
          "🔍 [MIDDLEWARE] RefreshToken (first 20 chars):",
          refreshTokenValue?.substring(0, 20)
        );

        if (!refreshTokenValue) {
          console.log(
            "❌ [MIDDLEWARE] No refresh token found, redirecting to login"
          );
          const response = NextResponse.redirect(
            new URL(`/auth/login?redirect=${pathname}`, request.url)
          );
          response.cookies.delete("accessToken");
          return response;
        }

        const refreshUrl = `${API_BASE_URL}/api/auth/refresh-token`;
        console.log("🔍 [MIDDLEWARE] Refresh URL:", refreshUrl);

        const refreshResponse = await fetch(refreshUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            refreshToken: refreshTokenValue,
          }),
        });

        console.log(
          "🔍 [MIDDLEWARE] Refresh response status:",
          refreshResponse.status
        );

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          console.log("✅ [MIDDLEWARE] Token refreshed successfully");
          console.log(
            "🔍 [MIDDLEWARE] New token received:",
            !!data.accessToken
          );

          const response = NextResponse.next();

          // Set new tokens if returned
          if (data.accessToken) {
            response.cookies.set("accessToken", data.accessToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
              maxAge: 15 * 60, // 15 minutes
            });
            console.log("✅ [MIDDLEWARE] New access token set in cookie");
          }

          return response;
        } else {
          const errorText = await refreshResponse.text();
          console.log("❌ [MIDDLEWARE] Refresh failed, response:", errorText);
          console.log("🔄 [MIDDLEWARE] Redirecting to login with redirect URL");

          const response = NextResponse.redirect(
            new URL(`/auth/login?redirect=${pathname}`, request.url)
          );
          response.cookies.delete("accessToken");
          response.cookies.delete("refreshToken");
          return response;
        }
      }

      console.log(
        "⚠️ [MIDDLEWARE] Token invalid on public route, clearing cookies and allowing access"
      );
      const response = NextResponse.next();
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }
  }

  // No access token - check if route requires authentication
  console.log("⚠️ [MIDDLEWARE] No access token found");

  if (isProtectedRoute || isSuperAdminRoute) {
    console.log(
      "🔄 [MIDDLEWARE] Protected route without token, redirecting to login"
    );
    console.log(
      "🔍 [MIDDLEWARE] Redirect URL:",
      `/auth/login?redirect=${pathname}`
    );
    return NextResponse.redirect(
      new URL(`/auth/login?redirect=${pathname}`, request.url)
    );
  }

  // Allow access to public routes
  console.log("✅ [MIDDLEWARE] Public route, allowing access");
  console.log("🔍 [MIDDLEWARE] ===== END =====\n");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
