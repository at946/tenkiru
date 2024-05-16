import { expect, test } from '@playwright/test';
import createRoomId from '@pw/helpers/createRoomId';
import RoomPage from '@pw/models/room-page';

test('On the room page, when a user selects the replay button, the table should be reset.', async ({ context }) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);
  await roomPage1.selectCard('0');
  await roomPage2.selectCard('1');
  await roomPage1.openCards();

  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.faceUpTableCards).toHaveCount(2);
  await expect(roomPage1.openButton).not.toBeVisible();
  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.faceUpTableCards).toHaveCount(2);
  await expect(roomPage2.openButton).not.toBeVisible();

  // When
  await roomPage1.replay();

  // Then
  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.blankTableCards).toHaveCount(2);
  await expect(roomPage1.openButton).toBeVisible();
  await expect(roomPage1.openButton).toBeDisabled();
  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.blankTableCards).toHaveCount(2);
  await expect(roomPage2.openButton).toBeVisible();
  await expect(roomPage2.openButton).toBeDisabled();

  // When - A user should be able to select a card after the table is reset
  await roomPage1.selectCard('3');

  // Then
  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.faceDownTableCards).toHaveCount(1);
  await expect(roomPage1.blankTableCards).toHaveCount(1);
  await expect(roomPage1.openButton).toBeVisible();
  await expect(roomPage1.openButton).not.toBeDisabled();
  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.faceDownTableCards).toHaveCount(1);
  await expect(roomPage2.blankTableCards).toHaveCount(1);
  await expect(roomPage2.openButton).toBeVisible();
  await expect(roomPage2.openButton).not.toBeDisabled();
});
