import { test, expect } from '@playwright/test';
import urls from '../../helpers/urls';
import usersJoinRoom from '../../helpers/usersJoinRoom';

test('ルームページで、別のページに遷移したとき、ルームから抜け出すこと', async ({ context }) => {
  const roomURL = urls.room();
  const [page1, page2] = await usersJoinRoom(context, roomURL, 2);

  await expect(page1.locator('data-testid=tableCard')).toHaveCount(2);

  await page2.click('data-testid=logo');

  await expect(page1.locator('data-testid=tableCard')).toHaveCount(1);
});

test('ルームページで、ブラウザを閉じたとき、ルームから抜け出すこと', async ({ context }) => {
  const roomURL = urls.room();
  const [page1, page2] = await usersJoinRoom(context, roomURL, 2);

  await expect(page1.locator('data-testid=tableCard')).toHaveCount(2);

  await page2.close();

  await expect(page1.locator('data-testid=tableCard')).toHaveCount(1);
});
