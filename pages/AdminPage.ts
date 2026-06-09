import { Page, Locator } from '@playwright/test';
import { selectDropdownValue, selectAutocompleteValue } from '../utils/helpers.js';

export class AdminPage {
  readonly page: Page;
  readonly addButton: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  // Search filter inputs
  readonly searchUsernameInput: Locator;
  readonly searchUserRoleDropdown: Locator;
  readonly searchEmployeeNameInput: Locator;
  readonly searchStatusDropdown: Locator;

  // Form inputs (Add/Edit)
  readonly formUserRoleDropdown: Locator;
  readonly formEmployeeNameInput: Locator;
  readonly formStatusDropdown: Locator;
  readonly formUsernameInput: Locator;
  readonly formPasswordInput: Locator;
  readonly formConfirmPasswordInput: Locator;

  // Confirmation dialog
  readonly confirmDeleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });

    // Search filters
    this.searchUsernameInput = page.locator('.oxd-input-group', { hasText: 'Username' }).locator('input').first();
    this.searchUserRoleDropdown = page.locator('.oxd-input-group', { hasText: 'User Role' }).locator('.oxd-select-text').first();
    this.searchEmployeeNameInput = page.locator('.oxd-input-group', { hasText: 'Employee Name' }).locator('input').first();
    this.searchStatusDropdown = page.locator('.oxd-input-group', { hasText: 'Status' }).locator('.oxd-select-text').first();

    // Form inputs
    this.formUserRoleDropdown = page.locator('.oxd-input-group', { hasText: 'User Role' }).locator('.oxd-select-text').first();
    this.formEmployeeNameInput = page.locator('.oxd-input-group', { hasText: 'Employee Name' }).locator('input').first();
    this.formStatusDropdown = page.locator('.oxd-input-group', { hasText: 'Status' }).locator('.oxd-select-text').first();
    this.formUsernameInput = page.locator('.oxd-input-group', { hasText: 'Username' }).locator('input').first();
    this.formPasswordInput = page.locator('.oxd-input-group', { hasText: 'Password' }).locator('input[type="password"]').first();
    this.formConfirmPasswordInput = page.locator('.oxd-input-group', { hasText: 'Confirm Password' }).locator('input[type="password"]').first();

    // Dialog buttons
    this.confirmDeleteButton = page.getByRole('button', { name: 'Yes, Delete' });
  }

  async searchUser(username: string, role?: string, employeeName?: string, status?: string): Promise<string> {
    await this.searchUsernameInput.fill(username);
    let resolvedName = '';
    if (role) {
      await selectDropdownValue(this.page, this.searchUserRoleDropdown, role);
    }
    if (employeeName) {
      resolvedName = await selectAutocompleteValue(this.page, this.searchEmployeeNameInput, employeeName, employeeName);
    }
    if (status) {
      await selectDropdownValue(this.page, this.searchStatusDropdown, status);
    }
    await this.searchButton.click();
    // Allow list to reload
    await this.page.waitForLoadState('networkidle');
    return resolvedName;
  }

  async clickAddUser(): Promise<void> {
    await this.addButton.click();
  }

  async fillUserDetails(role: string, employeeName: string, status: string, username: string, password?: string): Promise<string> {
    await selectDropdownValue(this.page, this.formUserRoleDropdown, role);
    const resolvedName = await selectAutocompleteValue(this.page, this.formEmployeeNameInput, employeeName, employeeName);
    await selectDropdownValue(this.page, this.formStatusDropdown, status);
    await this.formUsernameInput.fill(username);
    
    if (password) {
      await this.formPasswordInput.fill(password);
      await this.formConfirmPasswordInput.fill(password);
    }
    return resolvedName;
  }

  async clickSave(): Promise<void> {
    await this.saveButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  getUserRow(username: string): Locator {
    return this.page.locator('.oxd-table-card', { hasText: username }).first();
  }

  async clickEditUser(username: string): Promise<void> {
    const row = this.getUserRow(username);
    await row.locator('.bi-pencil-fill').click();
  }

  async clickDeleteUser(username: string): Promise<void> {
    const row = this.getUserRow(username);
    await row.locator('.bi-trash').click();
  }

  async confirmDelete(): Promise<void> {
    await this.confirmDeleteButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}
