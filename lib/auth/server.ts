import { cookies } from "next/headers";

import {
  adminSessionCookieName,
  verifyAdminSessionToken,
} from "@/lib/auth/session";

export async function getCurrentAdminSession() {
  const cookieStore = await cookies();

  return verifyAdminSessionToken(
    cookieStore.get(adminSessionCookieName)?.value ?? null,
  );
}
