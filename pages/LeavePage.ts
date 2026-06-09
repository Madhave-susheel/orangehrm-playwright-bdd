import { Page, Locator } from '@playwright/test';
import { selectDropdownValue, selectAutocompleteValue, fillDateInput } from '../utils/helpers.js';

export class LeavePage {
  readonly page: Page;
  
  // Navigation tabs
  readonly applyTab: Locator;
  readonly leaveListTab: Locator;
  readonly assignLeaveTab: Locator;

  // Form elements (Apply/Assign)
  readonly formEmployeeNameInput: Locator;
  readonly formLeaveTypeDropdown: Locator;
  readonly formFromDateInput: Locator;
  readonly formToDateInput: Locator;
  readonly formCommentsTextArea: Locator;
  readonly applyButton: Locator;
  readonly assignButton: Locator;

  // Search filters (Leave List)
  readonly searchFromDateInput: Locator;
  readonly searchToDateInput: Locator;
  readonly searchEmployeeNameInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.applyTab = page.getByRole('link', { name: 'Apply' });
    this.leaveListTab = page.getByRole('link', { name: 'Leave List' });
    this.assignLeaveTab = page.getByRole('link', { name: 'Assign Leave' });

    // Form elements
    this.formEmployeeNameInput = page.locator('.oxd-input-group', { hasText: 'Employee Name' }).locator('input').first();
    this.formLeaveTypeDropdown = page.locator('.oxd-input-group', { hasText: 'Leave Type' }).locator('.oxd-select-text').first();
    this.formFromDateInput = page.locator('.oxd-input-group', { hasText: 'From Date' }).locator('input').first();
    this.formToDateInput = page.locator('.oxd-input-group', { hasText: 'To Date' }).locator('input').first();
    this.formCommentsTextArea = page.locator('.oxd-input-group', { hasText: 'Comments' }).locator('textarea').first();
    this.applyButton = page.getByRole('button', { name: 'Apply' });
    this.assignButton = page.getByRole('button', { name: 'Assign' });

    // Search filters
    this.searchFromDateInput = page.locator('.oxd-input-group', { hasText: 'From Date' }).locator('input').first();
    this.searchToDateInput = page.locator('.oxd-input-group', { hasText: 'To Date' }).locator('input').first();
    this.searchEmployeeNameInput = page.locator('.oxd-input-group', { hasText: 'Employee Name' }).locator('input').first();
    this.searchButton = page.getByRole('button', { name: 'Search' });
  }

  async clickApplyTab(): Promise<void> {
    await this.applyTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickLeaveListTab(): Promise<void> {
    await this.leaveListTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickAssignLeaveTab(): Promise<void> {
    await this.assignLeaveTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async applyLeave(leaveType: string, fromDate: string, toDate: string, comments: string): Promise<void> {
    await selectDropdownValue(this.page, this.formLeaveTypeDropdown, leaveType);
    await fillDateInput(this.page, this.formFromDateInput, fromDate);
    await fillDateInput(this.page, this.formToDateInput, toDate);
    await this.formCommentsTextArea.fill(comments);
    
    // Clicking out to close calendar popup if open
    await this.page.locator('label', { hasText: 'Comments' }).click();
    await this.applyButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async assignLeave(employeeName: string, leaveType: string, fromDate: string, toDate: string, comments: string): Promise<string> {
    const resolvedName = await selectAutocompleteValue(this.page, this.formEmployeeNameInput, employeeName);
    await selectDropdownValue(this.page, this.formLeaveTypeDropdown, leaveType);
    await fillDateInput(this.page, this.formFromDateInput, fromDate);
    await fillDateInput(this.page, this.formToDateInput, toDate);
    await this.formCommentsTextArea.fill(comments);
    
    // Clicking out to close calendar popup if open
    await this.page.locator('label', { hasText: 'Comments' }).click();
    await this.assignButton.click();
    await this.page.waitForLoadState('networkidle');
    return resolvedName;
  }

  async searchLeaveRecords(fromDate: string, toDate: string, employeeName?: string): Promise<void> {
    // Clear default "Pending Approval" status chips to search for all statuses (direct assignment has status "Scheduled")
    const statusGroup = this.page.locator('.oxd-input-group', { hasText: 'Show Leave with Status' });
    const closeButtons = statusGroup.locator('.oxd-chip-close');
    
    // Wait briefly for default chips to load, if any
    try {
      await closeButtons.first().waitFor({ state: 'visible', timeout: 3000 });
    } catch (e) {
      // No status chips found or loaded
    }
    
    // Dynamic loop to clear all chips to ensure we are searching all statuses
    while (await closeButtons.count() > 0) {
      await closeButtons.first().click();
      await this.page.waitForTimeout(300); // Allow DOM to update after removal
    }
    
    await fillDateInput(this.page, this.searchFromDateInput, fromDate);
    await fillDateInput(this.page, this.searchToDateInput, toDate);
    
    if (employeeName) {
      await selectAutocompleteValue(this.page, this.searchEmployeeNameInput, employeeName);
    }
    
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}
