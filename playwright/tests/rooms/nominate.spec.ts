import { test, expect } from '@playwright/test';
import urls from '../../helpers/urls';
import usersJoinRoom from '../../helpers/usersJoinRoom';

test('ルームページで、カードをオープンしていないとき、「指名」ボタンが表示されないこと', async ({ context }) => {
  // Given - ルームページでカードをオープンしていない
  const [page1, page2] = await usersJoinRoom(context, urls.room(), 2)
  await page1.getByTestId('tefudaCard').nth(0).click()

  // When - 特になし

  // Then - 「指名」ボタンがTableCardsに表示されていない
  await expect(page1.getByTestId('nominateButton')).not.toBeVisible()
  await expect(page2.getByTestId('nominateButton')).not.toBeVisible()
})