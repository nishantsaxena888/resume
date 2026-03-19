import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const isAuthRoute = request.nextUrl.pathname === "/";
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  const session = request.cookies.get("session")?.value || request.cookies.get("session-local")?.value;

  if (isAdminRoute && !session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If logged in and on the login page, redirect to the dashboard
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/admin/tenant", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets|.*\\.svg.*).*)"],
};
