import { test, expect } from '@playwright/test';
import RoomPage from '../../models/room-page';
import createRoomId from '../../helpers/createRoomId';

test('ルームページで、他のメンバーがカードを選択したとき、カードが場に伏せて置かれること', async ({
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
  await expect(roomPage1.faceDownTableCards).toHaveCount(1);
  await expect(roomPage1.blankTableCards).toHaveCount(1);
  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.faceDownTableCards).toHaveCount(1);
  await expect(roomPage2.blankTableCards).toHaveCount(1);

  // When
  await roomPage2.selectCard('0');

  // Then
  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.faceDownTableCards).toHaveCount(2);
  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.faceDownTableCards).toHaveCount(2);
});
