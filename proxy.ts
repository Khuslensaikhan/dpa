import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  return NextResponse.rewrite(new URL("/coming-soon", request.url));
}

// Keep completed routes public. Remaining work-in-progress routes are
// rewritten to the holding page without removing their source files.
export const config = {
  matcher: [
    "/approach/:path*",
    "/how-we-work/:path*",
    "/privacy-policy/:path*",
    "/terms-of-use/:path*",
  ],
};
