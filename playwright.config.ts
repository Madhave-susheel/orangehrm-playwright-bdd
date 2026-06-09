import { defineConfig, devices } from '@playwright/test';
import { testDir } from './bdd.config.js';

export default defineConfig({
  testDir,
  fullyParallel: false, // Run tests sequentially to avoid rate-limiting on public demo site
  retries: 1,
  workers: 1, // Single worker to avoid overloading/rate-limiting the server
  timeout: 60000, // 60s per test
  expect: {
    timeout: 10000, // 10s for assertions to allow slow animations/redirection
  },
  reporter: [
    ['html'],
    ['list']
  ],
  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    actionTimeout: 30000,
    navigationTimeout: 30000,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    headless: false,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
});
