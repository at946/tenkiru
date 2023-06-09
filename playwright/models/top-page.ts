import { Locator, Page } from '@playwright/test';
import Head from './common/head';
import urls from '../helpers/urls';

export default class TopPage {
  readonly page: Page;
  readonly createRoomButton: Locator;

  readonly head: Head;

  constructor(page: Page) {
    this.page = page;
    this.createRoomButton = page.getByRole('button', { name: '部屋をつくる' });

    this.head = new Head(page);
  }

  async goto() {
    await this.page.goto(urls.top);
  }

  async createRoom() {
    await this.createRoomButton.click();
  }
}
