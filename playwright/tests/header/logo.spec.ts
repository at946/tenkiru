import { test, expect } from '@playwright/test';
import urls from '../../helpers/urls';
import userJoinRoom from '../../helpers/userJoinRoom';

test('トップページで、ヘッダーのサービス名を選択したとき、どこにも遷移しないこと', async ({
  page,
}) => {
  await page.goto(urls.top);
  await expect(page).toHaveURL(urls.top);
  await page.click('[data-testid="logo"]');
  await expect(page).toHaveURL(urls.top);
});

test('ルームページで、ヘッダーのサービス名を選択したとき、トップページへ遷移すること', async ({
  page,
}) => {
  const roomURL = urls.room();
  await userJoinRoom(page, roomURL)
  await expect(page).toHaveURL(roomURL);
  await page.click('[data-testid="logo"]');
  await expect(page).toHaveURL(urls.top);
});
