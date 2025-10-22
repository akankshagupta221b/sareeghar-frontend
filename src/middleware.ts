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

  // Get access token from cookies
  const accessToken = request.cookies.get("accessToken")?.value;

  // If accessing protected or admin routes, verify token
  if (isProtectedRoute || isSuperAdminRoute) {
    if (!accessToken) {
      return NextResponse.redirect(
        new URL(`/auth/login?redirect=${pathname}`, request.url)
      );
    }

    try {
      // Verify token using jose
      const { payload } = await jwtVerify(accessToken, JWT_SECRET);

      // Check if trying to access super admin routes without proper role
      if (isSuperAdminRoute && payload.role !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/", request.url));
      }

      // If authenticated user tries to access auth pages, redirect to home
      if (pathname.startsWith("/auth/")) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      return NextResponse.next();
    } catch (error) {
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
      return NextResponse.redirect(new URL("/", request.url));
    } catch (error) {
      // Token is invalid, clear it and allow access to auth page
      const response = NextResponse.next();
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }
  }

  // Allow access to public routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
