import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  return NextResponse.rewrite(new URL("/coming-soon", request.url));
}

// Keep the completed homepage public. Existing work-in-progress routes are
// rewritten to the holding page without removing their source files.
export const config = {
  matcher: [
    "/about/:path*",
    "/approach/:path*",
    "/contact/:path*",
    "/how-we-work/:path*",
    "/privacy-policy/:path*",
    "/services/:path*",
    "/terms-of-use/:path*",
  ],
};
