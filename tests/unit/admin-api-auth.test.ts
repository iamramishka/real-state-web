import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  GET as getAiOps,
  POST as postAiOps,
} from "@/app/api/admin/ai-ops/route";
import {
  GET as getContent,
  POST as postContent,
} from "@/app/api/admin/content/route";
import { GET as getHealth } from "@/app/api/admin/health/route";
import { GET as getManifest } from "@/app/api/admin/manifest/route";
import { getCurrentAdminSession } from "@/lib/auth/server";

vi.mock("@/lib/auth/server", () => ({
  getCurrentAdminSession: vi.fn(),
}));

const getSession = vi.mocked(getCurrentAdminSession);

describe("admin API route-level authorization", () => {
  beforeEach(() => {
    getSession.mockResolvedValue(null);
  });

  it.each([
    ["GET /manifest", getManifest],
    ["GET /health", getHealth],
    ["GET /content", getContent],
    ["POST /content", postContent],
    ["GET /ai-ops", getAiOps],
    ["POST /ai-ops", postAiOps],
  ])(
    "returns 401 from %s when called without middleware",
    async (_name, call) => {
      const response = await call();

      expect(response.status).toBe(401);
      await expect(response.json()).resolves.toEqual({ error: "Unauthorized" });
    },
  );
});
