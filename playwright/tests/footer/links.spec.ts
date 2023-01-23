import { test, expect } from '@playwright/test';
import urls from '../../helpers/urls';

test('トップページで、フッターのコピーライトを選択したとき、開発者のTwitterプロフィールページへ遷移すること', async ({ page }) => {
  await page.goto(urls.top)
  const copyright = page.locator('data-testid=copyright')
  await expect(copyright).toHaveText('@asato')
  await expect(copyright).toHaveAttribute('href', 'https://twitter.com/at_946')
  await expect(copyright).toHaveAttribute('target', '_blank')
});

test('トップページで、フッターの利用規約を選択したとき、利用規約ページへ遷移すること', async ({ page }) => {
  await page.goto(urls.top)
  await expect(page).toHaveURL(urls.top)
  await page.locator('data-testid=link_to_tos').click()
  await expect(page).toHaveURL(urls.tos)
});

test('トップページで、フッターのプライバシーポリシーを選択したとき、プライバシーポリシーページへ遷移すること', async ({ page }) => {
  await page.goto(urls.top)
  await expect(page).toHaveURL(urls.top)
  await page.locator('data-testid=link_to_pp').click()
  await expect(page).toHaveURL(urls.pp)
});

test('トップページで、フッターのお問い合わせを選択したとき、開発者のTwitterプロフィールページへ遷移すること', async ({ page }) => {
  await page.goto(urls.top)
  const copyright = page.locator('data-testid=link_to_inquiry')
  await expect(copyright).toHaveAttribute('href', 'https://twitter.com/at_946')
  await expect(copyright).toHaveAttribute('target', '_blank')
});
