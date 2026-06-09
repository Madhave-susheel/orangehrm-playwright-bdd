import { Page, Locator } from '@playwright/test';
import { selectDropdownValue, selectAutocompleteValue } from '../utils/helpers.js';

export class DirectoryPage {
  readonly page: Page;
  readonly employeeNameInput: Locator;
  readonly jobTitleDropdown: Locator;
  readonly locationDropdown: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.employeeNameInput = page.locator('.oxd-input-group', { hasText: 'Employee Name' }).locator('input').first();
    this.jobTitleDropdown = page.locator('.oxd-input-group', { hasText: 'Job Title' }).locator('.oxd-select-text').first();
    this.locationDropdown = page.locator('.oxd-input-group', { hasText: 'Location' }).locator('.oxd-select-text').first();
    this.searchButton = page.getByRole('button', { name: 'Search' });
  }

  async searchEmployee(employeeName: string, jobTitle?: string, location?: string): Promise<void> {
    await selectAutocompleteValue(this.page, this.employeeNameInput, employeeName, employeeName);
    
    if (jobTitle) {
      await selectDropdownValue(this.page, this.jobTitleDropdown, jobTitle);
    }
    if (location) {
      await selectDropdownValue(this.page, this.locationDropdown, location);
    }
    
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}
