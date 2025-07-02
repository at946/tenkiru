import { expect, type Page, test } from '@playwright/test';
import createRoomId from '@pw/helpers/createRoomId';
import RoomPage from '@pw/models/room-page';

test('When a player leaves the room page, the card storage place should decrease', async ({ context }) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);
  await expect(roomPage1.tableCards).toHaveCount(2);

  // When
  await roomPage2.clickHeaderLogo();

  // Then
  await expect(roomPage1.tableCards).toHaveCount(1);
});

test('When a player close the tab in the room page, the card storage place should decrease', async ({ context }) => {
  // Given
  const roomId: string = createRoomId();
  const page1: Page = await context.newPage();
  const page2: Page = await context.newPage();
  const roomPage1: RoomPage = new RoomPage(page1);
  const roomPage2: RoomPage = new RoomPage(page2);
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);
  await expect(roomPage1.tableCards).toHaveCount(2);

  // When
  await page2.close();

  // Then
  await expect(roomPage1.tableCards).toHaveCount(1);
});
