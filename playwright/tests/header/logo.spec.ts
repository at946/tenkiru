import { test, expect } from '@playwright/test';
import urls from '../../helpers/urls';
import usersJoinRoom from '../../helpers/usersJoinRoom';

test('トップページで、ヘッダーのサービス名を選択したとき、どこにも遷移しないこと', async ({
  page,
}) => {
  await page.goto(urls.top);
  await expect(page).toHaveURL(urls.top);
  await page.click('[data-testid="logo"]');
  await expect(page).toHaveURL(urls.top);
});

test('ルームページで、ヘッダーのサービス名を選択したとき、トップページへ遷移すること', async ({
  context,
}) => {
  const roomURL = urls.room();
  const [page] = await usersJoinRoom(context, roomURL, 1);
  await expect(page).toHaveURL(roomURL);
  await page.click('[data-testid="logo"]');
  await expect(page).toHaveURL(urls.top);
});
