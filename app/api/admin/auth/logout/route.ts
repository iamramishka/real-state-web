import { NextResponse } from "next/server";

import { adminSessionCookieName } from "@/lib/auth/session";

export function GET(request: Request) {
  return clearAdminSession(request);
}

export function POST(request: Request) {
  return clearAdminSession(request);
}

function clearAdminSession(request: Request) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url), {
    status: 303,
  });

  response.cookies.set(adminSessionCookieName, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
