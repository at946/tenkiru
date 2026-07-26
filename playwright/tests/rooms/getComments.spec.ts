import { expect, test } from '@playwright/test';
import createRoomId from '@pw/helpers/createRoomId';
import RoomPage from '@pw/models/room-page';

test('When cards are face down on the room page, then users should not be able to select table cards to request comments.', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);
  await roomPage1.selectCard('0');

  // When

  // Then
  await expect(roomPage1.tableCards).toHaveCount(1);
  await expect(roomPage1.tableCards.nth(0)).toBeDisabled();

  await expect(roomPage2.tableCards).toHaveCount(1);
  await expect(roomPage2.tableCards.nth(0)).toBeDisabled();
});

test('On the room page, when cards are open, users should be able to select table cards to request comments', async ({
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
  await roomPage1.selectCard('0');
  await roomPage2.selectCard('2');

  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.tableCards.nth(0)).toBeDisabled();
  await expect(roomPage1.tableCards.nth(1)).toBeDisabled();

  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.tableCards.nth(0)).toBeDisabled();
  await expect(roomPage2.tableCards.nth(1)).toBeDisabled();

  await expect(roomPage3.tableCards).toHaveCount(2);
  await expect(roomPage3.tableCards.nth(0)).toBeDisabled();
  await expect(roomPage3.tableCards.nth(1)).toBeDisabled();

  // When
  await roomPage1.openCards();

  // Then
  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.tableCards.nth(0)).not.toBeDisabled();
  await expect(roomPage1.tableCards.nth(1)).not.toBeDisabled();

  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.tableCards.nth(0)).not.toBeDisabled();
  await expect(roomPage2.tableCards.nth(1)).not.toBeDisabled();

  await expect(roomPage3.tableCards).toHaveCount(2);
  await expect(roomPage3.tableCards.nth(0)).not.toBeDisabled();
  await expect(roomPage3.tableCards.nth(1)).not.toBeDisabled();
});

test('On the room page, when a user selects a table card, the player who put the card down should receive the notification to request a comment.', async ({
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
  await roomPage1.selectCard('0');
  await roomPage2.selectCard('1');
  await roomPage3.selectCard('2');
  await roomPage1.openCards();

  // When
  await roomPage2.tableCards.filter({ hasText: '0' }).click();

  // Then
  // The browser of the user who selects the Get Comment button should display the notification requesting a comment
  await expect(roomPage1.haveRequestedCommentsToast).not.toBeVisible();
  await expect(roomPage2.haveRequestedCommentsToast).toBeVisible();
  await expect(roomPage3.haveRequestedCommentsToast).not.toBeVisible();

  // The browser of the user who placed the card which was requested a comment should display the notification of the request for commentt
  await expect(roomPage1.haveBeenRequestedCommentsToast).toBeVisible();
  await expect(roomPage2.haveBeenRequestedCommentsToast).not.toBeVisible();
  await expect(roomPage3.haveBeenRequestedCommentsToast).not.toBeVisible();

  // Notifications should disappear after a short time
  await expect(roomPage2.haveRequestedCommentsToast).not.toBeVisible();
  await expect(roomPage1.haveBeenRequestedCommentsToast).not.toBeVisible();
});

test('On the room page, when a user selects a table card, the user should receive the notification to ask to get comments.', async ({
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
  await roomPage1.selectCard('0');
  await roomPage2.selectCard('1');
  await roomPage3.selectCard('2');
  await roomPage1.openCards();

  // When
  await roomPage1.tableCards.filter({ hasText: '0' }).click();

  // Then
  // The browser of the user who selects the Get Comment button should display the notification requesting a comment
  await expect(roomPage1.haveRequestedCommentsToast).toBeVisible();
  await expect(roomPage2.haveRequestedCommentsToast).not.toBeVisible();
  await expect(roomPage3.haveRequestedCommentsToast).not.toBeVisible();

  // The browser of the user who placed the card which was requested a comment should display the notification of the request for commentt
  await expect(roomPage1.haveBeenRequestedCommentsToast).toBeVisible();
  await expect(roomPage2.haveBeenRequestedCommentsToast).not.toBeVisible();
  await expect(roomPage3.haveBeenRequestedCommentsToast).not.toBeVisible();

  // Notifications should disappear after a short time
  await expect(roomPage1.haveRequestedCommentsToast).not.toBeVisible();
  await expect(roomPage1.haveBeenRequestedCommentsToast).not.toBeVisible();
});
