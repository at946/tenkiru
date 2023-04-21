import { Locator, Page } from '@playwright/test';
import Footer from './footer';
import urls from '../helpers/urls';

export default class RoomPage {
  readonly page: Page;

  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;

    this.footer = new Footer(page);
  }

  async goto(roomId: string) {
    await this.page.goto(urls.room(roomId));
  }

  async gotoTOS() {
    await this.footer.gotoTOS();
  }

  async gotoPP() {
    await this.footer.gotoPP();
  }
}
