import test, { type Locator, expect } from '@playwright/test';
import createRoomId from '@pw/helpers/createRoomId';
import RoomPage from '@pw/models/room-page';

test('When users enter a room where fibonacci deck is selected, the selected deck must not change', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage1.selectDeck('fibonacci');

  // When
  await roomPage2.goto(roomId);

  // Then
  await expect(roomPage2.deckSelect).toHaveValue('fibonacci');
  const expectTefudaCards = ['0', '1', '2', '3', '5', '8', '13', '21', '?'];
  (await roomPage2.handsCards.all()).forEach(async (handsCard: Locator, index: number) => {
    await expect(handsCard).toHaveValue(expectTefudaCards[index]);
  });
});

test('When users enter a room where sequential deck is selected, the selected deck must not change', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage1.selectDeck('sequential');

  // When
  await roomPage2.goto(roomId);

  // Then
  await expect(roomPage2.deckSelect).toHaveValue('sequential');
  const expectTefudaCards = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '?'];
  (await roomPage2.handsCards.all()).forEach(async (handsCard: Locator, index: number) => {
    await expect(handsCard).toHaveValue(expectTefudaCards[index]);
  });
});

test('When users enter a room where t-shirt size deck is selected, the selected deck must not change', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage1.selectDeck('tShirtSize');

  // When
  await roomPage2.goto(roomId);

  // Then
  await expect(roomPage2.deckSelect).toHaveValue('tShirtSize');
  const expectTefudaCards = ['XS', 'S', 'M', 'L', 'XL', '?'];
  (await roomPage2.handsCards.all()).forEach(async (handsCard: Locator, index: number) => {
    await expect(handsCard).toHaveValue(expectTefudaCards[index]);
  });
});
