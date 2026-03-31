import { defineConfig } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3333";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  retries: 0,
  timeout: 60_000,
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "on",
    headless: false,
    launchOptions: {
      slowMo: 500,
    },
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
  webServer: {
    command: "pnpm --dir web dev",
    port: 3333,
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
