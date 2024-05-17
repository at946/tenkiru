import { expect, test } from '@playwright/test';
import createRoomId from '@pw/helpers/createRoomId';
import RoomPage from '@pw/models/room-page';

test('On the room page, users should be able to get the room ID.', async ({ page }) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage: RoomPage = new RoomPage(page);

  // When
  await roomPage.goto(roomId);

  // Then
  await expect(roomPage.roomIdLink).toHaveText(`Room ID:${roomId}`);
});

// test('ルームページで、ルームIDを選択したとき、URLをクリップボードにコピーできること', async ({ context }) => {
//   // Given
//   await context.grantPermissions(['clipboard-read']);
//   const page: Page = await context.newPage();
//   const roomId: string = createRoomId();
//   const roomPage: RoomPage = new RoomPage(page);
//   await roomPage.goto(roomId);

//   // When
//   await roomPage.copyRoomUrl();

//   // Then
//   // await expect(page.getByText('Copied this Room URL')).toBeVisible();
//   const clipboardText: string = await page.evaluate('navigator.clipboard.readText()');
//   // await expect(clipboardText).toBe(`http://localhost:3000/rooms/${roomId}`);
// });
