import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authRoutes, protectedRoutes } from "@/router/routes";

export function middleware(request: NextRequest) {
  const currentToken = request.cookies.get("token")?.value;
  if (
    (protectedRoutes.includes(request.nextUrl.pathname) ||
      request.nextUrl.pathname.startsWith("/user/")) &&
    !currentToken
  ) {
    request.cookies.delete("token");
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");

    return response;
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
