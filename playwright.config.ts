import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // ← CHANGED: Always use 1 worker
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    viewport: null,
    ignoreHTTPSErrors: true,
    launchOptions: {
      args: ['--start-maximized'],
      headless: false,
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // other projects...
  ],
});