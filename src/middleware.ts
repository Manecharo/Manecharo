import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Only protect /update routes
  if (request.nextUrl.pathname.startsWith("/update")) {
    // Skip protection for login page
    if (request.nextUrl.pathname === "/update/login") {
      return NextResponse.next();
    }

    // Check for auth token in both development and production cookie names
    const devToken = request.cookies.get("next-auth.session-token");
    const prodToken = request.cookies.get("__Secure-next-auth.session-token");

    if (!devToken && !prodToken) {
      // No valid session - redirect to login
      return NextResponse.redirect(new URL("/update/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/update/:path*"],
};
