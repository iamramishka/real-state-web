import { expect, test } from "@playwright/test";

test("home page renders the hero and search content", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "Find the home you've been imagining.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("img", { name: /contemporary luxury home/i }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Buy" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.getByLabel("Search query")).toBeVisible();
  await expect(
    page.getByPlaceholder("e.g. 3-bedroom near a good school in Austin, TX"),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Run search" })).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: "Will a king bed fit in the primary? — tap to search",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "New to market" }),
  ).toHaveAttribute("aria-pressed", "false");
  await expect(
    page.getByRole("heading", { name: "Explore our homes" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Homes for you" }),
  ).toBeVisible();
  await expect(
    page
      .getByRole("img", { name: /contemporary glass hillside home/i })
      .first(),
  ).toBeVisible();
  await expect(
    page.getByText("Laurel Canyon Glass Residence").first(),
  ).toBeVisible();
  await expect(
    page
      .getByRole("link", {
        name: "View details for 1824 Crestline Drive, Austin, TX",
      })
      .first(),
  ).toHaveAttribute("href", "/property/laurel-canyon-glass-residence");
});

test("search form validates and submits with keyboard", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Rent" }).click();
  await expect(page.getByRole("button", { name: "Rent" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(
    page.getByPlaceholder(
      "e.g. Pet-friendly apartment with parking under $2,500",
    ),
  ).toBeVisible();

  await page.getByLabel("Search query").fill("Loft near transit");
  await page.keyboard.press("Enter");

  await expect(
    page.getByRole("status", { name: "Search status" }),
  ).toContainText('Rent search ready for "Loft near transit".');
});

test("search chips are keyboard accessible and filters toggle", async ({
  page,
}) => {
  await page.goto("/");

  await page
    .getByRole("button", {
      name: "Will a king bed fit in the primary? — tap to search",
    })
    .press("Enter");

  await expect(
    page.getByRole("status", { name: "Suggestion status" }),
  ).toContainText(
    "Suggested search selected: Will a king bed fit in the primary bedroom.",
  );

  const luxuryFilter = page.getByRole("button", { name: "Luxury" });
  await expect(luxuryFilter).toHaveAttribute("aria-pressed", "false");
  await luxuryFilter.press("Enter");
  await expect(luxuryFilter).toHaveAttribute("aria-pressed", "true");
  await luxuryFilter.press("Space");
  await expect(luxuryFilter).toHaveAttribute("aria-pressed", "false");
});
