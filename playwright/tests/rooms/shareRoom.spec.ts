import { test, expect } from '@playwright/test';
import urls from '../../helpers/urls';
import usersJoinRoom from '../../helpers/usersJoinRoom';

test('ルームページで、ルームIDを知れること', async ({ context }) => {
  const [page] = await usersJoinRoom(context, 'rooms/sampleroom', 1);

  await expect(page.locator('data-testid=roomId')).toHaveText('sampleroom');
});

// test('ルームページで、ルームIDを選択したとき、URLをクリップボードにコピーできること', async ({ page }) => {
//   // TODO: https://github.com/puppeteer/puppeteer/issues/8692 に進展あったらやるかもね
//   // await browser.defaultBrowserContext().overridePermissions('http://gateway.docker.internal', ['clipboard-read'])
//   // expect(await page1.evaluate(() => navigator.clipboard.readText())).toBe('')
//   // const page1 = await browser.newPage()
//   // await page1.goto(roomUrl)
//   // await page1.click('[data-testid="roomId"]')
//   // expect(await page1.evaluate(() => navigator.clipboard.readText())).toBe(roomUrl)
//   // const otherRoomUrl = urls.room()
//   // await page2 = await browser.newPage()
//   // await page2.goto(otherRoomUrl)
//   // await page2.click('[data-testid="roomIdShareIcon"]')
//   // expect(await page2.evaluate(() => navigator.clipboard.readText())).toBe(otherRoomUrl)
// });

test('シェアされたルームページのURLに直接アクセスしたとき、ルームに入れること', async ({
  page,
}) => {
  const roomURL1 = urls.room();
  const roomURL2 = urls.room();
  const tableCards = page.locator('data-testid=tableCard');
  const roomId = page.locator('data-testid=roomId');

  await page.goto('/rooms/room1');
  await expect(tableCards).toHaveCount(1);
  await expect(page).toHaveURL('/rooms/room1');
  await expect(roomId).toHaveText('room1');

  await page.goto('/rooms/room2');
  await expect(tableCards).toHaveCount(1);
  await expect(page).toHaveURL('/rooms/room2');
  await expect(roomId).toHaveText('room2');
});
