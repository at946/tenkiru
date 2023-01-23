import { test, expect } from '@playwright/test';
import urls from '../../helpers/urls';

test('トップページで、「Create a room」ボタンを選択したとき、ランダムのルームページが作成され遷移すること', async ({
  page,
}) => {
  await page.goto(urls.top);
  await page.locator('data-testid=createRoomButton').click();
  await expect(page).toHaveURL(/http:\/\/.*\/rooms\/.*/);
});
