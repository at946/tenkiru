import { test, expect } from '@playwright/test';
import urls from '../../helpers/urls';

test('トップページで、ヘッダーのコーヒーアイコンを選択したとき、buymeacoffeeのページへ遷移すること', async ({
  page,
}) => {
  await page.goto(urls.top);
  const buymeacoffeeLink = page.locator('data-testid=buymeacoffee');
  await expect(buymeacoffeeLink).toHaveAttribute('href', 'https://www.buymeacoffee.com/at946');
  await expect(buymeacoffeeLink).toHaveAttribute('target', '_blank');
});

test('ルームページで、ヘッダーのコーヒーアイコンを選択したとき、buymeacoffeeのページへ遷移すること', async ({
  page,
}) => {
  await page.goto(urls.room());
  const buymeacoffeeLink = page.locator('data-testid=buymeacoffee');
  await expect(buymeacoffeeLink).toHaveAttribute('href', 'https://www.buymeacoffee.com/at946');
  await expect(buymeacoffeeLink).toHaveAttribute('target', '_blank');
});
