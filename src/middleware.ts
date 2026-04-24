import { NextRequest, NextResponse } from "next/server";

// ─── Route classification ────────────────────────────────────────────────────

/** Routes that require an active session. */
const PROTECTED_PREFIXES = ["/dashboard"];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function hasToken(request: NextRequest): boolean {
  return !!request.cookies.get("ccap-auth-token")?.value;
}

function isProtected(pathname: string): boolean {
  return PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

// ─── Middleware ───────────────────────────────────────────────────────────────

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authenticated = hasToken(request);

  // Protect /dashboard/* — redirect unauthenticated users to /login
  if (isProtected(pathname) && !authenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // NOTE: We intentionally do NOT redirect authenticated users away from
  // /login or /register at the middleware level. The middleware can only
  // check cookie presence — it cannot verify if the token is still valid.
  // Stale cookies (from Zustand rehydration of expired sessions) would cause
  // an infinite loop. Instead, the LoginForm component handles
  // the "already authenticated" redirect after verifying the token.

  return NextResponse.next();
}

// ─── Matcher ─────────────────────────────────────────────────────────────────
// Runs on every request EXCEPT Next.js internals and static files.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|ttf|otf|eot)).*)",
  ],
};
