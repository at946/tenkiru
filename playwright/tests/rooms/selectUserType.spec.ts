import { expect, test } from '@playwright/test';
import createRoomId from '@pw/helpers/createRoomId';
import RoomPage from '@pw/models/room-page';

test('On the room page, users should enter the room as players by default.', async ({ page }) => {
  // Given
  const roomPage: RoomPage = new RoomPage(page);

  // When
  await roomPage.goto(createRoomId());

  // Then
  await expect(await roomPage.getUserType('player')).toBeChecked();
});

test('On the room page, when a player who has not selected a card changes their user type to "audience" before table cards are turned face up, they should not be able to select a card from their hand.', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);

  await expect(await roomPage1.getUserType('player')).toBeChecked();
  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.blankTableCards).toHaveCount(2);
  await expect(roomPage1.disabledHandsCard).toHaveCount(0);

  await expect(await roomPage2.getUserType('player')).toBeChecked();
  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.blankTableCards).toHaveCount(2);
  await expect(roomPage2.disabledHandsCard).toHaveCount(0);

  // When
  await roomPage1.selectUserType('audience');

  // Then
  await expect(await roomPage1.getUserType('audience')).toBeChecked();
  await expect(roomPage1.tableCards).toHaveCount(1);
  await expect(roomPage1.blankTableCards).toHaveCount(1);
  await expect(roomPage1.disabledHandsCard).toHaveCount(await roomPage1.handsCards.count());

  await expect(await roomPage2.getUserType('player')).toBeChecked();
  await expect(roomPage2.tableCards).toHaveCount(1);
  await expect(roomPage2.blankTableCards).toHaveCount(1);
  await expect(roomPage2.disabledHandsCard).toHaveCount(0);
});

test('On the room page, a player who has selected a card changes their user type to "audience" before cards are turned face up, their table card should disappear and they should be not able to select a card from their hand.', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);
  await roomPage1.selectCard('0');
  await roomPage2.selectCard('13');

  await expect(await roomPage1.getUserType('player')).toBeChecked();
  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.faceDownTableCards).toHaveCount(2);
  await expect(roomPage1.disabledHandsCard).toHaveCount(0);
  await expect(roomPage1.selectedHandsCard).toHaveCount(1);

  await expect(await roomPage2.getUserType('player')).toBeChecked();
  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.faceDownTableCards).toHaveCount(2);
  await expect(roomPage2.disabledHandsCard).toHaveCount(0);
  await expect(roomPage2.selectedHandsCard).toHaveCount(1);

  // When
  await roomPage1.selectUserType('audience');

  // Then
  await expect(await roomPage1.getUserType('audience')).toBeChecked();
  await expect(roomPage1.tableCards).toHaveCount(1);
  await expect(roomPage1.faceDownTableCards).toHaveCount(1);
  await expect(roomPage1.disabledHandsCard).toHaveCount(await roomPage1.handsCards.count());
  await expect(roomPage1.selectedHandsCard).toHaveCount(0);

  await expect(await roomPage2.getUserType('player')).toBeChecked();
  await expect(roomPage2.tableCards).toHaveCount(1);
  await expect(roomPage2.faceDownTableCards).toHaveCount(1);
  await expect(roomPage2.disabledHandsCard).toHaveCount(0);
  await expect(roomPage2.selectedHandsCard).toHaveCount(1);
});

