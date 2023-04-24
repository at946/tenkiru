import { test, expect } from '@playwright/test';
import RoomPage from '../../models/room-page';
import createRoomId from '../../helpers/createRoomId';

test('ルームページで、カードを選択したとき、カードが場に伏せて置かれること', async ({
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
  await roomPage1.selectCard('0');

  // Then
  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.blankTableCards).toHaveCount(1);
  await expect(roomPage1.faceDownTableCards).toHaveCount(1);
  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.blankTableCards).toHaveCount(1);
  await expect(roomPage2.faceDownTableCards).toHaveCount(1);
});

test('ルームページで、カードを選択したとき、選択したカードが選択状態だとわかること', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);

  await expect(roomPage1.selectedHandsCard).toHaveCount(0);
  await expect(roomPage2.selectedHandsCard).toHaveCount(0);

  // When
  await roomPage1.selectCard('0');

  // Then
  await expect(roomPage1.selectedHandsCard).toHaveCount(1);
  await expect(roomPage1.selectedHandsCard).toHaveText(/^0$/);
  await expect(roomPage2.selectedHandsCard).toHaveCount(0);
});
