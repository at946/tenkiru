import { expect, test } from '@playwright/test';
import createRoomId from '../../helpers/createRoomId';
import RoomPage from '../../models/room-page';

test('ルームページで、誰もカードを場に出していないとき、カードをオープンできないこと', async ({
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

test('ルームページで、誰かがカードを場に出している状態で、オープンボタンを選択したとき、場に出たカードがオープンすること', async ({
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

test('ルームページで、カードをオープンした後、カードの選択を変更できないこと', async ({
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

test('ルームページで、カードをオープンした後、オープンボタンが表示されないこと', async ({
  context,
}) => {
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
