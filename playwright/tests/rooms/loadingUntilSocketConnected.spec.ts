import { expect, test } from '@playwright/test';
import RoomPage from '@/playwright/models/room-page';
import createRoomId from '@/playwright/helpers/createRoomId';

test('ルームを参加するとき、WebSocketが確立するまでローディングアニメーションが表示されること', async ({
  page,
}) => {
  // Given
  const roomPage: RoomPage = new RoomPage(page);

  // When
  roomPage.goto(createRoomId());

  // Then - WebSocketが確立されるまでアニメーションが表示される
  await expect(roomPage.enteringRoomAnimation).toBeVisible();
  await expect(roomPage.roomIdLink).toBeVisible();
  await expect(roomPage.tableCards).not.toBeVisible();
  await expect(roomPage.hands).not.toBeVisible();

  // Then - WebSocketが確立されたらテーブルや手札が表示される
  await expect(roomPage.enteringRoomAnimation).not.toBeVisible();
  await expect(roomPage.roomIdLink).toBeVisible();
  await expect(roomPage.tableCards).toBeVisible();
  await expect(roomPage.hands).toBeVisible();
});
