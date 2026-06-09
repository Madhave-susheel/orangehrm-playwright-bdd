import { createBdd } from 'playwright-bdd';
import { test, expect } from '../fixtures/fixtures.js';

const { When, Then } = createBdd(test);

When('user enters password {string} to confirm administrator access', async ({ maintenancePage }, password: string) => {
  await maintenancePage.confirmPassword(password);
});

Then('user should see the maintenance page actions', async ({ page }) => {
  // Verifying that after confirming access, we can see the purge records menu or header
  const maintenanceContainer = page.locator('.orangehrm-background-container');
  await expect(maintenanceContainer).toBeVisible();
  await expect(page).toHaveURL(/.*maintenance.*/);
});
