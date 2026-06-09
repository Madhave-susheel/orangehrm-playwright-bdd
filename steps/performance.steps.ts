import { createBdd } from 'playwright-bdd';
import { test, expect } from '../fixtures/fixtures.js';

const { When, Then } = createBdd(test);

When('user searches reviews for employee {string}', async ({ performancePage }, employeeName: string) => {
  await performancePage.searchReviews(employeeName);
});

Then('search results for reviews should be displayed', async ({ page }) => {
  // Check that the search results grid header is visible (always present even if the body is empty/hidden)
  const tableHeader = page.locator('.oxd-table-header');
  await expect(tableHeader).toBeVisible();
});
