import { type Page, expect } from '@playwright/test';
import urls from '../helpers/urls';

export default class PPPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;

    const consoleErrorMessages: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') {
        consoleErrorMessages.push(message.text());
      }
    });
    page.on('close', async () => {
      await expect(consoleErrorMessages[0]).toBeUndefined();
    });
  }

  async goto() {
    await this.page.goto(urls.pp);
  }
}
