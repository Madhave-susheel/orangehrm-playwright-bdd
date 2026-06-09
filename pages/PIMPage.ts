import { Page, Locator } from '@playwright/test';

export class PIMPage {
  readonly page: Page;
  readonly addButton: Locator;
  readonly searchButton: Locator;
  readonly saveButton: Locator;

  // Add Employee Form Inputs
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly createLoginDetailsSwitch: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;

  // Search Fields
  readonly searchEmployeeNameInput: Locator;
  readonly searchEmployeeIdInput: Locator;

  // Edit fields (Personal Details page)
  readonly otherIdInput: Locator;
  readonly licenseNumberInput: Locator;
  readonly personalDetailsSaveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.saveButton = page.getByRole('button', { name: 'Save' });

    // Add form
    this.firstNameInput = page.locator('input.orangehrm-firstname');
    this.middleNameInput = page.locator('input.orangehrm-middlename');
    this.lastNameInput = page.locator('input.orangehrm-lastname');
    this.employeeIdInput = page.locator('.oxd-input-group', { hasText: 'Employee Id' }).locator('input').first();
    this.createLoginDetailsSwitch = page.locator('.oxd-switch-input');
    
    // Login Details (optional)
    this.usernameInput = page.locator('.oxd-input-group', { hasText: 'Username' }).locator('input').first();
    this.passwordInput = page.locator('.oxd-input-group', { hasText: 'Password' }).locator('input[type="password"]').first();
    this.confirmPasswordInput = page.locator('.oxd-input-group', { hasText: 'Confirm Password' }).locator('input[type="password"]').first();

    // Search filters
    this.searchEmployeeNameInput = page.locator('.oxd-input-group', { hasText: 'Employee Name' }).locator('input').first();
    this.searchEmployeeIdInput = page.locator('.oxd-input-group', { hasText: 'Employee Id' }).locator('input').first();

    // Edit fields (Personal Details)
    this.otherIdInput = page.locator('.oxd-input-group', { hasText: 'Other Id' }).locator('input').first();
    this.licenseNumberInput = page.locator('.oxd-input-group', { hasText: 'Driver\'s License Number' }).locator('input').first();
    // In Personal details, there are multiple save buttons (one for personal details, one for custom fields). 
    // We target the first one or the one inside the Personal Details form container.
    this.personalDetailsSaveButton = page.locator('.orangehrm-horizontal-padding').first().getByRole('button', { name: 'Save' }).first();
  }

  async clickAddEmployee(): Promise<void> {
    await this.addButton.click();
  }

  async fillEmployeePersonalDetails(firstName: string, middleName: string, lastName: string, employeeId?: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.middleNameInput.fill(middleName);
    await this.lastNameInput.fill(lastName);
    if (employeeId) {
      await this.employeeIdInput.fill(employeeId);
    }
  }

  async toggleCreateLoginDetails(): Promise<void> {
    await this.createLoginDetailsSwitch.click();
  }

  async fillEmployeeLoginDetails(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
  }

  async clickSave(): Promise<void> {
    await this.saveButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchEmployee(name?: string, id?: string): Promise<void> {
    if (name) {
      await this.searchEmployeeNameInput.fill(name);
    }
    if (id) {
      await this.searchEmployeeIdInput.fill(id);
    }
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  getEmployeeRow(id: string): Locator {
    return this.page.locator('.oxd-table-card', { hasText: id }).first();
  }

  async editEmployeeDetails(otherId: string, licenseNumber: string): Promise<void> {
    // Wait for personal details page to render
    await this.otherIdInput.waitFor({ state: 'visible' });
    await this.otherIdInput.fill(otherId);
    await this.licenseNumberInput.fill(licenseNumber);
    await this.personalDetailsSaveButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickEditEmployee(id: string): Promise<void> {
    const row = this.getEmployeeRow(id);
    await row.locator('.bi-pencil-fill').click();
    await this.page.waitForLoadState('networkidle');
  }
}
