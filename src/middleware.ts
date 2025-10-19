import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

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

// JWT Secret - must match backend secret
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "saree-ghar"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("🔍 [MIDDLEWARE] ===== START =====");
  console.log("🔍 [MIDDLEWARE] Pathname:", pathname);

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

  // Get access token from cookies
  const accessToken = request.cookies.get("accessToken")?.value;
  console.log("🔍 [MIDDLEWARE] Has accessToken:", !!accessToken);

  // If accessing protected or admin routes, verify token
  if (isProtectedRoute || isSuperAdminRoute) {
    if (!accessToken) {
      console.log("❌ [MIDDLEWARE] No token found, redirecting to login");
      return NextResponse.redirect(
        new URL(`/auth/login?redirect=${pathname}`, request.url)
      );
    }

    try {
      // Verify token using jose
      console.log("🔐 [MIDDLEWARE] Verifying token with jose...");
      const { payload } = await jwtVerify(accessToken, JWT_SECRET);

      console.log("✅ [MIDDLEWARE] Token verified successfully");
      console.log("🔍 [MIDDLEWARE] User payload:", {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
      });

      // Check if trying to access super admin routes without proper role
      if (isSuperAdminRoute && payload.role !== "SUPER_ADMIN") {
        console.log("❌ [MIDDLEWARE] Unauthorized: Not a super admin");
        return NextResponse.redirect(new URL("/", request.url));
      }

      // If authenticated user tries to access auth pages, redirect to home
      if (pathname.startsWith("/auth/")) {
        console.log(
          "🔄 [MIDDLEWARE] Authenticated user accessing auth page, redirecting to home"
        );
        return NextResponse.redirect(new URL("/", request.url));
      }

      console.log("✅ [MIDDLEWARE] Access granted");
      return NextResponse.next();
    } catch (error) {
      console.error("❌ [MIDDLEWARE] Token verification failed:", error);

      // Clear invalid token and redirect to login
      const response = NextResponse.redirect(
        new URL(`/auth/login?redirect=${pathname}`, request.url)
      );
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");

      return response;
    }
  }

  // If authenticated user tries to access auth pages, check token
  if (pathname.startsWith("/auth/") && accessToken) {
    try {
      // Verify token
      await jwtVerify(accessToken, JWT_SECRET);
      console.log(
        "🔄 [MIDDLEWARE] Authenticated user accessing auth page, redirecting to home"
      );
      return NextResponse.redirect(new URL("/", request.url));
    } catch (error) {
      // Token is invalid, clear it and allow access to auth page
      console.log(
        "⚠️ [MIDDLEWARE] Invalid token, allowing access to auth page"
      );
      const response = NextResponse.next();
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }
  }

  // Allow access to public routes
  console.log("✅ [MIDDLEWARE] Public route, allowing access");
  console.log("🔍 [MIDDLEWARE] ===== END =====\n");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
