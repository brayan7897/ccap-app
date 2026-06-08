import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ─── Route classification ────────────────────────────────────────────────────

const TOKEN_COOKIE = "ccap-auth-token";

/** Routes that require an active session. */
const PROTECTED_PREFIXES = ["/dashboard"];

/** Routes that redirect to /dashboard when already logged in. */
const AUTH_ONLY_PATHS = ["/login", "/register", "/forgot-password", "/reset-password"];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function hasToken(request: NextRequest): boolean {
  return !!request.cookies.get(TOKEN_COOKIE)?.value;
}

function isProtected(pathname: string): boolean {
  return PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function isAuthOnly(pathname: string): boolean {
  return AUTH_ONLY_PATHS.some((path) => pathname.startsWith(path));
}

// ─── Middleware ───────────────────────────────────────────────────────────────

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authenticated = hasToken(request);

  // 1. Protect /dashboard/* — redirect unauthenticated users to /login
  if (isProtected(pathname) && !authenticated) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Redirect authenticated users away from login/register pages
  if (isAuthOnly(pathname) && authenticated) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = "/dashboard";
    dashboardUrl.search = "";
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

// ─── Matcher ─────────────────────────────────────────────────────────────────
// Only run on routes that actually need auth checking — avoids intercepting
// static files, images, and API routes.
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ],
};
