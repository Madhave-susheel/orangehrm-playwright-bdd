import { Page, Locator } from '@playwright/test';
import { selectAutocompleteValue } from '../utils/helpers.js';

export class TimePage {
  readonly page: Page;
  readonly employeeNameInput: Locator;
  readonly viewButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.employeeNameInput = page.locator('.oxd-input-group', { hasText: 'Employee Name' }).locator('input').first();
    this.viewButton = page.locator('form button[type="submit"]', { hasText: 'View' });
  }

  async viewEmployeeTimesheet(employeeName: string): Promise<string> {
    const resolvedName = await selectAutocompleteValue(this.page, this.employeeNameInput, employeeName, employeeName);
    await this.viewButton.click();
    await this.page.waitForLoadState('networkidle');
    return resolvedName;
  }
}
