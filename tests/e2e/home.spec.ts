import { expect, test } from "@playwright/test";

test.setTimeout(60_000);

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
  await expect(
    page.getByRole("heading", { name: "5 Homes for sale" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Save this search" }),
  ).toBeVisible();
  await expect(
    page.getByRole("group", {
      name: "Map of property listings. Use the list below for an accessible alternative.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", {
      name: "$2.8M — 1824 Crestline Drive, Austin, TX. Tap to view details.",
    }),
  ).toHaveAttribute("href", "/property/laurel-canyon-glass-residence");
  await expect(
    page.getByRole("heading", {
      name: "The smarter way to sell your home.",
    }),
  ).toBeVisible();
  await expect(
    page.getByText("Suggested listing price within 48 hours"),
  ).toBeVisible();
  await expect(
    page.getByRole("img", {
      name: /beautifully staged open-plan living room/i,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", {
      name: "Learn more about selling with Nordhaven",
    }),
  ).toHaveAttribute("href", "/sell");
  await expect(
    page.getByRole("heading", {
      name: "Explore your next neighbourhood",
    }),
  ).toBeVisible();
  await expect(page.getByText("Search neighbourhoods").first()).toBeVisible();
  await expect(
    page.getByRole("img", {
      name: /walkable neighbourhood street/i,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Explore Search neighbourhoods" }),
  ).toHaveAttribute("href", "/neighbourhoods");
  await expect(
    page.getByRole("link", { name: "Explore New builds near you" }),
  ).toHaveAttribute("href", "/new-homes");
  await expect(
    page.getByRole("link", { name: "Explore Meet your agent" }),
  ).toHaveAttribute("href", "/agents");
  await expect(
    page.getByRole("heading", { name: "Meet our expert agents" }),
  ).toBeVisible();
  await expect(
    page.getByRole("img", {
      name: "Maya Chen, senior sales consultant at Nordhaven.",
    }),
  ).toBeVisible();
  await expect(page.getByText("4.9 out of 5 stars — 84 reviews")).toHaveCount(
    1,
  );
  await expect(
    page.getByRole("link", { name: "Contact Maya Chen" }),
  ).toHaveAttribute("href", "/agents/maya-chen");
  await expect(
    page.getByRole("heading", { name: "Real estate news" }),
  ).toBeVisible();
  await expect(
    page.getByRole("img", {
      name: "Residential towers and new construction cranes at sunrise.",
    }),
  ).toBeVisible();
  await expect(page.locator("time[datetime='2026-06-12']")).toHaveText(
    "June 12, 2026",
  );
  await expect(
    page
      .getByRole("link", {
        name: "Read: Inventory is rising, but turnkey homes still move first",
      })
      .last(),
  ).toHaveAttribute("href", "/news/market-velocity-shifts");
  await expect(
    page.getByRole("heading", {
      name: "Discover trends, tips, and property inspiration",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "See all learning resources" }),
  ).toHaveAttribute("href", "/news");
  await expect(
    page
      .getByRole("link", {
        name: "Read more: Quiet corners buyers remember after the tour",
      })
      .last(),
  ).toHaveAttribute("href", "/news/quiet-corners-buyers-notice");
  await expect(
    page.getByRole("heading", { name: "Ready to find your next home?" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Start searching for a home" }),
  ).toHaveAttribute("href", "/buy");
  await expect(page.getByRole("contentinfo")).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Footer navigation" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Nordhaven on Instagram" }),
  ).toHaveAttribute("rel", "noopener noreferrer");
  await expect(
    page.getByRole("link", { name: "Nordhaven on Instagram" }),
  ).toHaveAttribute("target", "_blank");
  await expect(
    page.getByText("© 2026 Nordhaven. All rights reserved."),
  ).toBeVisible();
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

test("listing map toggles on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/");

  const mapToggle = page.getByRole("button", { name: "Show map" });
  await expect(mapToggle).toBeVisible();
  await expect(
    page.getByRole("group", {
      name: "Map of property listings. Use the list below for an accessible alternative.",
    }),
  ).toBeHidden();

  await mapToggle.click();

  await expect(page.getByRole("button", { name: "Show list" })).toBeVisible();
  await expect(
    page.getByRole("group", {
      name: "Map of property listings. Use the list below for an accessible alternative.",
    }),
  ).toBeVisible();
});

test("newsletter form validates and confirms signup", async ({ page }) => {
  await page.goto("/");

  const emailInput = page.getByLabel("Stay in the loop");
  await expect(emailInput).toHaveAttribute("placeholder", "Your email address");

  await page
    .getByRole("button", {
      name: "Subscribe to the Nordhaven newsletter",
    })
    .click();
  await expect(
    page.getByText("Please enter a valid email address."),
  ).toBeVisible();

  await emailInput.fill("reader@example.com");
  await page
    .getByRole("button", {
      name: "Subscribe to the Nordhaven newsletter",
    })
    .click();
  await expect(
    page.getByText("You're subscribed. We'll send the good stuff only."),
  ).toBeVisible();
});
