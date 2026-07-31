import { expect, test } from '@playwright/test';
import createRoomId from '@pw/helpers/createRoomId';
import RoomPage from '@pw/models/room-page';

test('When cards are face down on the room page, then users should not be able to select a table card to ask for a comment.', async ({
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
  await expect(roomPage1.table).not.toContainText('Select a card above to hear their thoughts');

  await expect(roomPage2.tableCards).toHaveCount(1);
  await expect(roomPage2.tableCards.nth(0)).toBeDisabled();
  await expect(roomPage2.table).not.toContainText('Select a card above to hear their thoughts');
});

test('On the room page, when cards are open, users should be able to select a table card to ask for a comment', async ({
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
  await expect(roomPage1.table).not.toContainText('Select a card above to hear their thoughts');

  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.tableCards.nth(0)).toBeDisabled();
  await expect(roomPage2.tableCards.nth(1)).toBeDisabled();
  await expect(roomPage2.table).not.toContainText('Select a card above to hear their thoughts');

  await expect(roomPage3.tableCards).toHaveCount(2);
  await expect(roomPage3.tableCards.nth(0)).toBeDisabled();
  await expect(roomPage3.tableCards.nth(1)).toBeDisabled();
  await expect(roomPage3.table).not.toContainText('Select a card above to hear their thoughts');

  // When
  await roomPage1.openCards();

  // Then
  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.tableCards.nth(0)).not.toBeDisabled();
  await expect(roomPage1.tableCards.nth(1)).not.toBeDisabled();
  await expect(roomPage1.table).toContainText('Select a card above to hear their thoughts');

  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.tableCards.nth(0)).not.toBeDisabled();
  await expect(roomPage2.tableCards.nth(1)).not.toBeDisabled();
  await expect(roomPage2.table).toContainText('Select a card above to hear their thoughts');

  await expect(roomPage3.tableCards).toHaveCount(2);
  await expect(roomPage3.tableCards.nth(0)).not.toBeDisabled();
  await expect(roomPage3.tableCards.nth(1)).not.toBeDisabled();
  await expect(roomPage3.table).toContainText('Select a card above to hear their thoughts');
});

test('On the room page, when a user selects a table card, then all users can see which table card is selected and the player who put the card down can see that they are asked for sharing their thoughts.', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  const roomPage3: RoomPage = new RoomPage(await context.newPage());

  await roomPage1.preparePlayedAudios();
  await roomPage2.preparePlayedAudios();
  await roomPage3.preparePlayedAudios();

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
  await expect.poll(() => roomPage1.playedAudios()).toContainEqual(expect.stringContaining('notify.mp3'));
  await expect(roomPage1.tableCards.filter({ hasText: '0' })).toContainClass('selected');
  await expect(roomPage1.tableCards.filter({ hasText: '0' })).toContainText('You');
  await expect(roomPage1.tableCards.filter({ hasText: '1' })).not.toContainClass('selected');
  await expect(roomPage1.tableCards.filter({ hasText: '1' })).not.toContainText('You');
  await expect(roomPage1.tableCards.filter({ hasText: '2' })).not.toContainClass('selected');
  await expect(roomPage1.tableCards.filter({ hasText: '2' })).not.toContainText('You');

  await expect.poll(() => roomPage2.playedAudios()).toHaveLength(0);
  await expect(roomPage2.tableCards.filter({ hasText: '0' })).toContainClass('selected');
  await expect(roomPage2.tableCards.filter({ hasText: '0' })).not.toContainText('You');
  await expect(roomPage2.tableCards.filter({ hasText: '1' })).not.toContainClass('selected');
  await expect(roomPage2.tableCards.filter({ hasText: '1' })).not.toContainText('You');
  await expect(roomPage2.tableCards.filter({ hasText: '2' })).not.toContainClass('selected');
  await expect(roomPage2.tableCards.filter({ hasText: '2' })).not.toContainText('You');

  await expect.poll(() => roomPage3.playedAudios()).toHaveLength(0);
  await expect(roomPage3.tableCards.filter({ hasText: '0' })).toContainClass('selected');
  await expect(roomPage3.tableCards.filter({ hasText: '0' })).not.toContainText('You');
  await expect(roomPage3.tableCards.filter({ hasText: '1' })).not.toContainClass('selected');
  await expect(roomPage3.tableCards.filter({ hasText: '1' })).not.toContainText('You');
  await expect(roomPage3.tableCards.filter({ hasText: '2' })).not.toContainClass('selected');
  await expect(roomPage3.tableCards.filter({ hasText: '2' })).not.toContainText('You');

  // When a user selects another table card
  await roomPage1.clearPlayedAudios();
  await roomPage2.clearPlayedAudios();
  await roomPage3.clearPlayedAudios();

  await roomPage3.tableCards.filter({ hasText: '2' }).click();

  // Then
  await expect.poll(() => roomPage1.playedAudios()).toHaveLength(0);
  await expect(roomPage1.tableCards.filter({ hasText: '0' })).not.toContainClass('selected');
  await expect(roomPage1.tableCards.filter({ hasText: '0' })).not.toContainText('You');
  await expect(roomPage1.tableCards.filter({ hasText: '1' })).not.toContainClass('selected');
  await expect(roomPage1.tableCards.filter({ hasText: '1' })).not.toContainText('You');
  await expect(roomPage1.tableCards.filter({ hasText: '2' })).toContainClass('selected');
  await expect(roomPage1.tableCards.filter({ hasText: '2' })).not.toContainText('You');

  await expect.poll(() => roomPage2.playedAudios()).toHaveLength(0);
  await expect(roomPage2.tableCards.filter({ hasText: '0' })).not.toContainClass('selected');
  await expect(roomPage2.tableCards.filter({ hasText: '0' })).not.toContainText('You');
  await expect(roomPage2.tableCards.filter({ hasText: '1' })).not.toContainClass('selected');
  await expect(roomPage2.tableCards.filter({ hasText: '1' })).not.toContainText('You');
  await expect(roomPage2.tableCards.filter({ hasText: '2' })).toContainClass('selected');
  await expect(roomPage2.tableCards.filter({ hasText: '2' })).not.toContainText('You');

  await expect.poll(() => roomPage3.playedAudios()).toContainEqual(expect.stringContaining('notify.mp3'));
  await expect(roomPage3.tableCards.filter({ hasText: '0' })).not.toContainClass('selected');
  await expect(roomPage3.tableCards.filter({ hasText: '0' })).not.toContainText('You');
  await expect(roomPage3.tableCards.filter({ hasText: '1' })).not.toContainClass('selected');
  await expect(roomPage3.tableCards.filter({ hasText: '1' })).not.toContainText('You');
  await expect(roomPage3.tableCards.filter({ hasText: '2' })).toContainClass('selected');
  await expect(roomPage3.tableCards.filter({ hasText: '2' })).toContainText('You');
});

