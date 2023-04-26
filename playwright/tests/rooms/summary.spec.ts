import { test, expect } from '@playwright/test';
import RoomPage from '../../models/room-page';
import createRoomId from '../../helpers/createRoomId';

test('ルームページで、カードをオープンしたとき、場に出されたカードの最大値、最小値、平均値が表示されること', async ({
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

  await expect(roomPage1.minTag).not.toBeVisible();
  await expect(roomPage1.avgTag).not.toBeVisible();
  await expect(roomPage1.maxTag).not.toBeVisible();
  await expect(roomPage2.minTag).not.toBeVisible();
  await expect(roomPage2.avgTag).not.toBeVisible();
  await expect(roomPage2.maxTag).not.toBeVisible();
  await expect(roomPage3.minTag).not.toBeVisible();
  await expect(roomPage3.avgTag).not.toBeVisible();
  await expect(roomPage3.maxTag).not.toBeVisible();

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

  await expect(roomPage1.minTag).not.toBeVisible();
  await expect(roomPage1.avgTag).not.toBeVisible();
  await expect(roomPage1.maxTag).not.toBeVisible();
  await expect(roomPage2.minTag).not.toBeVisible();
  await expect(roomPage2.avgTag).not.toBeVisible();
  await expect(roomPage2.maxTag).not.toBeVisible();
  await expect(roomPage3.minTag).not.toBeVisible();
  await expect(roomPage3.avgTag).not.toBeVisible();
  await expect(roomPage3.maxTag).not.toBeVisible();

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

  await expect(roomPage1.minTag).not.toBeVisible();
  await expect(roomPage1.avgTag).not.toBeVisible();
  await expect(roomPage1.maxTag).not.toBeVisible();
  await expect(roomPage2.minTag).not.toBeVisible();
  await expect(roomPage2.avgTag).not.toBeVisible();
  await expect(roomPage2.maxTag).not.toBeVisible();
  await expect(roomPage3.minTag).not.toBeVisible();
  await expect(roomPage3.avgTag).not.toBeVisible();
  await expect(roomPage3.maxTag).not.toBeVisible();

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
  await roomPage3.selectMemberType('観客');

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

test('ルームページで、場に数字のカードが出ていないとき、サマリーが表示されないこと', async ({
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
  await roomPage1.selectDeck('Tシャツサイズ');
  await roomPage1.selectCard('S');
  await roomPage2.selectCard('M');
  await roomPage3.selectCard('L');

  await expect(roomPage1.minTag).not.toBeVisible();
  await expect(roomPage1.avgTag).not.toBeVisible();
  await expect(roomPage1.maxTag).not.toBeVisible();
  await expect(roomPage2.minTag).not.toBeVisible();
  await expect(roomPage2.avgTag).not.toBeVisible();
  await expect(roomPage2.maxTag).not.toBeVisible();
  await expect(roomPage3.minTag).not.toBeVisible();
  await expect(roomPage3.avgTag).not.toBeVisible();
  await expect(roomPage3.maxTag).not.toBeVisible();

  // When
  await roomPage1.openCards();

  // Then
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
