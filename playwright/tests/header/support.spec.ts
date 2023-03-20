import { test, expect } from '@playwright/test';
import urls from '../../helpers/urls';
import userJoinRoom from '../../helpers/userJoinRoom';

test('トップページで、ヘッダーのサポートアイコンを選択したとき、noteのページへ遷移すること', async ({
  page,
}) => {
  await page.goto(urls.top);
  const buymeacoffeeLink = page.locator('data-testid=support');
  await expect(buymeacoffeeLink).toHaveAttribute(
    'href',
    'https://note.com/_at_946/n/nb84babf02d87',
  );
  await expect(buymeacoffeeLink).toHaveAttribute('target', '_blank');
});

test('ルームページで、ヘッダーのサポートアイコンを選択したとき、noteのページへ遷移すること', async ({
  page,
}) => {
  await userJoinRoom(page, urls.room());
  const buymeacoffeeLink = page.locator('data-testid=support');
  await expect(buymeacoffeeLink).toHaveAttribute(
    'href',
    'https://note.com/_at_946/n/nb84babf02d87',
  );
  await expect(buymeacoffeeLink).toHaveAttribute('target', '_blank');
});
