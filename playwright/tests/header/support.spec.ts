import { test, expect } from '@playwright/test';
import urls from '../../helpers/urls';
import usersJoinRoom from '../../helpers/usersJoinRoom';

test('トップページで、ヘッダーのサポートアイコンを選択したとき、noteのページへ遷移すること', async ({
  page,
}) => {
  await page.goto(urls.top);
  const supportLink = page.locator('data-testid=support');
  await expect(supportLink).toHaveAttribute('href', 'https://note.com/_at_946/n/nb84babf02d87');
  await expect(supportLink).toHaveAttribute('target', '_blank');
});

test('ルームページで、ヘッダーのサポートアイコンを選択したとき、noteのページへ遷移すること', async ({
  context,
}) => {
  const [page] = await usersJoinRoom(context, urls.room(), 1);
  const supportLink = page.locator('data-testid=support');
  await expect(supportLink).toHaveAttribute('href', 'https://note.com/_at_946/n/nb84babf02d87');
  await expect(supportLink).toHaveAttribute('target', '_blank');
});
