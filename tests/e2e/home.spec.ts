import { expect, test } from "@playwright/test";

test("home page renders the scaffold content", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "Premium real estate foundation is ready.",
    }),
  ).toBeVisible();
  await expect(page.getByText("Next.js 15 App Router")).toBeVisible();
});
