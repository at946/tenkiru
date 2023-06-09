import { Locator, Page } from '@playwright/test';
import Head from './common/head';
import Header from './common/header';
import urls from '../helpers/urls';

export default class TopPage {
  readonly page: Page;
  readonly createRoomButton: Locator;

  readonly head: Head;
  readonly header: Header;

  constructor(page: Page) {
    this.page = page;
    this.createRoomButton = page.getByRole('button', { name: '部屋をつくる' });

    this.head = new Head(page);
    this.header = new Header(page);
  }

  async goto() {
    await this.page.goto(urls.top);
  }

  async createRoom() {
    await this.createRoomButton.click();
  }

  async clickHeaderLogo() {
    await this.header.clickLogo();
  }
}
