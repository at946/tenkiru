import { type Page, expect } from '@playwright/test';
import urls from '../helpers/urls';
import Head from './common/head';

export default class TOSPage {
  readonly page: Page;

  readonly head: Head;

  constructor(page: Page) {
    this.page = page;

    this.head = new Head(page);

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
    await this.page.goto(urls.tos);
  }
}
