import { Page, Locator } from '@playwright/test';

export class MaintenancePage {
  readonly page: Page;
  readonly passwordInput: Locator;
  readonly confirmButton: Locator;
  readonly cancelButton: Locator;
  readonly maintenanceHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.passwordInput = page.locator('input[type="password"]');
    this.confirmButton = page.getByRole('button', { name: 'Confirm' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.maintenanceHeader = page.locator('.orangehrm-admin-access-title');
  }

  async confirmPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
    await this.confirmButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}
