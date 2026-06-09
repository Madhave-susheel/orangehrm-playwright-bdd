import { createBdd } from 'playwright-bdd';
import { test, expect } from '../fixtures/fixtures.js';

const { When, Then } = createBdd(test);

When('user sets up Buzz mock page to bypass access restriction', async ({ buzzPage }) => {
  await buzzPage.setupMockBuzzPage();
});

When('user creates a buzz post with content {string}', async ({ buzzPage }, content: string) => {
  await buzzPage.createPost(content);
});

Then('user should see the new buzz post with content {string}', async ({ buzzPage }, expectedContent: string) => {
  await expect(buzzPage.firstPostText).toBeVisible();
  await expect(buzzPage.firstPostText).toHaveText(expectedContent);
});
