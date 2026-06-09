import { createBdd } from 'playwright-bdd';
import { test, expect } from '../fixtures/fixtures.js';

const { When, Then } = createBdd(test);

When('user searches directory for employee {string}', async ({ directoryPage }, employeeName: string) => {
  await directoryPage.searchEmployee(employeeName);
});

Then('search results for directory should be displayed', async ({ page }) => {
  // Directory results are cards, check that the grid or card container is visible
  const resultGrid = page.locator('.orangehrm-directory-card');
  await expect(resultGrid.first()).toBeVisible();
});
