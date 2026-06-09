import { createBdd } from 'playwright-bdd';
import { test, expect } from '../fixtures/fixtures.js';

const { When, Then } = createBdd(test);

When('user navigates to Assign Leave tab', async ({ leavePage }) => {
  await leavePage.clickAssignLeaveTab();
});

When('user assigns {string} leave to employee {string} from {string} to {string} with comment {string}', async (
  { leavePage, sharedState },
  leaveType: string,
  employeeName: string,
  fromDate: string,
  toDate: string,
  comments: string
) => {
  // Generate unique future weekday dates within the allowed leave period to prevent
  // "Overlapping Leave", "No Working Days Selected" (weekends), or "Cannot Assign Leave Beyond 2027-12-31" errors.
  const baseDate = new Date();
  const offsetDays = Math.floor(Math.random() * 90) + 30; // 30 to 120 days in the future (within current leave period)
  const from = new Date(baseDate.getTime() + offsetDays * 24 * 60 * 60 * 1000);
  
  // Ensure "From Date" is a weekday
  const fromDay = from.getDay();
  if (fromDay === 0) { // Sunday -> Monday
    from.setDate(from.getDate() + 1);
  } else if (fromDay === 6) { // Saturday -> Monday
    from.setDate(from.getDate() + 2);
  }
  
  const to = new Date(from.getTime() + 24 * 60 * 60 * 1000); // 1 day later
  // Ensure "To Date" is also a weekday
  const toDay = to.getDay();
  if (toDay === 0) { // Sunday -> Monday
    to.setDate(to.getDate() + 1);
  } else if (toDay === 6) { // Saturday -> Monday
    to.setDate(to.getDate() + 2);
  }
  
  const dynamicFromDate = from.toISOString().split('T')[0];
  const dynamicToDate = to.toISOString().split('T')[0];
  
  sharedState.fromDate = dynamicFromDate;
  sharedState.toDate = dynamicToDate;
  
  const resolved = await leavePage.assignLeave(employeeName, leaveType, dynamicFromDate, dynamicToDate, comments);
  sharedState.employeeName = resolved;
});

Then('leave request should be successfully submitted', async ({ page }) => {
  // OrangeHRM displays a confirmation modal (Confirm Leave Assignment) if the employee's balance is 0.
  // We wait for it and click Ok if it appears.
  const confirmButton = page.getByRole('button', { name: 'Ok' });
  try {
    await confirmButton.waitFor({ state: 'visible', timeout: 5000 });
    await confirmButton.click();
    await page.waitForLoadState('networkidle');
  } catch (e) {
    // If the modal doesn't appear, proceed directly to verify the toast
  }
  
  const toast = page.locator('.oxd-toast');
  await expect(toast).toBeVisible({ timeout: 10000 });
  await expect(toast).toContainText(/Successfully/i);
});

When('user navigates to Leave List tab', async ({ leavePage }) => {
  await leavePage.clickLeaveListTab();
});

When('user searches leave records from {string} to {string} for employee {string}', async (
  { leavePage, sharedState },
  fromDate: string,
  toDate: string,
  employeeName: string
) => {
  const targetName = sharedState.employeeName || employeeName;
  const targetFromDate = sharedState.fromDate || fromDate;
  const targetToDate = sharedState.toDate || toDate;
  await leavePage.searchLeaveRecords(targetFromDate, targetToDate, targetName);
});

Then('search results should contain the leave records', async ({ page }) => {
  const tableBody = page.locator('.oxd-table-body');
  await expect(tableBody).toBeVisible();
  await expect(tableBody).not.toContainText('No Records Found');
});
