import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly sidePanel: Locator;
  readonly userDropdown: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidePanel = page.locator('.oxd-sidepanel');
    this.userDropdown = page.locator('.oxd-userdropdown-tab');
    this.logoutButton = page.getByRole('menuitem', { name: 'Logout' });
  }

  async navigateToModule(moduleName: string): Promise<void> {
    if (moduleName.toLowerCase() === 'buzz') {
      await this.page.goto('/web/index.php/buzz/viewBuzz', { waitUntil: 'domcontentloaded' });
      return;
    }
    // Navigate using the side panel links
    // Handles case-insensitive matches and links like Admin, PIM, etc.
    await this.sidePanel.waitFor({ state: 'visible', timeout: 10000 });
    const link = this.sidePanel.getByRole('link', { name: moduleName, exact: false });
    await link.waitFor({ state: 'attached', timeout: 5000 });
    await link.click();
  }

  async clickUserDropdown(): Promise<void> {
    await this.userDropdown.click();
  }

  async clickLogout(): Promise<void> {
    await this.clickUserDropdown();
    await this.logoutButton.click();
  }

  getWidget(widgetTitle: string): Locator {
    return this.page.locator('.orangehrm-dashboard-widget', { hasText: widgetTitle }).first();
  }

  getQuickLaunchCard(cardTitle: string): Locator {
    return this.page.locator('.orangehrm-quicklaunch-button').filter({ hasText: cardTitle }).first().or(
      this.page.locator('.orangehrm-quicklaunch-card').filter({ hasText: cardTitle }).first()
    ).or(
      this.page.getByRole('button', { name: cardTitle, exact: true }).first()
    );
  }
}