test('On the room page, when a player who has not selected a card changes their user type to "audience" after table cards are turned face up, their table card storage place should disappear.', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);
  await roomPage2.selectCard('13');
  await roomPage1.openCards();

  await expect(await roomPage1.getUserType('player')).toBeChecked();
  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.blankTableCards).toHaveCount(1);
  await expect(roomPage1.faceUpTableCards).toHaveCount(1);
  await expect(roomPage1.disabledHandsCard).toHaveCount(await roomPage1.handsCards.count());
  await expect(roomPage1.selectedHandsCard).toHaveCount(0);

  await expect(await roomPage2.getUserType('player')).toBeChecked();
  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.blankTableCards).toHaveCount(1);
  await expect(roomPage2.faceUpTableCards).toHaveCount(1);
  await expect(roomPage2.disabledHandsCard).toHaveCount(await roomPage2.handsCards.count());
  await expect(roomPage2.selectedHandsCard).toHaveCount(1);

  // When
  await roomPage1.selectUserType('audience');

  // Then
  await expect(await roomPage1.getUserType('audience')).toBeChecked();
  await expect(roomPage1.tableCards).toHaveCount(1);
  await expect(roomPage1.faceUpTableCards).toHaveCount(1);
  await expect(roomPage1.disabledHandsCard).toHaveCount(await roomPage1.handsCards.count());
  await expect(roomPage1.selectedHandsCard).toHaveCount(0);

  await expect(await roomPage2.getUserType('player')).toBeChecked();
  await expect(roomPage2.tableCards).toHaveCount(1);
  await expect(roomPage2.faceUpTableCards).toHaveCount(1);
  await expect(roomPage2.disabledHandsCard).toHaveCount(await roomPage2.handsCards.count());
  await expect(roomPage2.selectedHandsCard).toHaveCount(1);
});

test('On the room page, a player who has selected a card changes their user type to "audience" after table cards are turned face up, their table card should disappear, their card selection should be cancelled and they should become not able to select a card from their hand.', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);
  await roomPage1.selectCard('0');
  await roomPage2.selectCard('13');
  await roomPage1.openCards();

  await expect(await roomPage1.getUserType('player')).toBeChecked();
  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.faceUpTableCards).toHaveCount(2);
  await expect(roomPage1.disabledHandsCard).toHaveCount(await roomPage1.handsCards.count());
  await expect(roomPage1.selectedHandsCard).toHaveCount(1);

  await expect(await roomPage2.getUserType('player')).toBeChecked();
  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.faceUpTableCards).toHaveCount(2);
  await expect(roomPage2.disabledHandsCard).toHaveCount(await roomPage2.handsCards.count());
  await expect(roomPage2.selectedHandsCard).toHaveCount(1);

  // When
  await roomPage1.selectUserType('audience');

  // Then
  await expect(await roomPage1.getUserType('audience')).toBeChecked();
  await expect(roomPage1.tableCards).toHaveCount(1);
  await expect(roomPage1.faceUpTableCards).toHaveCount(1);
  await expect(roomPage1.disabledHandsCard).toHaveCount(await roomPage1.handsCards.count());
  await expect(roomPage1.selectedHandsCard).toHaveCount(0);

  await expect(await roomPage2.getUserType('player')).toBeChecked();
  await expect(roomPage2.tableCards).toHaveCount(1);
  await expect(roomPage2.faceUpTableCards).toHaveCount(1);
  await expect(roomPage2.disabledHandsCard).toHaveCount(await roomPage2.handsCards.count());
  await expect(roomPage2.selectedHandsCard).toHaveCount(1);
});

test('On the room page, when an audience changes their user type to "player" before table cards are turned face up, the table card storage place for them should appear and they should become able to select a card from their hand.', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);
  await roomPage1.selectUserType('audience');
  await roomPage2.selectCard('5');

  await expect(await roomPage1.getUserType('audience')).toBeChecked();
  await expect(roomPage1.tableCards).toHaveCount(1);
  await expect(roomPage1.faceDownTableCards).toHaveCount(1);
  await expect(roomPage1.disabledHandsCard).toHaveCount(await roomPage1.handsCards.count());
  await expect(roomPage1.selectedHandsCard).toHaveCount(0);

  await expect(await roomPage2.getUserType('player')).toBeChecked();
  await expect(roomPage2.tableCards).toHaveCount(1);
  await expect(roomPage2.faceDownTableCards).toHaveCount(1);
  await expect(roomPage2.disabledHandsCard).toHaveCount(0);
  await expect(roomPage2.selectedHandsCard).toHaveCount(1);

  // When
  await roomPage1.selectUserType('player');

  // Then
  await expect(await roomPage1.getUserType('player')).toBeChecked();
  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.blankTableCards).toHaveCount(1);
  await expect(roomPage1.faceDownTableCards).toHaveCount(1);
  await expect(roomPage1.disabledHandsCard).toHaveCount(0);
  await expect(roomPage1.selectedHandsCard).toHaveCount(0);

  await expect(await roomPage2.getUserType('player')).toBeChecked();
  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.blankTableCards).toHaveCount(1);
  await expect(roomPage2.faceDownTableCards).toHaveCount(1);
  await expect(roomPage2.disabledHandsCard).toHaveCount(0);
  await expect(roomPage2.selectedHandsCard).toHaveCount(1);
});

