// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const WAITLIST_URL = "https://waitlist.imageforcreatives.com";
const ADMIN_ROUTE = "/sesame-seed";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Allow ONLY /sesame-seed
  if (pathname.startsWith(ADMIN_ROUTE)) {
    return NextResponse.next();
  }

  // Redirect EVERYTHING else
  return NextResponse.redirect(WAITLIST_URL, { status: 307 });
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};