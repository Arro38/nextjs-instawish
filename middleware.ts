import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authRoutes, protectedRoutes } from "@/router/routes";

export function middleware(request: NextRequest) {
  const currentToken = request.cookies.get("token")?.value;
  const expires = request.cookies.get("expires")?.value;
  if (
    (protectedRoutes.includes(request.nextUrl.pathname) ||
      request.nextUrl.pathname.startsWith("/user/")) &&
    (!currentToken || !expires || new Date(expires) < new Date())
  ) {
    request.cookies.delete("token");
    request.cookies.delete("expires");
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");
    response.cookies.delete("expires");

    return response;
  }

  if (
    authRoutes.includes(request.nextUrl.pathname) &&
    currentToken &&
    expires
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
