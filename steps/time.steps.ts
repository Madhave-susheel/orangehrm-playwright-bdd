import { createBdd } from 'playwright-bdd';
import { test, expect } from '../fixtures/fixtures.js';

const { When, Then } = createBdd(test);

When('user views timesheet for employee {string}', async ({ timePage, sharedState }, employeeName: string) => {
  const resolved = await timePage.viewEmployeeTimesheet(employeeName);
  sharedState.employeeName = resolved;
});

Then('timesheet for {string} should be displayed', async ({ page, sharedState }, employeeName: string) => {
  const targetName = sharedState.employeeName || employeeName;
  // Timesheet page displays header like "Timesheet for <Name>" or shows timesheet records
  const timesheetHeader = page.getByRole('heading', { level: 6, name: /Timesheet for/i });
  await expect(timesheetHeader).toBeVisible();
  await expect(timesheetHeader).toContainText(targetName);
});
