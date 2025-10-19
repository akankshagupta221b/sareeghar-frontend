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

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
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

  if (accessToken) {
    try {
      const { payload } = await jwtVerify(
        accessToken,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      const { role } = payload as {
        role: string;
      };

      // If authenticated user tries to access auth pages, redirect to home
      if (pathname.startsWith("/auth/")) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      // If regular user tries to access super admin routes, redirect to home
      if (role !== "SUPER_ADMIN" && isSuperAdminRoute) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      return NextResponse.next();
    } catch (e) {
      console.error("Token verification failed", e);

      // If token is invalid and trying to access protected route, try refresh
      if (isProtectedRoute || isSuperAdminRoute) {
        const refreshTokenValue = request.cookies.get("refreshToken")?.value;
        console.log(
          "Attempting token refresh with refresh token",
          refreshTokenValue
        );
        const refreshResponse = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api"
          }/auth/refresh-token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refreshToken: refreshTokenValue,
            }),
          }
        );

        if (refreshResponse.ok) {
          const response = NextResponse.next();
          return response;
        } else {
          // If refresh failed, clear cookies and redirect to login
          console.log("Refresh token invalid, redirecting to login");
          const response = NextResponse.redirect(
            new URL(`/auth/login?redirect=${pathname}`, request.url)
          );
          response.cookies.delete("accessToken");
          response.cookies.delete("refreshToken");
          return response;
        }
      }

      // If token is invalid but accessing public route, allow access and clear invalid cookies
      const response = NextResponse.next();
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }
  }

  // No access token - check if route requires authentication
  if (isProtectedRoute || isSuperAdminRoute) {
    return NextResponse.redirect(
      new URL(`/auth/login?redirect=${pathname}`, request.url)
    );
  }

  // Allow access to public routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
