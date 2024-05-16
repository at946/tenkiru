import { expect, test } from '@playwright/test';
import createRoomId from '@pw/helpers/createRoomId';
import RoomPage from '@pw/models/room-page';

test('On the room page, when nobody place a card on the table, users should not be able to select the open button.', async ({
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
  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.blankTableCards).toHaveCount(2);

  // When

  // Then
  await expect(roomPage1.openButton).toBeDisabled();
  await expect(roomPage2.openButton).toBeDisabled();
});

test('On the room page, when someone placed their cards and a user selects the open button, cards should become face up.', async ({
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
  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.blankTableCards).toHaveCount(1);
  await expect(roomPage2.faceDownTableCards).toHaveCount(1);

  // When
  await roomPage1.openCards();

  // Then
  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.blankTableCards).toHaveCount(1);
  await expect(roomPage1.faceUpTableCards).toHaveCount(1);
  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.blankTableCards).toHaveCount(1);
  await expect(roomPage2.faceUpTableCards).toHaveCount(1);
});

test('On the room page, after cards became face up, users should not be able to change cards they placed.', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);
  await roomPage1.selectCard('0');

  await expect(roomPage1.disabledHandsCard).toHaveCount(0);
  await expect(roomPage1.selectedHandsCard).toHaveCount(1);

  await expect(roomPage2.disabledHandsCard).toHaveCount(0);
  await expect(roomPage2.selectedHandsCard).toHaveCount(0);

  // When
  await roomPage1.openCards();

  // Then
  await expect(roomPage1.disabledHandsCard).toHaveCount(await roomPage1.handsCards.count());
  await expect(roomPage1.selectedHandsCard).toHaveCount(1);

  await expect(roomPage2.disabledHandsCard).toHaveCount(await roomPage2.handsCards.count());
  await expect(roomPage2.selectedHandsCard).toHaveCount(0);
});

test('On the room page, after cards bocame face up, the open button should not appear.', async ({ context }) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);
  await roomPage1.selectCard('0');

  await expect(roomPage1.openButton).toBeVisible();
  await expect(roomPage2.openButton).toBeVisible();

  // When
  await roomPage1.openCards();

  // Then
  await expect(roomPage1.openButton).not.toBeVisible();
  await expect(roomPage2.openButton).not.toBeVisible();
});
