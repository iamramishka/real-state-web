import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3100";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["github"], ["html"]] : [["list"], ["html"]],
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  webServer: {
    command: "next dev --port 3100",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    url: baseURL,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "xs-320",
      testMatch: /.*responsive\.spec\.ts/,
      use: {
        browserName: "chromium",
        viewport: { width: 320, height: 900 },
      },
    },
    {
      name: "sm-375",
      testMatch: /.*responsive\.spec\.ts/,
      use: {
        browserName: "chromium",
        viewport: { width: 375, height: 900 },
      },
    },
    {
      name: "ms-425",
      testMatch: /.*responsive\.spec\.ts/,
      use: {
        browserName: "chromium",
        viewport: { width: 425, height: 900 },
      },
    },
    {
      name: "md-768",
      testMatch: /.*responsive\.spec\.ts/,
      use: {
        browserName: "chromium",
        viewport: { width: 768, height: 1024 },
      },
    },
    {
      name: "lg-1024",
      testMatch: /.*responsive\.spec\.ts/,
      use: {
        browserName: "chromium",
        viewport: { width: 1024, height: 900 },
      },
    },
    {
      name: "xl-1280",
      testMatch: /.*responsive\.spec\.ts/,
      use: {
        browserName: "chromium",
        viewport: { width: 1280, height: 900 },
      },
    },
    {
      name: "2xl-1440",
      testMatch: /.*responsive\.spec\.ts/,
      use: {
        browserName: "chromium",
        viewport: { width: 1440, height: 1000 },
      },
    },
    {
      name: "3xl-1920",
      testMatch: /.*responsive\.spec\.ts/,
      use: {
        browserName: "chromium",
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
});
