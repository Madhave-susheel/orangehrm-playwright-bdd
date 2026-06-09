import { createBdd } from 'playwright-bdd';
import { test, expect } from '../fixtures/fixtures.js';

const { When, Then } = createBdd(test);

When('user clicks add employee button', async ({ pimPage }) => {
  await pimPage.clickAddEmployee();
});

When('user fills employee details {string}, {string}, {string} with ID {string}', async ({ pimPage, sharedState }, firstName: string, middleName: string, lastName: string, employeeId: string) => {
  // Append a random 3-digit number to avoid collisions on public site
  const uniqueId = `${employeeId}_${Math.floor(100 + Math.random() * 900)}`;
  sharedState.employeeId = uniqueId;
  await pimPage.fillEmployeePersonalDetails(firstName, middleName, lastName, uniqueId);
});

Then('employee details page should be displayed', async ({ page, pimPage }) => {
  await expect(page).toHaveURL(/.*viewPersonalDetails.*/, { timeout: 20000 });
  await expect(pimPage.otherIdInput).toBeVisible({ timeout: 10000 });
});

When('user searches for employee with ID {string}', async ({ pimPage, sharedState }, employeeId: string) => {
  const targetId = sharedState.employeeId || employeeId;
  await pimPage.searchEmployee(undefined, targetId);
});

Then('user should see employee {string} in search results', async ({ pimPage }, fullName: string) => {
  // Check the table contains the employee's name parts
  // Handled individually because concatenated table cell texts omit spaces (e.g. "John RobertDoe")
  const table = pimPage.page.locator('.oxd-table-body');
  const parts = fullName.split(' ');
  for (const part of parts) {
    await expect(table).toContainText(part);
  }
});

When('user clicks edit employee with ID {string}', async ({ pimPage, sharedState }, employeeId: string) => {
  const targetId = sharedState.employeeId || employeeId;
  await pimPage.clickEditEmployee(targetId);
});

When('user updates employee other ID to {string} and license number to {string}', async ({ pimPage }, otherId: string, licenseNumber: string) => {
  await pimPage.editEmployeeDetails(otherId, licenseNumber);
});

Then('employee other ID should be saved as {string}', async ({ pimPage }, expectedOtherId: string) => {
  await expect(pimPage.otherIdInput).toHaveValue(expectedOtherId);
});
