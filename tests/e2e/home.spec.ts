import { expect, test } from "@playwright/test";

test("home page renders the hero content", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "Find the home you've been imagining.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("img", { name: /contemporary luxury home/i }),
  ).toBeVisible();
});
