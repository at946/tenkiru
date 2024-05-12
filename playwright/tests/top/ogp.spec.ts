import test, { expect } from '@playwright/test';
import contents from '@pw/helpers/defaultOgContents';
import urls from '@pw/helpers/urls';
import Head from '@pw/models/common/head';

test('OG contents must be default values', async ({ page }) => {
  // Given
  const head: Head = new Head(page);
  await page.goto(urls.top);

  // When

  // Then
  await expect(page).toHaveTitle(contents.title);
  await expect(head.description).toHaveAttribute('content', contents.description);
  await expect(head.ogSiteName).toHaveAttribute('content', contents.title);
  await expect(head.ogType).toHaveAttribute('content', 'website');
  await expect(head.ogTitle).toHaveAttribute('content', contents.title);
  await expect(head.ogDescription).toHaveAttribute('content', contents.description);
  await expect(head.ogImage).toHaveAttribute('content', contents.ogImageUrl);
  await expect(head.twitterCard).toHaveAttribute('content', 'summary');
});
