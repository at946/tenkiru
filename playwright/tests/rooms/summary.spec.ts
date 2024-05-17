import { expect, test } from '@playwright/test';
import createRoomId from '@pw/helpers/createRoomId';
import RoomPage from '@pw/models/room-page';

test('On the room page, when the deck type is fibonacci and table cards are face-down, the summary results should be "?".', async ({
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

  await expect(roomPage1.deckSelect).toHaveValue('fibonacci');
  await expect(roomPage2.deckSelect).toHaveValue('fibonacci');
  await expect(roomPage3.deckSelect).toHaveValue('fibonacci');

  // Then - カードを選択していなければ「？」
  await expect(roomPage1.minTag).toHaveText('Min?');
  await expect(roomPage1.avgTag).toHaveText('Avg?');
  await expect(roomPage1.maxTag).toHaveText('Max?');
  await expect(roomPage2.minTag).toHaveText('Min?');
  await expect(roomPage2.avgTag).toHaveText('Avg?');
  await expect(roomPage2.maxTag).toHaveText('Max?');
  await expect(roomPage3.minTag).toHaveText('Min?');
  await expect(roomPage3.avgTag).toHaveText('Avg?');
  await expect(roomPage3.maxTag).toHaveText('Max?');

  // When - カードを選択
  await roomPage1.selectCard('3');
  await roomPage2.selectCard('5');
  await roomPage3.selectCard('13');

  // Then - カードを選択してもオープンしていなければ「？」
  await expect(roomPage1.minTag).toHaveText('Min?');
  await expect(roomPage1.avgTag).toHaveText('Avg?');
  await expect(roomPage1.maxTag).toHaveText('Max?');
  await expect(roomPage2.minTag).toHaveText('Min?');
  await expect(roomPage2.avgTag).toHaveText('Avg?');
  await expect(roomPage2.maxTag).toHaveText('Max?');
  await expect(roomPage3.minTag).toHaveText('Min?');
  await expect(roomPage3.avgTag).toHaveText('Avg?');
  await expect(roomPage3.maxTag).toHaveText('Max?');
});

test('On the room page, when the deck type is fibonacci and table cards are face-up, the maximum, minimum and avarage values of table cards should be displayed.', async ({
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
  await roomPage1.selectCard('3');
  await roomPage2.selectCard('5');
  await roomPage3.selectCard('13');

  await expect(roomPage1.minTag).toHaveText('Min?');
  await expect(roomPage1.avgTag).toHaveText('Avg?');
  await expect(roomPage1.maxTag).toHaveText('Max?');
  await expect(roomPage2.minTag).toHaveText('Min?');
  await expect(roomPage2.avgTag).toHaveText('Avg?');
  await expect(roomPage2.maxTag).toHaveText('Max?');
  await expect(roomPage3.minTag).toHaveText('Min?');
  await expect(roomPage3.avgTag).toHaveText('Avg?');
  await expect(roomPage3.maxTag).toHaveText('Max?');

  // When
  await roomPage1.openCards();

  // Then
  await expect(roomPage1.minTag).toHaveText('Min3');
  await expect(roomPage1.avgTag).toHaveText('Avg7');
  await expect(roomPage1.maxTag).toHaveText('Max13');
  await expect(roomPage2.minTag).toHaveText('Min3');
  await expect(roomPage2.avgTag).toHaveText('Avg7');
  await expect(roomPage2.maxTag).toHaveText('Max13');
  await expect(roomPage3.minTag).toHaveText('Min3');
  await expect(roomPage3.avgTag).toHaveText('Avg7');
  await expect(roomPage3.maxTag).toHaveText('Max13');
});

test('On the room page, when the deck type is sequential and table cards are face-down, the summary results should be "?".', async ({
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
  await roomPage1.selectDeck('sequential');

  await expect(roomPage1.deckSelect).toHaveValue('sequential');
  await expect(roomPage2.deckSelect).toHaveValue('sequential');
  await expect(roomPage3.deckSelect).toHaveValue('sequential');

  // Then - カードを選択していなければ「？」
  await expect(roomPage1.minTag).toHaveText('Min?');
  await expect(roomPage1.avgTag).toHaveText('Avg?');
  await expect(roomPage1.maxTag).toHaveText('Max?');
  await expect(roomPage2.minTag).toHaveText('Min?');
  await expect(roomPage2.avgTag).toHaveText('Avg?');
  await expect(roomPage2.maxTag).toHaveText('Max?');
  await expect(roomPage3.minTag).toHaveText('Min?');
  await expect(roomPage3.avgTag).toHaveText('Avg?');
  await expect(roomPage3.maxTag).toHaveText('Max?');

  // When - カードを選択
  await roomPage1.selectCard('0');
  await roomPage2.selectCard('4');
  await roomPage3.selectCard('6');

  // Then - カードを選択してもオープンしていなければ「？」
  await expect(roomPage1.minTag).toHaveText('Min?');
  await expect(roomPage1.avgTag).toHaveText('Avg?');
  await expect(roomPage1.maxTag).toHaveText('Max?');
  await expect(roomPage2.minTag).toHaveText('Min?');
  await expect(roomPage2.avgTag).toHaveText('Avg?');
  await expect(roomPage2.maxTag).toHaveText('Max?');
  await expect(roomPage3.minTag).toHaveText('Min?');
  await expect(roomPage3.avgTag).toHaveText('Avg?');
  await expect(roomPage3.maxTag).toHaveText('Max?');
});

test('On the room page, when the deck type is sequential and table cards are face-up, the maximum, minimum and average values of table cards should be displayed.', async ({
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
  await roomPage1.selectDeck('sequential');
  await roomPage1.selectCard('3');
  await roomPage2.selectCard('5');
  await roomPage3.selectCard('9');

  await expect(roomPage1.minTag).toHaveText('Min?');
  await expect(roomPage1.avgTag).toHaveText('Avg?');
  await expect(roomPage1.maxTag).toHaveText('Max?');
  await expect(roomPage2.minTag).toHaveText('Min?');
  await expect(roomPage2.avgTag).toHaveText('Avg?');
  await expect(roomPage2.maxTag).toHaveText('Max?');
  await expect(roomPage3.minTag).toHaveText('Min?');
  await expect(roomPage3.avgTag).toHaveText('Avg?');
  await expect(roomPage3.maxTag).toHaveText('Max?');

  // When
  await roomPage1.openCards();

  // Then
  await expect(roomPage1.minTag).toHaveText('Min3');
  await expect(roomPage1.avgTag).toHaveText('Avg5.7');
  await expect(roomPage1.maxTag).toHaveText('Max9');
  await expect(roomPage2.minTag).toHaveText('Min3');
  await expect(roomPage2.avgTag).toHaveText('Avg5.7');
  await expect(roomPage2.maxTag).toHaveText('Max9');
  await expect(roomPage3.minTag).toHaveText('Min3');
  await expect(roomPage3.avgTag).toHaveText('Avg5.7');
  await expect(roomPage3.maxTag).toHaveText('Max9');
});

test('On the room page, when the deck type is T shirt size, the summary results should not be displayed.', async ({
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
  await roomPage1.selectDeck('tShirtSize');

  await expect(roomPage1.deckSelect).toHaveValue('tShirtSize');
  await expect(roomPage2.deckSelect).toHaveValue('tShirtSize');
  await expect(roomPage3.deckSelect).toHaveValue('tShirtSize');

  // Then - サマリータグは表示されない
  await expect(roomPage1.minTag).not.toBeVisible();
  await expect(roomPage1.avgTag).not.toBeVisible();
  await expect(roomPage1.maxTag).not.toBeVisible();
  await expect(roomPage2.minTag).not.toBeVisible();
  await expect(roomPage2.avgTag).not.toBeVisible();
  await expect(roomPage2.maxTag).not.toBeVisible();
  await expect(roomPage3.minTag).not.toBeVisible();
  await expect(roomPage3.avgTag).not.toBeVisible();
  await expect(roomPage3.maxTag).not.toBeVisible();

  // When - カードを選択
  await roomPage1.selectCard('S');
  await roomPage2.selectCard('M');
  await roomPage3.selectCard('L');

  // Then - カードを選択してもサマリータグは表示されない
  await expect(roomPage1.minTag).not.toBeVisible();
  await expect(roomPage1.avgTag).not.toBeVisible();
  await expect(roomPage1.maxTag).not.toBeVisible();
  await expect(roomPage2.minTag).not.toBeVisible();
  await expect(roomPage2.avgTag).not.toBeVisible();
  await expect(roomPage2.maxTag).not.toBeVisible();
  await expect(roomPage3.minTag).not.toBeVisible();
  await expect(roomPage3.avgTag).not.toBeVisible();
  await expect(roomPage3.maxTag).not.toBeVisible();

  // When - カードをオープン
  await roomPage1.openCards();

  // Then - カードをオープンしてもサマリータグは表示されない
  await expect(roomPage1.minTag).not.toBeVisible();
  await expect(roomPage1.avgTag).not.toBeVisible();
  await expect(roomPage1.maxTag).not.toBeVisible();
  await expect(roomPage2.minTag).not.toBeVisible();
  await expect(roomPage2.avgTag).not.toBeVisible();
  await expect(roomPage2.maxTag).not.toBeVisible();
  await expect(roomPage3.minTag).not.toBeVisible();
  await expect(roomPage3.avgTag).not.toBeVisible();
  await expect(roomPage3.maxTag).not.toBeVisible();
});

test('On the room page, when some players have not selected their cards, the summary results should be calculated on  the selected cards only.', async ({
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
  await roomPage1.selectCard('2');
  await roomPage2.selectCard('3');

  await expect(roomPage1.minTag).toHaveText('Min?');
  await expect(roomPage1.avgTag).toHaveText('Avg?');
  await expect(roomPage1.maxTag).toHaveText('Max?');
  await expect(roomPage2.minTag).toHaveText('Min?');
  await expect(roomPage2.avgTag).toHaveText('Avg?');
  await expect(roomPage2.maxTag).toHaveText('Max?');
  await expect(roomPage3.minTag).toHaveText('Min?');
  await expect(roomPage3.avgTag).toHaveText('Avg?');
  await expect(roomPage3.maxTag).toHaveText('Max?');

  // When
  await roomPage1.openCards();

  // Then
  await expect(roomPage1.minTag).toHaveText('Min2');
  await expect(roomPage1.avgTag).toHaveText('Avg2.5');
  await expect(roomPage1.maxTag).toHaveText('Max3');
  await expect(roomPage2.minTag).toHaveText('Min2');
  await expect(roomPage2.avgTag).toHaveText('Avg2.5');
  await expect(roomPage2.maxTag).toHaveText('Max3');
  await expect(roomPage3.minTag).toHaveText('Min2');
  await expect(roomPage3.avgTag).toHaveText('Avg2.5');
  await expect(roomPage3.maxTag).toHaveText('Max3');
});

test('On the room page, when some players have selected "?" as their cards, the summary results should be calculated on  the numbered cards only.', async ({
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
  await roomPage1.selectCard('1');
  await roomPage2.selectCard('?');
  await roomPage3.selectCard('2');

  await expect(roomPage1.minTag).toHaveText('Min?');
  await expect(roomPage1.avgTag).toHaveText('Avg?');
  await expect(roomPage1.maxTag).toHaveText('Max?');
  await expect(roomPage2.minTag).toHaveText('Min?');
  await expect(roomPage2.avgTag).toHaveText('Avg?');
  await expect(roomPage2.maxTag).toHaveText('Max?');
  await expect(roomPage3.minTag).toHaveText('Min?');
  await expect(roomPage3.avgTag).toHaveText('Avg?');
  await expect(roomPage3.maxTag).toHaveText('Max?');

  // When
  await roomPage1.openCards();

  // Then
  await expect(roomPage1.minTag).toHaveText('Min1');
  await expect(roomPage1.avgTag).toHaveText('Avg1.5');
  await expect(roomPage1.maxTag).toHaveText('Max2');
  await expect(roomPage2.minTag).toHaveText('Min1');
  await expect(roomPage2.avgTag).toHaveText('Avg1.5');
  await expect(roomPage2.maxTag).toHaveText('Max2');
  await expect(roomPage3.minTag).toHaveText('Min1');
  await expect(roomPage3.avgTag).toHaveText('Avg1.5');
  await expect(roomPage3.maxTag).toHaveText('Max2');
});

test('On the room page, when a player becomes an audience after table cards are turned face up, the summary results should be re-calculated.', async ({
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
  await roomPage1.selectCard('3');
  await roomPage2.selectCard('5');
  await roomPage3.selectCard('13');
  await roomPage1.openCards();

  await expect(roomPage1.minTag).toHaveText('Min3');
  await expect(roomPage1.avgTag).toHaveText('Avg7');
  await expect(roomPage1.maxTag).toHaveText('Max13');
  await expect(roomPage2.minTag).toHaveText('Min3');
  await expect(roomPage2.avgTag).toHaveText('Avg7');
  await expect(roomPage2.maxTag).toHaveText('Max13');
  await expect(roomPage3.minTag).toHaveText('Min3');
  await expect(roomPage3.avgTag).toHaveText('Avg7');
  await expect(roomPage3.maxTag).toHaveText('Max13');

  // When
  await roomPage3.selectUserType('audience');

  // Then
  await expect(roomPage1.minTag).toHaveText('Min3');
  await expect(roomPage1.avgTag).toHaveText('Avg4');
  await expect(roomPage1.maxTag).toHaveText('Max5');
  await expect(roomPage2.minTag).toHaveText('Min3');
  await expect(roomPage2.avgTag).toHaveText('Avg4');
  await expect(roomPage2.maxTag).toHaveText('Max5');
  await expect(roomPage3.minTag).toHaveText('Min3');
  await expect(roomPage3.avgTag).toHaveText('Avg4');
  await expect(roomPage3.maxTag).toHaveText('Max5');
});
