import { expect, test } from '@playwright/test';
import createRoomId from '@pw/helpers/createRoomId';
import RoomPage from '@pw/models/room-page';

test('On the room page, the fibonacci deck should be selected by default.', async ({ page }) => {
  // Given
  const fibonacciDeck: string[] = ['0', '1', '2', '3', '5', '8', '13', '21', '?'];
  const roomPage: RoomPage = new RoomPage(page);

  // When
  await roomPage.goto(createRoomId());

  // Then
  await expect(roomPage.deckSelect).toHaveValue('fibonacci');
  await expect(roomPage.handsCards).toHaveCount(fibonacciDeck.length);
  (await roomPage.handsCards.all()).forEach(async (handsCard, index) => {
    await expect(handsCard).toHaveValue(fibonacciDeck[index]);
  });
});

test('On the room page, when the deck type is changed, the selected card should revert to unselected.', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);
  await roomPage1.selectCard('0');
  await roomPage2.selectCard('1');

  await expect(roomPage1.selectedHandsCard).toHaveCount(1);
  await expect(roomPage1.selectedHandsCard).toHaveValue('0');
  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.faceDownTableCards).toHaveCount(2);

  await expect(roomPage2.selectedHandsCard).toHaveCount(1);
  await expect(roomPage2.selectedHandsCard).toHaveValue('1');
  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.faceDownTableCards).toHaveCount(2);

  // When
  await roomPage1.selectDeck('sequential');

  // Then
  await expect(roomPage1.selectedHandsCard).toHaveCount(0);
  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.blankTableCards).toHaveCount(2);

  await expect(roomPage2.selectedHandsCard).toHaveCount(0);
  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.blankTableCards).toHaveCount(2);
});

test('On the room page, when cards are face up, users should not be able to change the deck type.', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  const roomPage3: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);
  await roomPage3.goto(roomId);
  await roomPage1.selectCard('0');
  await roomPage2.selectCard('1');
  await roomPage3.selectUserType('audience');

  await expect(roomPage1.deckSelect).not.toBeDisabled();
  await expect(roomPage2.deckSelect).not.toBeDisabled();
  await expect(roomPage3.deckSelect).not.toBeDisabled();

  // When
  await roomPage1.openCards();

  // Then
  await expect(roomPage1.deckSelect).toBeDisabled();
  await expect(roomPage2.deckSelect).toBeDisabled();
  await expect(roomPage3.deckSelect).toBeDisabled();

  // When - replay
  await roomPage1.replay();

  // Then - replayしたらまたデッキ選択できるようになる
  await expect(roomPage1.deckSelect).not.toBeDisabled();
  await expect(roomPage2.deckSelect).not.toBeDisabled();
  await expect(roomPage3.deckSelect).not.toBeDisabled();
});

test("On the room page, when a user selects 'fibonacci' as the deck, the players' hand should be the value of the fibonacci sequence.", async ({
  context,
}) => {
  // Given
  const fibonacciDeck: string[] = ['0', '1', '2', '3', '5', '8', '13', '21', '?'];
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);
  await roomPage1.selectDeck('sequential');

  // When
  await roomPage1.selectDeck('fibonacci');

  // Then
  await expect(roomPage1.deckSelect).toHaveValue('fibonacci');
  await expect(roomPage1.handsCards).toHaveCount(fibonacciDeck.length);
  (await roomPage1.handsCards.all()).forEach(async (handsCard, index) => {
    await expect(handsCard).toHaveValue(fibonacciDeck[index]);
  });

  await expect(roomPage2.deckSelect).toHaveValue('fibonacci');
  await expect(roomPage2.handsCards).toHaveCount(fibonacciDeck.length);
  (await roomPage2.handsCards.all()).forEach(async (handsCard, index) => {
    await expect(handsCard).toHaveValue(fibonacciDeck[index]);
  });
});

test("On the room page, when a user selects '0-10' as the deck, the players' hand should be the value from 0 to 10.", async ({
  context,
}) => {
  // Given
  const sequentialDeck: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '?'];
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);

  // When
  await roomPage1.selectDeck('sequential');

  // Then
  await expect(roomPage1.deckSelect).toHaveValue('sequential');
  await expect(roomPage1.handsCards).toHaveCount(sequentialDeck.length);
  (await roomPage1.handsCards.all()).forEach(async (handsCard, index) => {
    await expect(handsCard).toHaveValue(sequentialDeck[index]);
  });

  await expect(roomPage2.deckSelect).toHaveValue('sequential');
  await expect(roomPage2.handsCards).toHaveCount(sequentialDeck.length);
  (await roomPage2.handsCards.all()).forEach(async (handsCard, index) => {
    await expect(handsCard).toHaveValue(sequentialDeck[index]);
  });
});

test("On the room page, when a user selects 'T Shirt Size' as the deck, the players' hand should be the value of T Shirt Size.", async ({
  context,
}) => {
  // Given
  const tShirtSizeDeck: string[] = ['XS', 'S', 'M', 'L', 'XL', '?'];
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);

  // When
  await roomPage1.selectDeck('tShirtSize');

  // Then
  await expect(roomPage1.deckSelect).toHaveValue('tShirtSize');
  await expect(roomPage1.handsCards).toHaveCount(tShirtSizeDeck.length);
  (await roomPage1.handsCards.all()).forEach(async (handsCard, index) => {
    await expect(handsCard).toHaveValue(tShirtSizeDeck[index]);
  });

  await expect(roomPage2.deckSelect).toHaveValue('tShirtSize');
  await expect(roomPage2.handsCards).toHaveCount(tShirtSizeDeck.length);
  (await roomPage2.handsCards.all()).forEach(async (handsCard, index) => {
    await expect(handsCard).toHaveValue(tShirtSizeDeck[index]);
  });
});
