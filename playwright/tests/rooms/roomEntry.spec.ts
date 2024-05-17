import { expect, test } from '@playwright/test';
import createRoomId from '@pw/helpers/createRoomId';
import RoomPage from '@pw/models/room-page';

test('When a user joins a room, the user should receive a notification that the room entry has been completed', async ({
  page,
}) => {
  // Given
  const roomPage: RoomPage = new RoomPage(page);

  // When
  roomPage.goto(createRoomId());

  // Then - Until the websocket is established, the room entry notification and table card are not displayed
  await expect(roomPage.haveEnteredRoomToast).not.toBeVisible();
  await expect(roomPage.tableCards).toHaveCount(0);

  // Then - When the websocket is established, the room entry notification and table card appear
  await expect(roomPage.haveEnteredRoomToast).toBeVisible();
  await expect(roomPage.tableCards).toHaveCount(1);

  // Then - After a little while, the room entry notification is disappear
  await expect(roomPage.haveEnteredRoomToast).not.toBeVisible();
});
