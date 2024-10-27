import { NextRequest, NextResponse } from "next/server";
// export { auth as middleware } from "@/auth";

export function middleware(request: NextRequest) {
  console.log("middle ware ", request.url);
  return NextResponse.redirect(new URL("/home", request.url));
}

export const config = {
  matcher: "/about/:path*",
};
