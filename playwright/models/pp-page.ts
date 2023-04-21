import { expect, Locator, Page } from '@playwright/test';
import Footer from './footer';
import urls from '../helpers/urls';

export default class PPPage {
  readonly page: Page;

  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;

    this.footer = new Footer(page);
  }

  async goto() {
    await this.page.goto(urls.pp);
  }

  async gotoTOS() {
    await this.footer.gotoTOS();
  }
}
