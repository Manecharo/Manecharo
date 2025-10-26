import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Only protect /update routes
  if (request.nextUrl.pathname.startsWith("/update")) {
    // Skip protection for login page
    if (request.nextUrl.pathname === "/update/login") {
      return NextResponse.next();
    }

    // Check for auth token (will be handled by NextAuth when configured)
    // For now, allow access if NextAuth is not configured (development)
    try {
      const token = request.cookies.get("next-auth.session-token");
      if (!token) {
        // Redirect to login
        return NextResponse.redirect(new URL("/update/login", request.url));
      }
    } catch (error) {
      // If NextAuth not configured, allow access (development mode)
      console.warn("NextAuth not configured - skipping authentication");
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/update/:path*"],
};
