import { expect, test } from '@playwright/test';
import RoomPage from '../../models/room-page';
import createRoomId from '../../helpers/createRoomId';

test('ルームを参加するとき、WebSocketが確立すると入室完了トーストが表示されること', async ({
  page,
}) => {
  // Given
  const roomPage: RoomPage = new RoomPage(page);

  // When
  roomPage.goto(createRoomId());

  // Then - WebSocketが確立されるまでデッキタイプ、メンバータイプ、手札は表示されない
  await expect(roomPage.haveEnteredRoomToast).not.toBeVisible();
  await expect(roomPage.tableCards).toHaveCount(0);

  // Then - WebSocketが確立されたらテーブルカードが表示され、入室中トーストが非表示になり入室完了トーストが表示される
  await expect(roomPage.haveEnteredRoomToast).toBeVisible();
  await expect(roomPage.tableCards).toHaveCount(1);

  // Then - 少しすると入室完了トーストも非表示になる
  await expect(roomPage.haveEnteredRoomToast).not.toBeVisible();
});
