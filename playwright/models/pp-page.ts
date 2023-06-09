import { expect, Locator, Page } from '@playwright/test';
import Head from './common/head';
import urls from '../helpers/urls';

export default class PPPage {
  readonly page: Page;

  readonly head: Head;

  constructor(page: Page) {
    this.page = page;

    this.head = new Head(page);
  }

  async goto() {
    await this.page.goto(urls.pp);
  }
}
