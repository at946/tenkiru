import { test, expect, Page, Locator } from '@playwright/test';
import RoomPage from '../../models/room-page';
import createRoomId from '../../helpers/createRoomId';

test('ルームページで、同じ部屋に他のメンバーが入ってきたとき、カード置き場が増えること', async ({
  context,
}) => {
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

test('ルームページで、別の部屋に別のメンバーが入ってきたとき、カード置き場は増えないこと', async ({
  context,
}) => {
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

test('ルームページで、カードがオープンした部屋に入室したとき、カードがオープンな状態からスタートすること', async ({
  context,
}) => {
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
  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.faceUpTableCards).toHaveCount(1);
  await expect(roomPage1.blankTableCards).toHaveCount(1);
  await expect(roomPage1.openButton).not.toBeVisible();
  await expect(roomPage1.replayButton).toBeVisible();
  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.faceUpTableCards).toHaveCount(1);
  await expect(roomPage2.blankTableCards).toHaveCount(1);
  await expect(roomPage2.openButton).not.toBeVisible();
  await expect(roomPage2.replayButton).toBeVisible();
});

test('ルームページで、デッキがFibonacci以外を選択された状態で入室したとき、そのデッキが手札に表示されること', async ({
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
    await expect(handsCard).toHaveText(expectTefudaCards[index]);
  });
});
