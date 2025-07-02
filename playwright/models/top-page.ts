import { expect, type Locator, type Page } from '@playwright/test';
import urls from '../helpers/urls';

export default class TopPage {
  readonly page: Page;
  readonly createRoomButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createRoomButton = page.getByRole('button', { name: 'Create a room' });

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
    await this.page.goto(urls.top);
  }

  async createRoom() {
    await this.createRoomButton.click();
  }
}
