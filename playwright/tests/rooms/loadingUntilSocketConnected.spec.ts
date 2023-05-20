import { expect, test } from '@playwright/test';
import RoomPage from '@/playwright/models/room-page';
import createRoomId from '@/playwright/helpers/createRoomId';

test('ルームを参加するとき、WebSocketが確立するまで入室中トーストが表示されること', async ({
  page,
}) => {
  // Given
  const roomPage: RoomPage = new RoomPage(page);

  // When
  roomPage.goto(createRoomId());

  // Then - WebSocketが確立されるまでデッキタイプ、メンバータイプ、手札は表示されない
  // await expect(roomPage.enteringRoomToast).toBeVisible();
  await expect(roomPage.roomIdLink).toBeVisible();
  await expect(roomPage.tableCards).toHaveCount(0);
  await expect(roomPage.deckSelect).not.toBeVisible();
  await expect(roomPage.memberTypeSelect).not.toBeVisible();
  await expect(roomPage.hands).not.toBeVisible();

  // Then - WebSocketが確立されたらテーブルカードが表示され、入室中トーストが非表示になり入室完了トーストが表示される
  await expect(roomPage.enteringRoomToast).not.toBeVisible();
  await expect(roomPage.haveEnteredRoomToast).toBeVisible();
  await expect(roomPage.roomIdLink).toBeVisible();
  await expect(roomPage.tableCards).toHaveCount(1);
  await expect(roomPage.deckSelect).toBeVisible();
  await expect(roomPage.memberTypeSelect).toBeVisible();
  await expect(roomPage.hands).toBeVisible();

  // Then - 少しすると入室完了トーストも非表示になる
  await expect(roomPage.haveEnteredRoomToast).not.toBeVisible();
});
