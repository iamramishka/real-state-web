import { z } from "zod";

export type AdminRole = "admin" | "editor" | "owner" | "viewer";

export interface AdminSession {
  email: string;
  expiresAt: number;
  issuedAt: number;
  role: AdminRole;
}

export const adminSessionCookieName = "nordhaven_admin_session";
export const adminSessionMaxAgeSeconds = 60 * 60 * 8;

const devEmail = "admin@nordhaven.local";
const devPassword = "admin-password";
const devSessionSecret =
  "dev-only-nordhaven-admin-session-secret-change-before-production";

const adminRoles: AdminRole[] = ["owner", "admin", "editor", "viewer"];

const permissionsByRole = {
  admin: [
    "content:read",
    "content:write",
    "leads:read",
    "media:write",
    "ai-ops:read",
  ],
  editor: ["content:read", "content:write", "media:write"],
  owner: [
    "content:read",
    "content:write",
    "leads:read",
    "leads:write",
    "media:write",
    "ai-ops:read",
    "ai-ops:write",
    "settings:write",
  ],
  viewer: ["content:read", "leads:read", "ai-ops:read"],
} as const satisfies Record<AdminRole, readonly string[]>;

export type AdminPermission =
  (typeof permissionsByRole)[keyof typeof permissionsByRole][number];

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  redirectTo: z.string().optional(),
});

export function hasAdminPermission(
  role: AdminRole,
  permission: AdminPermission,
) {
  const permissions: readonly string[] = permissionsByRole[role];

  return permissions.includes(permission);
}

export function getAdminRoleFromEnv(): AdminRole {
  const role = process.env.ADMIN_ROLE;

  if (role && adminRoles.includes(role as AdminRole)) {
    return role as AdminRole;
  }

  return "owner";
}

export function getAdminAuthConfigStatus() {
  const hasConfiguredEmail = Boolean(process.env.ADMIN_EMAIL);
  const hasConfiguredPassword = Boolean(
    process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD_SHA256,
  );
  const hasConfiguredSecret = Boolean(process.env.ADMIN_SESSION_SECRET);
  const usesDevelopmentFallback =
    process.env.NODE_ENV !== "production" &&
    (!hasConfiguredEmail || !hasConfiguredPassword || !hasConfiguredSecret);

  return {
    hasConfiguredEmail,
    hasConfiguredPassword,
    hasConfiguredSecret,
    ready:
      (hasConfiguredEmail && hasConfiguredPassword && hasConfiguredSecret) ||
      usesDevelopmentFallback,
    usesDevelopmentFallback,
  };
}

export async function validateAdminCredentials(input: {
  email: string;
  password: string;
}) {
  const status = getAdminAuthConfigStatus();

  if (!status.ready) {
    return { ok: false as const, reason: "config" as const };
  }

  const configuredEmail = process.env.ADMIN_EMAIL;
  const configuredPassword = process.env.ADMIN_PASSWORD;
  const configuredPasswordHash = process.env.ADMIN_PASSWORD_SHA256;
  const normalizedEmail = input.email.trim().toLowerCase();
  const passwordMatches =
    (configuredPassword && input.password === configuredPassword) ||
    (configuredPasswordHash &&
      (await hashPassword(input.password)) === configuredPasswordHash);

  if (configuredEmail && normalizedEmail === configuredEmail.toLowerCase()) {
    return passwordMatches
      ? { ok: true as const, role: getAdminRoleFromEnv() }
      : { ok: false as const, reason: "invalid" as const };
  }

  if (
    process.env.NODE_ENV !== "production" &&
    normalizedEmail === devEmail &&
    input.password === devPassword
  ) {
    return { ok: true as const, role: "owner" as const };
  }

  return { ok: false as const, reason: "invalid" as const };
}

export function getDevelopmentAdminCredentials() {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return {
    email: devEmail,
    password: devPassword,
  };
}

export function sanitizeAdminRedirect(value?: string | null) {
  if (
    !value ||
    !value.startsWith("/admin") ||
    value.startsWith("/admin/login")
  ) {
    return "/admin";
  }

  return value;
}

export async function createAdminSessionToken(input: {
  email: string;
  role: AdminRole;
}) {
  const secret = getSessionSecret();

  if (!secret) {
    throw new Error("Admin session secret is not configured.");
  }

  const issuedAt = Math.floor(Date.now() / 1000);
  const session: AdminSession = {
    email: input.email.trim().toLowerCase(),
    expiresAt: issuedAt + adminSessionMaxAgeSeconds,
    issuedAt,
    role: input.role,
  };
  const payload = encodeBase64Url(JSON.stringify(session));
  const signature = await sign(payload, secret);

  return `${payload}.${signature}`;
}

export async function verifyAdminSessionToken(token?: string | null) {
  if (!token) {
    return null;
  }

  const secret = getSessionSecret();

  if (!secret) {
    return null;
  }

  const [payload, signature] = token.split(".");

  if (!payload || !signature) {
    return null;
  }

  const isValid = await verify(payload, signature, secret);

  if (!isValid) {
    return null;
  }

  try {
    const session = JSON.parse(decodeBase64Url(payload)) as AdminSession;

    if (
      !session.email ||
      !adminRoles.includes(session.role) ||
      session.expiresAt <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function getAdminSessionFromRequest(request: Request) {
  return verifyAdminSessionToken(
    getCookieValue(request.headers.get("cookie"), adminSessionCookieName),
  );
}

export async function hashPassword(password: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(password),
  );

  return bytesToBase64Url(new Uint8Array(digest));
}

function getSessionSecret() {
  const configuredSecret = process.env.ADMIN_SESSION_SECRET;

  if (configuredSecret && configuredSecret.length >= 32) {
    return configuredSecret;
  }

  if (process.env.NODE_ENV !== "production") {
    return devSessionSecret;
  }

  return null;
}

function getCookieValue(cookieHeader: string | null, name: string) {
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  const prefix = `${name}=`;
  const cookie = cookies.find((item) => item.startsWith(prefix));

  return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : null;
}

async function sign(payload: string, secret: string) {
  const key = await getSigningKey(secret, ["sign"]);
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );

  return bytesToBase64Url(new Uint8Array(signature));
}

async function verify(payload: string, signature: string, secret: string) {
  const key = await getSigningKey(secret, ["verify"]);

  return crypto.subtle.verify(
    "HMAC",
    key,
    base64UrlToBytes(signature),
    new TextEncoder().encode(payload),
  );
}

async function getSigningKey(
  secret: string,
  usages: KeyUsage[],
): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { hash: "SHA-256", name: "HMAC" },
    false,
    usages,
  );
}

function encodeBase64Url(value: string) {
  return bytesToBase64Url(new TextEncoder().encode(value));
}

function decodeBase64Url(value: string) {
  return new TextDecoder().decode(base64UrlToBytes(value));
}

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/, "");
}

function base64UrlToBytes(value: string) {
  const base64 = value
    .replaceAll("-", "+")
    .replaceAll("_", "/")
    .padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(base64);

  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}
