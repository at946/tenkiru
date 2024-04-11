import { Locator, Page } from '@playwright/test';
import urls from '../helpers/urls';
import Head from './common/head';

export default class TopPage {
  readonly page: Page;
  readonly createRoomButton: Locator;

  readonly head: Head;

  constructor(page: Page) {
    this.page = page;
    this.createRoomButton = page.getByRole('button', { name: 'Create a room' });

    this.head = new Head(page);
  }

  async goto() {
    await this.page.goto(urls.top);
  }

  async createRoom() {
    await this.createRoomButton.click();
  }
}
