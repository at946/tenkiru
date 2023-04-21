import { Locator, Page } from '@playwright/test';
import Footer from './footer';
import urls from '../helpers/urls';
import Header from './header';

export default class RoomPage {
  readonly page: Page;

  readonly header: Header;
  readonly footer: Footer;

  constructor(page: Page) {
    this.page = page;

    this.header = new Header(page);
    this.footer = new Footer(page);
  }

  async goto(roomId: string) {
    await this.page.goto(urls.room(roomId));
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
