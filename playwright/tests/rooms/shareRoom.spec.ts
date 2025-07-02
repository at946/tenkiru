import { expect, type Page, test } from '@playwright/test';
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

test('On the room page, when a user clicks the room ID, their clipboard should have copied the URL of this room.', async ({
  context,
}) => {
  // Given
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const roomId: string = createRoomId();
  const page: Page = await context.newPage();
  const roomPage: RoomPage = new RoomPage(page);
  await roomPage.goto(roomId);

  // When
  await roomPage.copyRoomUrl();
  await page.mouse.move(0, 0);

  // Then
  await expect(roomPage.ToastToNotifyToHaveCopiedThisRoomURL).toBeVisible();
  const clipboardText: string = await page.evaluate('navigator.clipboard.readText()');
  await expect(clipboardText).toBe(`http://localhost:3000/rooms/${roomId}`);
  await expect(roomPage.ToastToNotifyToHaveCopiedThisRoomURL).not.toBeVisible({ timeout: 7500 });
});
