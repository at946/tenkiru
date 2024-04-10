import { expect, test } from '@playwright/test';
import createRoomId from '../../helpers/createRoomId';
import RoomPage from '../../models/room-page';

test('ルームページで、部屋番号を知れること', async ({ page }) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage: RoomPage = new RoomPage(page);

  // When
  await roomPage.goto(roomId);

  // Then
  await expect(roomPage.roomIdLink).toHaveText(`Room ID:${roomId}`);
});

// test('ルームページで、ルームIDを選択したとき、URLをクリップボードにコピーできること', async ({
//   context,
// }) => {
//   // Given
//   await context.grantPermissions(['clipboard-write', 'clipboard-read']);
//   const page: Page = await context.newPage();
//   const roomId: string = createRoomId();
//   const roomPage: RoomPage = new RoomPage(page);
//   await roomPage.goto(roomId);

//   // When
//   await roomPage.copyRoomUrl();

//   // Then
//   await expect(page.getByText('クリップボードにこの部屋のURLをコピーしました。')).toBeVisible();
//   const clipboardText: string = await page.evaluate('navigator.clipboard.read()');
//   await expect(clipboardText).toBe(`http://localhost:3000/rooms/${roomId}`);
// });
