import { expect, Locator, Page } from '@playwright/test';
import Head from './common/head';
import Header from './common/header';
import Footer from './common/footer';
import urls from '../helpers/urls';

export default class TOSPage {
  readonly page: Page;

  readonly head: Head;
  readonly header: Header;
  readonly footer: Footer;

  constructor(page: Page) {
    this.page = page;

    this.head = new Head(page);
    this.header = new Header(page);
    this.footer = new Footer(page);
  }

  async goto() {
    await this.page.goto(urls.tos);
  }

  async clickHeaderLogo() {
    await this.header.clickLogo();
  }

  async clickFooterTOSLink() {
    await this.footer.clickTOSLink();
  }

  async clickFooterPPLink() {
    await this.footer.clickPPLink();
  }
}
