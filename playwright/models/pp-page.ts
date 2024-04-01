import { Page } from '@playwright/test';
import urls from '../helpers/urls';
import Head from './common/head';

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
