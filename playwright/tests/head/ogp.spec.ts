import { test, expect } from '@playwright/test';
import urls from '../../helpers/urls';

const title: string = 'Tenkir';
const description: string =
  'Tenkirは無料のオンラインプランニングポーカーアプリです。' +
  'XPやスクラムなどのアジャイルなプロジェクト管理に最適です。' +
  'チームでの見積もりをリアルタイムで共有できます。' +
  '参加者はスマートフォンやパソコンのブラウザだけで参加できます。' +
  '直感的なUIと使いやすさが魅力です。';

test('トップページで、OGが正しいこと', async ({ page }) => {
  await page.goto(urls.top);
  await expect(page).toHaveTitle(title);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', description);
  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute('content', title);
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    'content',
    'http://localhost:3000',
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', title);
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    'content',
    description,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    'http://localhost:3000/ogp.jpg',
  );
  await expect(page.locator('meta[property="twitter:card"]')).toHaveAttribute('content', 'summary');
});

test('ルームページで、OGが正しいこと', async ({ page }) => {
  await page.goto(urls.room());
  await expect(page).toHaveTitle(title);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', description);
  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute('content', title);
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    'content',
    'http://localhost:3000',
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', title);
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    'content',
    description,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    'http://localhost:3000/ogp.jpg',
  );
  await expect(page.locator('meta[property="twitter:card"]')).toHaveAttribute('content', 'summary');
});
