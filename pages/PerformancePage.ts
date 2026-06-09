import { Page, Locator } from '@playwright/test';
import { selectDropdownValue, selectAutocompleteValue } from '../utils/helpers.js';

export class PerformancePage {
  readonly page: Page;
  readonly employeeNameInput: Locator;
  readonly jobTitleDropdown: Locator;
  readonly statusDropdown: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.employeeNameInput = page.locator('.oxd-input-group', { hasText: 'Employee Name' }).locator('input').first();
    this.jobTitleDropdown = page.locator('.oxd-input-group', { hasText: 'Job Title' }).locator('.oxd-select-text').first();
    this.statusDropdown = page.locator('.oxd-input-group', { hasText: 'Review Status' }).locator('.oxd-select-text').first();
    this.searchButton = page.getByRole('button', { name: 'Search' });
  }

  async searchReviews(employeeName: string, jobTitle?: string, status?: string): Promise<void> {
    await selectAutocompleteValue(this.page, this.employeeNameInput, employeeName, employeeName);
    
    if (jobTitle) {
      await selectDropdownValue(this.page, this.jobTitleDropdown, jobTitle);
    }
    if (status) {
      await selectDropdownValue(this.page, this.statusDropdown, status);
    }
    
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}
