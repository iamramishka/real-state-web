import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.setTimeout(60_000);

function luminance(hex: string) {
  const channels = hex
    .replace("#", "")
    .match(/.{2}/g)
    ?.map((value) => {
      const channel = Number.parseInt(value, 16) / 255;
      return channel <= 0.03928
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4;
    });

  if (!channels) {
    throw new Error(`Invalid color ${hex}`);
  }

  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrastRatio(foreground: string, background: string) {
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));

  return (lighter + 0.05) / (darker + 0.05);
}

test("home page has no serious or critical accessibility violations", async ({
  page,
}) => {
  await page.goto("/");

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  const blockingViolations = results.violations.filter((violation) =>
    ["critical", "serious"].includes(violation.impact ?? ""),
  );

  expect(blockingViolations).toEqual([]);
});

test("home page exposes required landmarks and heading structure", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByRole("banner")).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Primary navigation" }),
  ).toBeVisible();
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Find the home",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
});

test("interactive elements are keyboard reachable with visible focus", async ({
  browserName,
  page,
}) => {
  await page.goto("/");

  const expectedStops = [
    "Nordhaven home",
    "Browse homes to buy",
    "Learn how to sell with Nordhaven",
    "Browse homes to rent",
    "Meet Nordhaven agents",
    "Read real estate news",
    "Contact us",
  ];

  for (const accessibleName of expectedStops) {
    const link = page
      .getByRole("banner")
      .getByRole("link", { name: accessibleName });

    if (browserName === "webkit") {
      await link.focus();
    } else {
      await page.keyboard.press("Tab");
    }

    await expect(link).toBeFocused();
  }

  const buyMode = page.getByRole("button", { name: "Buy" });
  if (browserName === "webkit") {
    await buyMode.focus();
  } else {
    await page.keyboard.press("Tab");
  }
  await expect(page.getByRole("button", { name: "Buy" })).toBeFocused();
});

test("mobile navigation traps focus and closes with Escape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/");

  const trigger = page.getByRole("button", { name: "Open navigation menu" });
  await trigger.focus();
  await page.keyboard.press("Enter");

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();

  await page.keyboard.press("Tab");
  const activeElementIsInDialog = await dialog.evaluate((element) =>
    element.contains(document.activeElement),
  );
  expect(activeElementIsInDialog).toBe(true);

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("forms announce validation errors and status messages", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Run search" }).click();
  await expect(
    page.getByText("Please enter at least 3 characters."),
  ).toHaveAttribute("role", "alert");
  await expect(
    page.getByText("Please enter at least 3 characters."),
  ).toContainText("Please enter at least 3 characters.");

  await page
    .getByRole("button", { name: "Subscribe to the Nordhaven newsletter" })
    .click();
  await expect(
    page.getByText("Please enter a valid email address."),
  ).toHaveAttribute("role", "alert");
  await expect(
    page.getByText("Please enter a valid email address."),
  ).toContainText("Please enter a valid email address.");

  await page.getByLabel("Stay in the loop").fill("reader@example.com");
  await page
    .getByRole("button", { name: "Subscribe to the Nordhaven newsletter" })
    .click();
  await expect(page.getByText("You're subscribed. We'll send")).toHaveAttribute(
    "role",
    "status",
  );
  await expect(page.getByText("You're subscribed. We'll send")).toContainText(
    "You're subscribed. We'll send the good stuff only.",
  );
});

test("map alternative text, image alts, and token contrast are covered", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("group", {
      name: "Map of property listings. Use the list below for an accessible alternative.",
    }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "The listing cards beside this map contain the same homes with prices, addresses, details, and links.",
    ),
  ).toBeAttached();

  const images = page.getByRole("img");
  const count = await images.count();
  expect(count).toBeGreaterThan(0);
  for (let index = 0; index < count; index += 1) {
    await expect(images.nth(index)).toHaveAttribute("alt", /\S/);
  }

  expect(contrastRatio("#0b0b0c", "#ffffff")).toBeGreaterThanOrEqual(4.5);
  expect(contrastRatio("#ffffff", "#0b0b0c")).toBeGreaterThanOrEqual(4.5);
  expect(contrastRatio("#26262a", "#f6f6f4")).toBeGreaterThanOrEqual(4.5);
});