test('On the room page, when an audience changes their user type to "player" after table cards are turned face up, their table card storage place should appear.', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);
  await roomPage1.selectUserType('audience');
  await roomPage2.selectCard('5');
  await roomPage1.openCards();

  await expect(await roomPage1.getUserType('audience')).toBeChecked();
  await expect(roomPage1.tableCards).toHaveCount(1);
  await expect(roomPage1.faceUpTableCards).toHaveCount(1);
  await expect(roomPage1.disabledHandsCard).toHaveCount(await roomPage1.handsCards.count());
  await expect(roomPage1.selectedHandsCard).toHaveCount(0);

  await expect(await roomPage2.getUserType('player')).toBeChecked();
  await expect(roomPage2.tableCards).toHaveCount(1);
  await expect(roomPage2.faceUpTableCards).toHaveCount(1);
  await expect(roomPage2.disabledHandsCard).toHaveCount(await roomPage2.handsCards.count());
  await expect(roomPage2.selectedHandsCard).toHaveCount(1);

  // When
  await roomPage1.selectUserType('player');

  // Then
  await expect(await roomPage1.getUserType('player')).toBeChecked();
  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.blankTableCards).toHaveCount(1);
  await expect(roomPage1.faceUpTableCards).toHaveCount(1);
  await expect(roomPage1.disabledHandsCard).toHaveCount(await roomPage1.handsCards.count());
  await expect(roomPage1.selectedHandsCard).toHaveCount(0);

  await expect(await roomPage2.getUserType('player')).toBeChecked();
  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.blankTableCards).toHaveCount(1);
  await expect(roomPage2.faceUpTableCards).toHaveCount(1);
  await expect(roomPage2.disabledHandsCard).toHaveCount(await roomPage2.handsCards.count());
  await expect(roomPage2.selectedHandsCard).toHaveCount(1);
});

test('On the room page, there should be no problems with players not being present', async ({ page }) => {
  // Given
  const roomPage: RoomPage = new RoomPage(page);
  await roomPage.goto(createRoomId());
  await roomPage.selectCard('1');

  await expect(await roomPage.getUserType('player')).toBeChecked();
  await expect(roomPage.tableCards).toHaveCount(1);
  await expect(roomPage.faceDownTableCards).toHaveCount(1);
  await expect(roomPage.disabledHandsCard).toHaveCount(0);
  await expect(roomPage.selectedHandsCard).toHaveCount(1);

  // When
  await roomPage.selectUserType('audience');

  // Then
  await expect(await roomPage.getUserType('audience')).toBeChecked();
  await expect(roomPage.tableCards).toHaveCount(0);
  await expect(roomPage.disabledHandsCard).toHaveCount(await roomPage.handsCards.count());
  await expect(roomPage.selectedHandsCard).toHaveCount(0);

  // When
  await roomPage.selectUserType('player');

  // Then
  await expect(await roomPage.getUserType('player')).toBeChecked();
  await expect(roomPage.tableCards).toHaveCount(1);
  await expect(roomPage.blankTableCards).toHaveCount(1);
  await expect(roomPage.disabledHandsCard).toHaveCount(0);
  await expect(roomPage.selectedHandsCard).toHaveCount(0);
});
