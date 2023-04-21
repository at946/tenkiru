import { expect, Locator, Page } from '@playwright/test';
import Footer from './footer';
import urls from '../helpers/urls';
import Header from './header';

export default class TOSPage {
  readonly page: Page;

  readonly header: Header;
  readonly footer: Footer;

  constructor(page: Page) {
    this.page = page;

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
