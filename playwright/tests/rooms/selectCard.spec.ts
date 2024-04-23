import { expect, test } from '@playwright/test';
import createRoomId from '../../helpers/createRoomId';
import RoomPage from '../../models/room-page';

test('ルームページで、カードを選択したとき、カードが選択中になり、場に伏せて置かれること', async ({ context }) => {
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

test('ルームページで、選択中のカードを選択したとき、カードが未選択状態に戻ること', async ({ context }) => {
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

test('ルームページで、カードを選択中に別のカードを選択したとき、新たに選択したカードだけが選択中になること', async ({
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
