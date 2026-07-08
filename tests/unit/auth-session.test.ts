import { afterEach, describe, expect, it, vi } from "vitest";

import {
  getAdminRoleFromEnv,
  hashPassword,
  validateAdminCredentials,
} from "@/lib/auth/session";

const originalEnv = { ...process.env };

afterEach(() => {
  process.env = { ...originalEnv };
  vi.restoreAllMocks();
});

describe("admin environment roles", () => {
  it("defaults a missing role to admin instead of owner", () => {
    delete process.env.ADMIN_ROLE;

    expect(getAdminRoleFromEnv()).toBe("admin");
  });

  it("warns and defaults an invalid role to admin", () => {
    process.env.ADMIN_ROLE = "superuser";
    const warning = vi.spyOn(console, "warn").mockImplementation(() => {});

    expect(getAdminRoleFromEnv()).toBe("admin");
    expect(warning).toHaveBeenCalledWith(
      '[auth] ADMIN_ROLE "superuser" is not a valid role. Defaulting to "admin".',
    );
  });
});

describe("admin password hashes", () => {
  it("uses Web Crypto verification for the SHA-256 credential path", async () => {
    process.env.ADMIN_EMAIL = "admin@example.com";
    process.env.ADMIN_PASSWORD_SHA256 = await hashPassword("correct-password");
    process.env.ADMIN_SESSION_SECRET =
      "a-secure-session-secret-at-least-32-chars";
    process.env.ADMIN_ROLE = "editor";
    const verify = vi.spyOn(crypto.subtle, "verify");

    await expect(
      validateAdminCredentials({
        email: "admin@example.com",
        password: "correct-password",
      }),
    ).resolves.toEqual({ ok: true, role: "editor" });
    expect(verify).toHaveBeenCalledOnce();

    await expect(
      validateAdminCredentials({
        email: "admin@example.com",
        password: "wrong-password",
      }),
    ).resolves.toEqual({ ok: false, reason: "invalid" });
  });
});
