import { test as base } from 'playwright-bdd';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { AdminPage } from '../pages/AdminPage.js';
import { PIMPage } from '../pages/PIMPage.js';
import { LeavePage } from '../pages/LeavePage.js';
import { RecruitmentPage } from '../pages/RecruitmentPage.js';
import { TimePage } from '../pages/TimePage.js';
import { DirectoryPage } from '../pages/DirectoryPage.js';
import { PerformancePage } from '../pages/PerformancePage.js';
import { MaintenancePage } from '../pages/MaintenancePage.js';
import { BuzzPage } from '../pages/BuzzPage.js';

type SharedState = {
  employeeName?: string;
  username?: string;
  employeeId?: string;
  fromDate?: string;
  toDate?: string;
};

type CustomFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  adminPage: AdminPage;
  pimPage: PIMPage;
  leavePage: LeavePage;
  recruitmentPage: RecruitmentPage;
  timePage: TimePage;
  directoryPage: DirectoryPage;
  performancePage: PerformancePage;
  maintenancePage: MaintenancePage;
  buzzPage: BuzzPage;
  sharedState: SharedState;
};

export const test = base.extend<CustomFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  adminPage: async ({ page }, use) => {
    await use(new AdminPage(page));
  },
  pimPage: async ({ page }, use) => {
    await use(new PIMPage(page));
  },
  leavePage: async ({ page }, use) => {
    await use(new LeavePage(page));
  },
  recruitmentPage: async ({ page }, use) => {
    await use(new RecruitmentPage(page));
  },
  timePage: async ({ page }, use) => {
    await use(new TimePage(page));
  },
  directoryPage: async ({ page }, use) => {
    await use(new DirectoryPage(page));
  },
  performancePage: async ({ page }, use) => {
    await use(new PerformancePage(page));
  },
  maintenancePage: async ({ page }, use) => {
    await use(new MaintenancePage(page));
  },
  buzzPage: async ({ page }, use) => {
    await use(new BuzzPage(page));
  },
  sharedState: async ({}, use) => {
    await use({});
  },
});

export const expect = test.expect;
