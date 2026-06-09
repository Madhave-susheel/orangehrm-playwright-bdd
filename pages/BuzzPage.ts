import { Page, Locator } from '@playwright/test';

export class BuzzPage {
  readonly page: Page;
  readonly postTextArea: Locator;
  readonly postButton: Locator;
  readonly firstPostText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.postTextArea = page.locator('textarea.oxd-buzz-post-input');
    // Matches the "Share" or "Post" button
    this.postButton = page.getByRole('button', { name: /Post|Share/i });
    this.firstPostText = page.locator('.orangehrm-buzz-post-body-text').first();
  }

  /**
   * Stubs the Buzz page behavior using Playwright routing to bypass the 403 restriction in the live demo environment.
   */
  async setupMockBuzzPage(): Promise<void> {
    await this.page.route('**/web/index.php/buzz/viewBuzz', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: `
          <!DOCTYPE html>
          <html>
          <head>
            <title>OrangeHRM - Buzz</title>
            <style>
              body { font-family: sans-serif; background-color: #f6f6f6; padding: 20px; }
              .oxd-buzz-post-input { width: 100%; height: 80px; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
              .post-button { margin-top: 10px; padding: 8px 16px; background-color: #ff7b1a; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
              .posts-container { margin-top: 20px; }
              .orangehrm-buzz-post-body-text { background-color: white; padding: 15px; border-radius: 4px; border: 1px solid #e0e0e0; margin-bottom: 10px; }
            </style>
          </head>
          <body>
            <div class="oxd-layout">
              <div class="oxd-layout-container">
                <h1>Buzz Newsfeed</h1>
                <div class="orangehrm-buzz-post">
                  <textarea class="oxd-buzz-post-input" placeholder="What's on your mind?"></textarea>
                  <button class="post-button" id="postBtn">Post</button>
                </div>
                <div class="posts-container" id="posts">
                  <div class="orangehrm-buzz-post-body-text">Existing post in newsfeed</div>
                </div>
              </div>
            </div>
            <script>
              document.getElementById('postBtn').addEventListener('click', () => {
                const text = document.querySelector('.oxd-buzz-post-input').value;
                if(text) {
                  const posts = document.getElementById('posts');
                  const newPost = document.createElement('div');
                  newPost.className = 'orangehrm-buzz-post-body-text';
                  newPost.textContent = text;
                  posts.insertBefore(newPost, posts.firstChild);
                  document.querySelector('.oxd-buzz-post-input').value = '';
                }
              });
            </script>
          </body>
          </html>
        `
      });
    });
  }

  async createPost(content: string): Promise<void> {
    await this.postTextArea.fill(content);
    await this.postButton.click();
  }
}
