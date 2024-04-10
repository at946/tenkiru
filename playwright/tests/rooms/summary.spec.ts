import { expect, test } from '@playwright/test';
import createRoomId from '../../helpers/createRoomId';
import RoomPage from '../../models/room-page';

test('ルームページで、フィボナッチ数列デッキを選択しており、カードがオープンされてないとき、サマリーはすべて「？」であること', async ({
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
  await expect(roomPage1.minTag).toHaveText('最小?');
  await expect(roomPage1.avgTag).toHaveText('平均?');
  await expect(roomPage1.maxTag).toHaveText('最大?');
  await expect(roomPage2.minTag).toHaveText('最小?');
  await expect(roomPage2.avgTag).toHaveText('平均?');
  await expect(roomPage2.maxTag).toHaveText('最大?');
  await expect(roomPage3.minTag).toHaveText('最小?');
  await expect(roomPage3.avgTag).toHaveText('平均?');
  await expect(roomPage3.maxTag).toHaveText('最大?');

  // When - カードを選択
  await roomPage1.selectCard('3');
  await roomPage2.selectCard('5');
  await roomPage3.selectCard('13');

  // Then - カードを選択してもオープンしていなければ「？」
  await expect(roomPage1.minTag).toHaveText('最小?');
  await expect(roomPage1.avgTag).toHaveText('平均?');
  await expect(roomPage1.maxTag).toHaveText('最大?');
  await expect(roomPage2.minTag).toHaveText('最小?');
  await expect(roomPage2.avgTag).toHaveText('平均?');
  await expect(roomPage2.maxTag).toHaveText('最大?');
  await expect(roomPage3.minTag).toHaveText('最小?');
  await expect(roomPage3.avgTag).toHaveText('平均?');
  await expect(roomPage3.maxTag).toHaveText('最大?');
});

test('ルームページで、フィボナッチ数列デッキを選択しており、カードをオープンしたとき、場に出されたカードの最大値、最小値、平均値が表示されること', async ({
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

  await expect(roomPage1.minTag).toHaveText('最小?');
  await expect(roomPage1.avgTag).toHaveText('平均?');
  await expect(roomPage1.maxTag).toHaveText('最大?');
  await expect(roomPage2.minTag).toHaveText('最小?');
  await expect(roomPage2.avgTag).toHaveText('平均?');
  await expect(roomPage2.maxTag).toHaveText('最大?');
  await expect(roomPage3.minTag).toHaveText('最小?');
  await expect(roomPage3.avgTag).toHaveText('平均?');
  await expect(roomPage3.maxTag).toHaveText('最大?');

  // When
  await roomPage1.openCards();

  // Then
  await expect(roomPage1.minTag).toHaveText('最小3');
  await expect(roomPage1.avgTag).toHaveText('平均7');
  await expect(roomPage1.maxTag).toHaveText('最大13');
  await expect(roomPage2.minTag).toHaveText('最小3');
  await expect(roomPage2.avgTag).toHaveText('平均7');
  await expect(roomPage2.maxTag).toHaveText('最大13');
  await expect(roomPage3.minTag).toHaveText('最小3');
  await expect(roomPage3.avgTag).toHaveText('平均7');
  await expect(roomPage3.maxTag).toHaveText('最大13');
});

test('ルームページで、0-10デッキを選択しており、カードがオープンされてないとき、サマリーはすべて「？」であること', async ({
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
  await expect(roomPage1.minTag).toHaveText('最小?');
  await expect(roomPage1.avgTag).toHaveText('平均?');
  await expect(roomPage1.maxTag).toHaveText('最大?');
  await expect(roomPage2.minTag).toHaveText('最小?');
  await expect(roomPage2.avgTag).toHaveText('平均?');
  await expect(roomPage2.maxTag).toHaveText('最大?');
  await expect(roomPage3.minTag).toHaveText('最小?');
  await expect(roomPage3.avgTag).toHaveText('平均?');
  await expect(roomPage3.maxTag).toHaveText('最大?');

  // When - カードを選択
  await roomPage1.selectCard('0');
  await roomPage2.selectCard('4');
  await roomPage3.selectCard('6');

  // Then - カードを選択してもオープンしていなければ「？」
  await expect(roomPage1.minTag).toHaveText('最小?');
  await expect(roomPage1.avgTag).toHaveText('平均?');
  await expect(roomPage1.maxTag).toHaveText('最大?');
  await expect(roomPage2.minTag).toHaveText('最小?');
  await expect(roomPage2.avgTag).toHaveText('平均?');
  await expect(roomPage2.maxTag).toHaveText('最大?');
  await expect(roomPage3.minTag).toHaveText('最小?');
  await expect(roomPage3.avgTag).toHaveText('平均?');
  await expect(roomPage3.maxTag).toHaveText('最大?');
});

test('ルームページで、0-10デッキを選択しており、カードをオープンしたとき、場に出されたカードの最大値、最小値、平均値が表示されること', async ({
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

  await expect(roomPage1.minTag).toHaveText('最小?');
  await expect(roomPage1.avgTag).toHaveText('平均?');
  await expect(roomPage1.maxTag).toHaveText('最大?');
  await expect(roomPage2.minTag).toHaveText('最小?');
  await expect(roomPage2.avgTag).toHaveText('平均?');
  await expect(roomPage2.maxTag).toHaveText('最大?');
  await expect(roomPage3.minTag).toHaveText('最小?');
  await expect(roomPage3.avgTag).toHaveText('平均?');
  await expect(roomPage3.maxTag).toHaveText('最大?');

  // When
  await roomPage1.openCards();

  // Then
  await expect(roomPage1.minTag).toHaveText('最小3');
  await expect(roomPage1.avgTag).toHaveText('平均5.7');
  await expect(roomPage1.maxTag).toHaveText('最大9');
  await expect(roomPage2.minTag).toHaveText('最小3');
  await expect(roomPage2.avgTag).toHaveText('平均5.7');
  await expect(roomPage2.maxTag).toHaveText('最大9');
  await expect(roomPage3.minTag).toHaveText('最小3');
  await expect(roomPage3.avgTag).toHaveText('平均5.7');
  await expect(roomPage3.maxTag).toHaveText('最大9');
});

test('ルームページで、Tシャツサイズデッキを選択しているとき、サマリーは表示されないこと', async ({
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

test('ルームページで、カードを出していないプレイヤーがいる状態で、カードをオープンにしたとき、場に出されたカードの最大値、最小値、平均値が正しく表示されること', async ({
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

  await expect(roomPage1.minTag).toHaveText('最小?');
  await expect(roomPage1.avgTag).toHaveText('平均?');
  await expect(roomPage1.maxTag).toHaveText('最大?');
  await expect(roomPage2.minTag).toHaveText('最小?');
  await expect(roomPage2.avgTag).toHaveText('平均?');
  await expect(roomPage2.maxTag).toHaveText('最大?');
  await expect(roomPage3.minTag).toHaveText('最小?');
  await expect(roomPage3.avgTag).toHaveText('平均?');
  await expect(roomPage3.maxTag).toHaveText('最大?');

  // When
  await roomPage1.openCards();

  // Then
  await expect(roomPage1.minTag).toHaveText('最小2');
  await expect(roomPage1.avgTag).toHaveText('平均2.5');
  await expect(roomPage1.maxTag).toHaveText('最大3');
  await expect(roomPage2.minTag).toHaveText('最小2');
  await expect(roomPage2.avgTag).toHaveText('平均2.5');
  await expect(roomPage2.maxTag).toHaveText('最大3');
  await expect(roomPage3.minTag).toHaveText('最小2');
  await expect(roomPage3.avgTag).toHaveText('平均2.5');
  await expect(roomPage3.maxTag).toHaveText('最大3');
});

test('ルームページで、「？」のカードがある状態で、カードをオープンしたとき、場に出されたカードの最大値、最小値、平均値が正しく表示されること', async ({
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

  await expect(roomPage1.minTag).toHaveText('最小?');
  await expect(roomPage1.avgTag).toHaveText('平均?');
  await expect(roomPage1.maxTag).toHaveText('最大?');
  await expect(roomPage2.minTag).toHaveText('最小?');
  await expect(roomPage2.avgTag).toHaveText('平均?');
  await expect(roomPage2.maxTag).toHaveText('最大?');
  await expect(roomPage3.minTag).toHaveText('最小?');
  await expect(roomPage3.avgTag).toHaveText('平均?');
  await expect(roomPage3.maxTag).toHaveText('最大?');

  // When
  await roomPage1.openCards();

  // Then
  await expect(roomPage1.minTag).toHaveText('最小1');
  await expect(roomPage1.avgTag).toHaveText('平均1.5');
  await expect(roomPage1.maxTag).toHaveText('最大2');
  await expect(roomPage2.minTag).toHaveText('最小1');
  await expect(roomPage2.avgTag).toHaveText('平均1.5');
  await expect(roomPage2.maxTag).toHaveText('最大2');
  await expect(roomPage3.minTag).toHaveText('最小1');
  await expect(roomPage3.avgTag).toHaveText('平均1.5');
  await expect(roomPage3.maxTag).toHaveText('最大2');
});

test('ルームページで、カードをオープンにしたあとで、プレイヤーがオーディエンスに変わっても、場に出されたカードの最大値、最小値、平均値が再計算され正しく表示されること', async ({
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

  await expect(roomPage1.minTag).toHaveText('最小3');
  await expect(roomPage1.avgTag).toHaveText('平均7');
  await expect(roomPage1.maxTag).toHaveText('最大13');
  await expect(roomPage2.minTag).toHaveText('最小3');
  await expect(roomPage2.avgTag).toHaveText('平均7');
  await expect(roomPage2.maxTag).toHaveText('最大13');
  await expect(roomPage3.minTag).toHaveText('最小3');
  await expect(roomPage3.avgTag).toHaveText('平均7');
  await expect(roomPage3.maxTag).toHaveText('最大13');

  // When
  await roomPage3.selectUserType('audience');

  // Then
  await expect(roomPage1.minTag).toHaveText('最小3');
  await expect(roomPage1.avgTag).toHaveText('平均4');
  await expect(roomPage1.maxTag).toHaveText('最大5');
  await expect(roomPage2.minTag).toHaveText('最小3');
  await expect(roomPage2.avgTag).toHaveText('平均4');
  await expect(roomPage2.maxTag).toHaveText('最大5');
  await expect(roomPage3.minTag).toHaveText('最小3');
  await expect(roomPage3.avgTag).toHaveText('平均4');
  await expect(roomPage3.maxTag).toHaveText('最大5');
});
