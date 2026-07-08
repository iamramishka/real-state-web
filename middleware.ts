import { NextResponse, type NextRequest } from "next/server";

import { getAdminSessionFromRequest } from "@/lib/auth/session";

const publicAdminPaths = ["/admin/login"];
const publicAdminApiPaths = ["/api/admin/auth/login", "/api/admin/auth/logout"];

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminApiRoute = pathname.startsWith("/api/admin");
  const isPublicAdminPath = publicAdminPaths.includes(pathname);
  const isPublicAdminApiPath = publicAdminApiPaths.includes(pathname);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-admin-pathname", pathname);

  if (!isAdminRoute && !isAdminApiRoute) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  const session = await getAdminSessionFromRequest(request);

  if (isPublicAdminPath || isPublicAdminApiPath) {
    if (session && isPublicAdminPath) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (!session) {
    if (isAdminApiRoute) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          loginPath: "/admin/login",
        },
        { status: 401 },
      );
    }

    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", `${pathname}${search}`);

    return NextResponse.redirect(loginUrl);
  }

  requestHeaders.set("x-admin-email", session.email);
  requestHeaders.set("x-admin-role", session.role);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
