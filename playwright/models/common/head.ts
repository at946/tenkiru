import type { Locator, Page } from '@playwright/test';

export default class Head {
  readonly description: Locator;
  readonly ogSiteName: Locator;
  readonly ogType: Locator;
  readonly ogUrl: Locator;
  readonly ogTitle: Locator;
  readonly ogDescription: Locator;
  readonly ogImage: Locator;
  readonly twitterCard: Locator;

  constructor(page: Page) {
    this.description = page.locator('meta[name="description"]');
    this.ogSiteName = page.locator('meta[property="og:site_name"]');
    this.ogType = page.locator('meta[property="og:type"]');
    this.ogUrl = page.locator('meta[property="og:url"]');
    this.ogTitle = page.locator('meta[property="og:title"]');
    this.ogDescription = page.locator('meta[property="og:description"]');
    this.ogImage = page.locator('meta[property="og:image"]');
    this.twitterCard = page.locator('meta[name="twitter:card"]');
  }
}
