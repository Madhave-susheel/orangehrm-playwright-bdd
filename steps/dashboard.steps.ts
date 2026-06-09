import { createBdd } from 'playwright-bdd';
import { test, expect } from '../fixtures/fixtures.js';

const { When, Then } = createBdd(test);

When('user navigates to {string} module', async ({ dashboardPage }, moduleName: string) => {
  await dashboardPage.navigateToModule(moduleName);
});

Then('user should see the dashboard widget {string}', async ({ dashboardPage }, widgetTitle: string) => {
  const widget = dashboardPage.getWidget(widgetTitle);
  await expect(widget).toBeVisible();
});

Then('user should see the quick launch card {string}', async ({ dashboardPage }, cardTitle: string) => {
  const card = dashboardPage.getQuickLaunchCard(cardTitle);
  await expect(card).toBeVisible();
});
