import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  return NextResponse.redirect(
    new URL("https://waitlist.imageforcreatives.com", request.url)
  );
}
