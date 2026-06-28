import { expect, test } from "@playwright/test";

test("home page has no horizontal overflow", async ({ page }) => {
  await page.goto("/");

  const hasHorizontalOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );

  expect(hasHorizontalOverflow).toBe(false);
});
