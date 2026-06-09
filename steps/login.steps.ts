import { createBdd } from 'playwright-bdd';
import { test, expect } from '../fixtures/fixtures.js';
import users from '../test-data/users.json' assert { type: 'json' };

const { Given, When, Then } = createBdd(test);

Given('user navigates to OrangeHRM login page', async ({ loginPage }) => {
  await loginPage.navigate();
});

When('user enters valid username', async ({ loginPage }) => {
  await loginPage.enterUsername(users.validUser.username);
});

When('user enters valid password', async ({ loginPage }) => {
  await loginPage.enterPassword(users.validUser.password);
});

When('user clicks login button', async ({ loginPage }) => {
  await loginPage.clickLogin();
});

Then('user should be redirected to dashboard', async ({ page }) => {
  await expect(page).toHaveURL(/.*dashboard/);
});

// Logout steps
Given('user logs in with valid credentials', async ({ loginPage }) => {
  await loginPage.login(users.validUser.username, users.validUser.password);
});

When('user clicks logout button', async ({ dashboardPage }) => {
  await dashboardPage.clickLogout();
});

Then('user should be redirected to login page', async ({ page }) => {
  await expect(page).toHaveURL(/.*login/);
});

// Invalid Login
When('user enters invalid username', async ({ loginPage }) => {
  await loginPage.enterUsername(users.invalidUser.username);
});

When('user enters invalid password', async ({ loginPage }) => {
  await loginPage.enterPassword(users.invalidUser.password);
});

Then('user should see invalid credentials message', async ({ loginPage }) => {
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toHaveText('Invalid credentials');
});

// Empty Username
When('user enters empty username', async ({ loginPage }) => {
  await loginPage.enterUsername(users.emptyUsername.username);
});

Then('user should see required validation message under username', async ({ page }) => {
  const validationError = page.locator('.oxd-input-group', { hasText: 'Username' }).locator('.oxd-input-field-error-message');
  await expect(validationError).toBeVisible();
  await expect(validationError).toHaveText('Required');
});

// Empty Password
When('user enters empty password', async ({ loginPage }) => {
  await loginPage.enterPassword(users.emptyPassword.password);
});

Then('user should see required validation message under password', async ({ page }) => {
  const validationError = page.locator('.oxd-input-group', { hasText: 'Password' }).locator('.oxd-input-field-error-message');
  await expect(validationError).toBeVisible();
  await expect(validationError).toHaveText('Required');
});
