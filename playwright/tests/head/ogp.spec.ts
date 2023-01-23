import { test, expect } from '@playwright/test';
import urls from '../../helpers/urls';

const title: string = 'Tenkir';

test('トップページで、OGが正しいこと', async ({ page }) => {
  const description: string = 'Tenkir（テンキル）はオンラインプランニングポーカーツールです。チームメンバーでわいわい使ってね。';

  await page.goto(urls.top)
  await expect(page).toHaveTitle(title)
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', description)
  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute('content', title)
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website')
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', 'http://localhost:3000')
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', title)
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', description)
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'http://localhost:3000/ogp.jpg')
  await expect(page.locator('meta[property="twitter:card"]')).toHaveAttribute('content', 'summary')
});

test('ルームページで、OGが正しいこと', async ({ page }) => {
  const description = 'プランニングポーカーやろ〜。Tenkirに集合〜🙌';

  await page.goto(urls.room())
  await expect(page).toHaveTitle(title)
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', description)
  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute('content', title)
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website')
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', 'http://localhost:3000')
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', title)
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', description)
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'http://localhost:3000/ogp.jpg')
  await expect(page.locator('meta[property="twitter:card"]')).toHaveAttribute('content', 'summary')
});
