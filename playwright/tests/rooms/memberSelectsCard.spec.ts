import { test, expect } from '@playwright/test';
import urls from '../../helpers/urls';
import usersJoinRoom from '../../helpers/usersJoinRoom';

test('ルームページで、他のメンバーがカードを選択したとき、カードが場に伏せて置かれること', async ({ page, browser }) => {
  const roomURL = urls.room()
  const [page2] = await usersJoinRoom(page, roomURL, browser, 1)

  const tableCards = page.locator('data-testid=tableCard')
  await expect(tableCards).toHaveCount(2)
  await expect(tableCards.nth(0)).toHaveClass(/tableCard_blank/)
  await expect(tableCards.nth(1)).toHaveClass(/tableCard_blank/)

  await page2.locator('data-testid=tefudaCard').nth(0).click()

  await expect(tableCards).toHaveCount(2)
  await expect(tableCards.nth(0)).toHaveClass(/tableCard_close/)
  await expect(tableCards.nth(1)).toHaveClass(/tableCard_blank/)
})