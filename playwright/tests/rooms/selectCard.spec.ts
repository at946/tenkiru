import { expect, test } from '@playwright/test';
import createRoomId from '@pw/helpers/createRoomId';
import RoomPage from '@pw/models/room-page';

test('When a player selects a card, the card should become selected and be placed face down on the table.', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);

  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.blankTableCards).toHaveCount(2);
  await expect(roomPage1.selectedHandsCard).toHaveCount(0);

  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.blankTableCards).toHaveCount(2);
  await expect(roomPage2.selectedHandsCard).toHaveCount(0);

  // When
  await roomPage1.selectCard('0');

  // Then
  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.blankTableCards).toHaveCount(1);
  await expect(roomPage1.faceDownTableCards).toHaveCount(1);
  await expect(roomPage1.selectedHandsCard).toHaveCount(1);
  await expect(roomPage1.selectedHandsCard).toHaveText(/^0$/);

  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.blankTableCards).toHaveCount(1);
  await expect(roomPage2.faceDownTableCards).toHaveCount(1);
  await expect(roomPage2.selectedHandsCard).toHaveCount(0);
});

test('When a player selects the selected card again, the card should become unselected.', async ({ context }) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);
  await roomPage1.selectCard('0');

  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.blankTableCards).toHaveCount(1);
  await expect(roomPage1.faceDownTableCards).toHaveCount(1);
  await expect(roomPage1.selectedHandsCard).toHaveCount(1);
  await expect(roomPage1.selectedHandsCard).toHaveText(/^0$/);

  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.blankTableCards).toHaveCount(1);
  await expect(roomPage2.faceDownTableCards).toHaveCount(1);
  await expect(roomPage2.selectedHandsCard).toHaveCount(0);

  // When
  await roomPage1.selectCard('0');

  // Then
  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.blankTableCards).toHaveCount(2);
  await expect(roomPage1.selectedHandsCard).toHaveCount(0);

  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.blankTableCards).toHaveCount(2);
  await expect(roomPage2.selectedHandsCard).toHaveCount(0);
});

test('When a player selects another card rather than the present selected card, the selected card at the this time should become selected and the previous selected card should become unselected.', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);
  await roomPage1.selectCard('0');

  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.blankTableCards).toHaveCount(1);
  await expect(roomPage1.faceDownTableCards).toHaveCount(1);
  await expect(roomPage1.selectedHandsCard).toHaveCount(1);
  await expect(roomPage1.selectedHandsCard).toHaveText(/^0$/);

  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.blankTableCards).toHaveCount(1);
  await expect(roomPage2.faceDownTableCards).toHaveCount(1);
  await expect(roomPage2.selectedHandsCard).toHaveCount(0);

  // When
  await roomPage1.selectCard('1');

  // Then
  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.blankTableCards).toHaveCount(1);
  await expect(roomPage1.faceDownTableCards).toHaveCount(1);
  await expect(roomPage1.selectedHandsCard).toHaveCount(1);
  await expect(roomPage1.selectedHandsCard).toHaveText(/^1$/);

  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.blankTableCards).toHaveCount(1);
  await expect(roomPage2.faceDownTableCards).toHaveCount(1);
  await expect(roomPage2.selectedHandsCard).toHaveCount(0);
});
