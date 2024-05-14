import test, { expect } from '@playwright/test';
import createRoomId from '@pw/helpers/createRoomId';
import RoomPage from '@pw/models/room-page';

/**
 * When players enter a room where cards are faced down, cards must keep the situation
 * When players enter a room where cards are faced up, cards must keep the situation
 */

test('When players enter a room where cards are faced down, cards must keep the situation', async ({ context }) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage1.selectCard('0');
  await expect(roomPage1.tableCards).toHaveCount(1);
  await expect(roomPage1.faceDownTableCards).toHaveCount(1);
  await expect(roomPage1.openButton).toBeVisible();
  await expect(roomPage1.replayButton).not.toBeVisible();

  // When
  await roomPage2.goto(roomId);

  // Then
  for (const page of [roomPage1, roomPage2]) {
    await expect(roomPage1.tableCards).toHaveCount(2);
    await expect(roomPage1.faceDownTableCards).toHaveCount(1);
    await expect(roomPage1.blankTableCards).toHaveCount(1);
    await expect(roomPage1.openButton).toBeVisible();
    await expect(roomPage1.replayButton).not.toBeVisible();
  }
});

test('When players enter a room where cards are faced up, cards must keep the situation', async ({ context }) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage1.selectCard('0');
  await roomPage1.openCards();
  await expect(roomPage1.tableCards).toHaveCount(1);
  await expect(roomPage1.faceUpTableCards).toHaveCount(1);
  await expect(roomPage1.openButton).not.toBeVisible();
  await expect(roomPage1.replayButton).toBeVisible();

  // When
  await roomPage2.goto(roomId);

  // Then
  for (const page of [roomPage1, roomPage2]) {
    await expect(page.tableCards).toHaveCount(2);
    await expect(page.faceUpTableCards).toHaveCount(1);
    await expect(page.blankTableCards).toHaveCount(1);
    await expect(page.openButton).not.toBeVisible();
    await expect(page.replayButton).toBeVisible();
  }
});
