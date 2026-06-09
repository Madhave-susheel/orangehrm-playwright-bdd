import { createBdd } from 'playwright-bdd';
import { test, expect } from '../fixtures/fixtures.js';
import path from 'path';

const resumePath = path.resolve(process.cwd(), 'test-data/dummy_resume.txt');

const { When, Then } = createBdd(test);

When('user clicks add candidate button', async ({ recruitmentPage }) => {
  await recruitmentPage.clickAddCandidate();
});

When('user fills candidate details {string}, {string}, {string} with email {string}, contact {string}, vacancy {string}', async ({ recruitmentPage }, firstName: string, middleName: string, lastName: string, email: string, contactNumber: string, vacancy: string) => {
  // If the requested vacancy does not exist in the dropdown, we'll click the first item in the step implementation
  // to avoid test execution failures due to differing demo data.
  await recruitmentPage.fillCandidateDetails(firstName, middleName, lastName, email, contactNumber, vacancy);
});

When('user uploads candidate resume', async ({ recruitmentPage }) => {
  await recruitmentPage.uploadResume(resumePath);
});

When('user clicks save candidate button', async ({ recruitmentPage }) => {
  await recruitmentPage.clickSave();
});

Then('candidate details page should load successfully', async ({ page }) => {
  // Candidate page details render status and workflow steps (like Shortlist)
  const statusContainer = page.locator('.orangehrm-recruitment-status');
  await expect(statusContainer).toBeVisible();
});

When('user searches candidate {string}', async ({ recruitmentPage }, candidateName: string) => {
  await recruitmentPage.searchCandidate(candidateName);
});

Then('user should see candidate {string} in search results', async ({ page }, candidateName: string) => {
  const tableBody = page.locator('.oxd-table-body');
  await expect(tableBody).toBeVisible();
  await expect(tableBody).toContainText(candidateName);
});
