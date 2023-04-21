import { Locator, Page } from '@playwright/test';
import Footer from './footer';
import urls from '../helpers/urls';

export default class TopPage {
  readonly page: Page;
  readonly createRoomButton: Locator;

  readonly footer: Footer;

  constructor(page: Page) {
    this.page = page;
    this.createRoomButton = page.getByRole('link', { name: '部屋をつくる' });

    this.footer = new Footer(page);
  }

  async goto() {
    await this.page.goto(urls.top);
  }

  async createRoom() {
    await this.createRoomButton.click();
  }

  async gotoTOS() {
    await this.footer.gotoTOS();
  }

  async gotoPP() {
    await this.footer.gotoPP();
  }
}
