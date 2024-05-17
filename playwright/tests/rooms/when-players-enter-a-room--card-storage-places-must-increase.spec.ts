import { expect, test } from '@playwright/test';
import createRoomId from '@pw/helpers/createRoomId';
import RoomPage from '@pw/models/room-page';

test('When a user enters a room, the card storage place for the user must increase', async ({ context }) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await expect(roomPage1.tableCards).toHaveCount(1);

  // When
  await roomPage2.goto(roomId);

  // Then
  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage2.tableCards).toHaveCount(2);
});

test('When a user enters a room, other rooms should not be affected in any way', async ({ context }) => {
  // Given
  const roomId1: string = createRoomId();
  const roomId2: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId1);
  await expect(roomPage1.tableCards).toHaveCount(1);

  // When
  await roomPage2.goto(roomId2);

  // Then
  await expect(roomPage1.tableCards).toHaveCount(1);
  await expect(roomPage2.tableCards).toHaveCount(1);
});
