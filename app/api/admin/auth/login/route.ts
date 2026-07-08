import { NextResponse } from "next/server";

import {
  adminLoginSchema,
  adminSessionCookieName,
  adminSessionMaxAgeSeconds,
  createAdminSessionToken,
  sanitizeAdminRedirect,
  validateAdminCredentials,
} from "@/lib/auth/session";

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = adminLoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    redirectTo: formData.get("redirectTo") ?? undefined,
  });
  const loginUrl = new URL("/admin/login", request.url);

  if (!parsed.success) {
    loginUrl.searchParams.set("error", "invalid");

    return NextResponse.redirect(loginUrl, { status: 303 });
  }

  const result = await validateAdminCredentials(parsed.data);

  if (!result.ok) {
    loginUrl.searchParams.set("error", result.reason);

    return NextResponse.redirect(loginUrl, { status: 303 });
  }

  const redirectTo = sanitizeAdminRedirect(parsed.data.redirectTo);
  const response = NextResponse.redirect(new URL(redirectTo, request.url), {
    status: 303,
  });
  const token = await createAdminSessionToken({
    email: parsed.data.email,
    role: result.role,
  });

  response.cookies.set(adminSessionCookieName, token, {
    httpOnly: true,
    maxAge: adminSessionMaxAgeSeconds,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
