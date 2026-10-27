import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LANG, isLang, type Lang } from "@/lib/i18n/routing";

// Visitor's language for an un-prefixed URL: their earlier choice, else the
// first es/en/it in Accept-Language, else Spanish. Crawlers send no header, so
// they land on /es and find /en and /it through hreflang.
function pickLang(request: NextRequest): Lang {
  const saved = request.cookies.get("language")?.value;
  if (isLang(saved)) return saved;
  const accept = request.headers.get("accept-language") ?? "";
  for (const part of accept.split(",")) {
    const code = part.trim().slice(0, 2).toLowerCase();
    if (isLang(code)) return code;
  }
  return DEFAULT_LANG;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname.startsWith("/update")) {
    // Skip protection for login page
    if (pathname === "/update/login") {
      return NextResponse.next();
    }

    // Check for auth token in both development and production cookie names
    const devToken = request.cookies.get("next-auth.session-token");
    const prodToken = request.cookies.get("__Secure-next-auth.session-token");

    if (!devToken && !prodToken) {
      // No valid session - redirect to login
      return NextResponse.redirect(new URL("/update/login", request.url));
    }
    return NextResponse.next();
  }

  const seg = pathname.split("/")[1];
  if (isLang(seg)) {
    // the root layout sets <html lang> from this
    const headers = new Headers(request.headers);
    headers.set("x-lang", seg);
    return NextResponse.next({ request: { headers } });
  }

  // Old un-prefixed URLs (/, /about, /work/paqua…) move under a language.
  // 307, not 308: the target depends on the visitor.
  const target = `/${pickLang(request)}${pathname === "/" ? "" : pathname}${search}`;
  return NextResponse.redirect(new URL(target, request.url), 307);
}

export const config = {
  // everything except Next internals, the API, Sanity Studio and files with an
  // extension (sitemap.xml, robots.txt, llms.txt, images, CVs)
  matcher: ["/((?!_next|api|studio|.*\\..*).*)"],
};
