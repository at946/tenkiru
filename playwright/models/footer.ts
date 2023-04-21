import { Locator, Page } from '@playwright/test';

export default class Footer {
  readonly footer: Locator;
  readonly tosLink: Locator;
  readonly ppLink: Locator;
  readonly inquiryLink: Locator;
  readonly copyright: Locator;

  constructor(page: Page) {
    this.footer = page.getByRole('contentinfo');
    this.tosLink = this.footer.getByRole('link', { name: '利用規約' });
    this.ppLink = this.footer.getByRole('link', { name: 'プライバシーポリシー' });
    this.inquiryLink = this.footer.getByRole('link', { name: 'お問い合わせ' });
    this.copyright = this.footer.getByRole('link', { name: '@asato' });
  }

  async gotoTOS() {
    await this.tosLink.click();
  }

  async gotoPP() {
    await this.ppLink.click();
  }
}
