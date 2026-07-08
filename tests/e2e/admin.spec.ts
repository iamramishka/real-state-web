import { expect, test, type Page } from "@playwright/test";

test.setTimeout(90_000);
test.describe.configure({ mode: "serial" });

type AdminManifestResponse = {
  backendPaths: Array<{
    method: string;
    path: string;
    status: string;
  }>;
  contentModules: Array<{
    id: string;
    title: string;
  }>;
  operationsModules: Array<{
    id: string;
    title: string;
  }>;
  phase: {
    id: string;
    name: string;
  };
};

type AdminHealthResponse = {
  adminShell: string;
  auth: string;
  database: string;
  role: string | null;
  status: string;
  writableMutations: boolean;
};

type ReadOnlyAdminResponse = {
  modules: Array<{
    id: string;
    title: string;
  }>;
  status: string;
  writesEnabled: boolean;
};

const adminEmail = process.env.ADMIN_TEST_EMAIL ?? "admin@nordhaven.local";
const adminPassword = process.env.ADMIN_TEST_PASSWORD ?? "admin-password";

async function signInToAdmin(page: Page) {
  await page.goto("/admin/login");
  await page.getByLabel("Admin email").fill(adminEmail);
  await page.getByLabel("Admin password").fill(adminPassword);
  await page.getByRole("button", { name: "Sign in to admin" }).click();
  await expect(page).toHaveURL(/\/admin$/);
}

test("logged-out admin users are redirected to sign in", async ({ page }) => {
  await page.goto("/admin");

  await expect(page).toHaveURL(/\/admin\/login/);
  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();

  const manifest = await page.request.get("/api/admin/manifest");
  expect(manifest.status()).toBe(401);
});

test("admin dashboard renders content, backend, and AI operations areas", async ({
  page,
}) => {
  await signInToAdmin(page);

  await expect(
    page.getByRole("heading", { name: "Admin control center" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Admin panel foundation" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Content management areas" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Backend paths prepared" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Agents, skills, rules, standards, and task plans",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("link", { name: "Open Properties" }),
  ).toHaveAttribute("href", "/admin/properties");
  await expect(page.getByText("/api/admin/manifest").first()).toBeVisible();
  await expect(
    page.getByText("X-101: Codex wires authentication"),
  ).toBeVisible();
  await expect(page.getByText(adminEmail)).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
});

test("admin placeholder sections are reachable", async ({ page }) => {
  await signInToAdmin(page);
  await page.goto("/admin/properties");

  await expect(page.getByRole("heading", { name: "Properties" })).toBeVisible();
  await expect(page.getByText("The admin route is prepared.")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Back to admin dashboard" }),
  ).toHaveAttribute("href", "/admin");

  await page.goto("/admin/ai-ops/tasks");
  await expect(
    page.getByRole("heading", { exact: true, name: "Task plans" }),
  ).toBeVisible();
});

test("admin backend health and manifest routes are reachable", async ({
  page,
}) => {
  await signInToAdmin(page);

  const health = await page.request.get("/api/admin/health");
  expect(health.ok()).toBeTruthy();
  const healthJson = (await health.json()) as AdminHealthResponse;
  expect(healthJson).toMatchObject({
    adminShell: "ready",
    auth: "ready",
    database: "pending",
    role: "owner",
    status: "ok",
    writableMutations: false,
  });

  const manifest = await page.request.get("/api/admin/manifest");
  expect(manifest.ok()).toBeTruthy();
  const manifestJson = (await manifest.json()) as AdminManifestResponse;
  expect(manifestJson.phase.id).toBe("phase-5-admin-cms-ai-ops");
  expect(manifestJson.contentModules).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ id: "properties", title: "Properties" }),
      expect.objectContaining({ id: "agents", title: "Agents" }),
    ]),
  );
  expect(manifestJson.operationsModules).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ id: "task-plans", title: "Task plans" }),
    ]),
  );
  expect(manifestJson.backendPaths).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        method: "GET",
        path: "/api/admin/content",
        status: "ready",
      }),
    ]),
  );
});

test("admin content and AI ops APIs are read-only until auth and DB tasks", async ({
  page,
}) => {
  await signInToAdmin(page);

  const content = await page.request.get("/api/admin/content");
  expect(content.ok()).toBeTruthy();
  const contentJson = (await content.json()) as ReadOnlyAdminResponse;
  expect(contentJson.status).toBe("read-only");
  expect(contentJson.writesEnabled).toBe(false);
  expect(contentJson.modules).toEqual(
    expect.arrayContaining([expect.objectContaining({ id: "site-content" })]),
  );

  const aiOps = await page.request.get("/api/admin/ai-ops");
  expect(aiOps.ok()).toBeTruthy();
  const aiOpsJson = (await aiOps.json()) as ReadOnlyAdminResponse;
  expect(aiOpsJson.status).toBe("read-only");
  expect(aiOpsJson.modules).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ id: "rules-standards" }),
    ]),
  );

  const blockedWrite = await page.request.post("/api/admin/content");
  expect(blockedWrite.status()).toBe(501);
});
