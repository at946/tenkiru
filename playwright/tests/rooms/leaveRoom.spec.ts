import { test, expect } from '@playwright/test';
import urls from '../../helpers/urls';
import usersJoinRoom from '../../helpers/usersJoinRoom';

test('ルームページで、別のページに遷移したとき、ルームから抜け出すこと', async ({
  page,
  browser,
}) => {
  const roomURL = urls.room();
  const [page2] = await usersJoinRoom(page, roomURL, browser, 1);

  // ルームには2カードある
  await expect(page.locator('data-testid=tableCard')).toHaveCount(2);

  await page2.goto(urls.top);

  // ルームには1カードだけ残っている
  await expect(page.locator('data-testid=tableCard')).toHaveCount(1);
});

test('ルームページで、ブラウザを閉じたとき、ルームから抜け出すこと', async ({ page, browser }) => {
  const roomURL = urls.room();
  const [page2] = await usersJoinRoom(page, roomURL, browser, 1);

  // ルームには2カードある
  await expect(page.locator('data-testid=tableCard')).toHaveCount(2);

  await page2.close();

  // ルームには1カードだけ残っている
  await expect(page.locator('data-testid=tableCard')).toHaveCount(1);
});
