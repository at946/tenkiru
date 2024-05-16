import { expect, test } from '@playwright/test';
import createRoomId from '@pw/helpers/createRoomId';
import RoomPage from '@pw/models/room-page';

test('On the room page, a user selects the Request To Select button, the notification should appear for each user according to their status to select cards.', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  const roomPage3: RoomPage = new RoomPage(await context.newPage());
  const roomPage4: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);
  await roomPage3.goto(roomId);
  await roomPage4.goto(roomId);
  await roomPage1.selectCard('0');
  await roomPage3.selectUserType('audience');
  await roomPage4.selectUserType('audience');

  // When
  await roomPage4.requestToSelect();

  // Then
  await expect(roomPage1.haveRequestedToSelectToast).not.toBeVisible(); // did not click the RequestToSelect button
  await expect(roomPage2.haveRequestedToSelectToast).not.toBeVisible(); // did not click the RequestToSelect button
  await expect(roomPage3.haveRequestedToSelectToast).not.toBeVisible(); // did not click the RequestToSelect button
  await expect(roomPage4.haveRequestedToSelectToast).toBeVisible(); // clicked the RequestToSelect button

  await expect(roomPage1.hadBeenRequestedToSelectToast).not.toBeVisible(); // have already selected the card
  await expect(roomPage2.hadBeenRequestedToSelectToast).toBeVisible(); // have not selected a card
  await expect(roomPage3.hadBeenRequestedToSelectToast).not.toBeVisible(); // audience
  await expect(roomPage4.hadBeenRequestedToSelectToast).not.toBeVisible(); // audience

  // Then - Notifications should disappear after a short time
  await expect(roomPage4.haveRequestedToSelectToast).not.toBeVisible({ timeout: 7500 });
  await expect(roomPage2.haveBeenRequestedCommentsToast).not.toBeVisible({ timeout: 7500 });
});

test('On the room page, when cards are face up, the RequestToSelect button should not be displayed.', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage: RoomPage = new RoomPage(await context.newPage());
  await roomPage.goto(roomId);
  await roomPage.selectCard('0');

  // When
  await roomPage.openCards();

  // Then
  await expect(roomPage.requestToSelectButton).not.toBeVisible();
});

test('On the room page, when all players have selected their card, the RequestToSelect button should not be able to be selected.', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  const roomPage3: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);
  await roomPage3.goto(roomId);

  // When
  await roomPage1.selectCard('0');
  await roomPage2.selectCard('1');
  await roomPage3.selectUserType('audience');

  // Then
  await expect(roomPage1.requestToSelectButton).toBeDisabled();
  await expect(roomPage2.requestToSelectButton).toBeDisabled();
  await expect(roomPage3.requestToSelectButton).toBeDisabled();
});
