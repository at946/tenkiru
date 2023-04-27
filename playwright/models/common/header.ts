import { Locator, Page } from '@playwright/test';

export default class Header {
  readonly header: Locator;
  readonly logo: Locator;
  readonly supportLink: Locator;

  constructor(page: Page) {
    this.header = page.getByRole('navigation');
    this.logo = this.header.getByRole('link', { name: 'Tenkir' });
    this.supportLink = this.header.getByRole('link', { name: '開発者を支援' });
  }

  async clickLogo() {
    await this.logo.click();
  }
}