test('On the room page, when a user selects to replay the game, then the selected player is also refreshed.', async ({
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

  await roomPage1.tableCards.filter({ hasText: '0' }).click();

  await expect(roomPage1.tableCards.filter({ hasText: '0' })).toContainClass('selected');
  await expect(roomPage1.tableCards.filter({ hasText: '0' })).toContainText('You');
  await expect(roomPage1.tableCards.filter({ hasText: '1' })).not.toContainClass('selected');
  await expect(roomPage1.tableCards.filter({ hasText: '1' })).not.toContainText('You');
  await expect(roomPage1.tableCards.filter({ hasText: '2' })).not.toContainClass('selected');
  await expect(roomPage1.tableCards.filter({ hasText: '2' })).not.toContainText('You');

  await expect(roomPage2.tableCards.filter({ hasText: '0' })).toContainClass('selected');
  await expect(roomPage2.tableCards.filter({ hasText: '0' })).not.toContainText('You');
  await expect(roomPage2.tableCards.filter({ hasText: '1' })).not.toContainClass('selected');
  await expect(roomPage2.tableCards.filter({ hasText: '1' })).not.toContainText('You');
  await expect(roomPage2.tableCards.filter({ hasText: '2' })).not.toContainClass('selected');
  await expect(roomPage2.tableCards.filter({ hasText: '2' })).not.toContainText('You');

  await expect(roomPage3.tableCards.filter({ hasText: '0' })).toContainClass('selected');
  await expect(roomPage3.tableCards.filter({ hasText: '0' })).not.toContainText('You');
  await expect(roomPage3.tableCards.filter({ hasText: '1' })).not.toContainClass('selected');
  await expect(roomPage3.tableCards.filter({ hasText: '1' })).not.toContainText('You');
  await expect(roomPage3.tableCards.filter({ hasText: '2' })).not.toContainClass('selected');
  await expect(roomPage3.tableCards.filter({ hasText: '2' })).not.toContainText('You');

  // When

  await roomPage1.replay();
  await roomPage1.selectCard('0');
  await roomPage2.selectCard('1');
  await roomPage3.selectCard('2');
  await roomPage1.openCards();

  // Then
  await expect(roomPage1.tableCards.filter({ hasText: '0' })).not.toContainClass('selected');
  await expect(roomPage1.tableCards.filter({ hasText: '0' })).not.toContainText('You');
  await expect(roomPage1.tableCards.filter({ hasText: '1' })).not.toContainClass('selected');
  await expect(roomPage1.tableCards.filter({ hasText: '1' })).not.toContainText('You');
  await expect(roomPage1.tableCards.filter({ hasText: '2' })).not.toContainClass('selected');
  await expect(roomPage1.tableCards.filter({ hasText: '2' })).not.toContainText('You');

  await expect(roomPage2.tableCards.filter({ hasText: '0' })).not.toContainClass('selected');
  await expect(roomPage2.tableCards.filter({ hasText: '0' })).not.toContainText('You');
  await expect(roomPage2.tableCards.filter({ hasText: '1' })).not.toContainClass('selected');
  await expect(roomPage2.tableCards.filter({ hasText: '1' })).not.toContainText('You');
  await expect(roomPage2.tableCards.filter({ hasText: '2' })).not.toContainClass('selected');
  await expect(roomPage2.tableCards.filter({ hasText: '2' })).not.toContainText('You');

  await expect(roomPage3.tableCards.filter({ hasText: '0' })).not.toContainClass('selected');
  await expect(roomPage3.tableCards.filter({ hasText: '0' })).not.toContainText('You');
  await expect(roomPage3.tableCards.filter({ hasText: '1' })).not.toContainClass('selected');
  await expect(roomPage3.tableCards.filter({ hasText: '1' })).not.toContainText('You');
  await expect(roomPage3.tableCards.filter({ hasText: '2' })).not.toContainClass('selected');
  await expect(roomPage3.tableCards.filter({ hasText: '2' })).not.toContainText('You');
});
