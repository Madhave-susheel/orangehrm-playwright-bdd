import { createBdd } from 'playwright-bdd';
import { test, expect } from '../fixtures/fixtures.js';

const { When, Then } = createBdd(test);

When('user clicks add user button', async ({ adminPage }) => {
  await adminPage.clickAddUser();
});

When('user fills new user details with role {string}, employee name {string}, status {string}, and username {string}', async ({ adminPage, sharedState }, role: string, employeeName: string, status: string, username: string) => {
  const uniqueUsername = `${username}_${Date.now().toString().slice(-6)}`;
  sharedState.username = uniqueUsername;
  await adminPage.fillUserDetails(role, employeeName, status, uniqueUsername);
});

When('user enters password {string} for the new user', async ({ adminPage }, password: string) => {
  await adminPage.formPasswordInput.fill(password);
  await adminPage.formConfirmPasswordInput.fill(password);
});

When('user clicks save button', async ({ adminPage }) => {
  await adminPage.clickSave();
});

Then('user should see the user {string} in the system users list', async ({ adminPage, sharedState }, username: string) => {
  const targetUsername = sharedState.username || username;
  await adminPage.searchUser(targetUsername);
  const row = adminPage.getUserRow(targetUsername);
  await expect(row).toBeVisible();
});

When('user searches for user {string}', async ({ adminPage, sharedState }, username: string) => {
  const targetUsername = sharedState.username || username;
  await adminPage.searchUser(targetUsername);
});

When('user clicks edit user {string}', async ({ adminPage, sharedState }, username: string) => {
  const targetUsername = sharedState.username || username;
  await adminPage.clickEditUser(targetUsername);
});

When('user updates user status to {string} and clicks save button', async ({ adminPage }, status: string) => {
  await adminPage.formStatusDropdown.click();
  await adminPage.page.locator('.oxd-select-dropdown .oxd-select-option', { hasText: status }).first().click();
  await adminPage.clickSave();
});

Then('user should see user {string} with status {string} in search results', async ({ adminPage, sharedState }, username: string, status: string) => {
  const targetUsername = sharedState.username || username;
  await adminPage.searchUser(targetUsername);
  const row = adminPage.getUserRow(targetUsername);
  await expect(row).toContainText(status);
});

When('user clicks delete user {string}', async ({ adminPage, sharedState }, username: string) => {
  const targetUsername = sharedState.username || username;
  await adminPage.clickDeleteUser(targetUsername);
});

When('user confirms delete action', async ({ adminPage }) => {
  await adminPage.confirmDelete();
});

Then('user {string} should not appear in system users list', async ({ adminPage, sharedState }, username: string) => {
  const targetUsername = sharedState.username || username;
  await adminPage.searchUser(targetUsername);
  const row = adminPage.getUserRow(targetUsername);
  await expect(row).not.toBeVisible();
});
