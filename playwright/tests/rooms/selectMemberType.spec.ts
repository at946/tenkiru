import { test, expect } from '@playwright/test';
import RoomPage from '../../models/room-page';
import createRoomId from '../../helpers/createRoomId';

test('ルームページで、デフォルトで「プレイヤー」が選択されていること', async ({ page }) => {
  // Given
  const roomPage: RoomPage = new RoomPage(page);

  // When
  await roomPage.goto(createRoomId());

  // Then
  await expect(roomPage.memberTypeSelect).toHaveValue('player');
});

test('ルームページで、「プレイヤー」選択中かつカード未選択かつカード未オープンの状態で、「観客」を選択したとき、自分のテーブルカードが消え、手札カードを選べなくなること', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);

  await expect(roomPage1.memberTypeSelect).toHaveValue('player');
  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.blankTableCards).toHaveCount(2);
  await expect(roomPage1.disabledHandsCard).toHaveCount(0);

  await expect(roomPage2.memberTypeSelect).toHaveValue('player');
  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.blankTableCards).toHaveCount(2);
  await expect(roomPage2.disabledHandsCard).toHaveCount(0);

  // When
  await roomPage1.selectMemberType('audience');

  // Then
  await expect(roomPage1.memberTypeSelect).toHaveValue('audience');
  await expect(roomPage1.tableCards).toHaveCount(1);
  await expect(roomPage1.blankTableCards).toHaveCount(1);
  await expect(roomPage1.disabledHandsCard).toHaveCount(await roomPage1.handsCards.count());

  await expect(roomPage2.memberTypeSelect).toHaveValue('player');
  await expect(roomPage2.tableCards).toHaveCount(1);
  await expect(roomPage2.blankTableCards).toHaveCount(1);
  await expect(roomPage2.disabledHandsCard).toHaveCount(0);
});

test('ルームページで、「プレイヤー」選択中かつカード選択済みかつカード未オープンの状態で、「観客」を選択したとき、自分のテーブルカードが消え、手札カードの選択が解除され、手札カードを選べなくなること', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);
  await roomPage1.selectCard('0');
  await roomPage2.selectCard('13');

  await expect(roomPage1.memberTypeSelect).toHaveValue('player');
  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.faceDownTableCards).toHaveCount(2);
  await expect(roomPage1.disabledHandsCard).toHaveCount(0);
  await expect(roomPage1.selectedHandsCard).toHaveCount(1);

  await expect(roomPage2.memberTypeSelect).toHaveValue('player');
  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.faceDownTableCards).toHaveCount(2);
  await expect(roomPage2.disabledHandsCard).toHaveCount(0);
  await expect(roomPage2.selectedHandsCard).toHaveCount(1);

  // When
  await roomPage1.selectMemberType('audience');

  // Then
  await expect(roomPage1.memberTypeSelect).toHaveValue('audience');
  await expect(roomPage1.tableCards).toHaveCount(1);
  await expect(roomPage1.faceDownTableCards).toHaveCount(1);
  await expect(roomPage1.disabledHandsCard).toHaveCount(await roomPage1.handsCards.count());
  await expect(roomPage1.selectedHandsCard).toHaveCount(0);

  await expect(roomPage2.memberTypeSelect).toHaveValue('player');
  await expect(roomPage2.tableCards).toHaveCount(1);
  await expect(roomPage2.faceDownTableCards).toHaveCount(1);
  await expect(roomPage2.disabledHandsCard).toHaveCount(0);
  await expect(roomPage2.selectedHandsCard).toHaveCount(1);
});

test('ルームページで、「プレイヤー」選択中かつカード未選択かつカードオープン済みの状態で、「観客」を選択したとき、自分のテーブルカードが消え、手札カードを選べなくなること', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);
  await roomPage2.selectCard('13');
  await roomPage1.openCards();

  await expect(roomPage1.memberTypeSelect).toHaveValue('player');
  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.blankTableCards).toHaveCount(1);
  await expect(roomPage1.faceUpTableCards).toHaveCount(1);
  await expect(roomPage1.disabledHandsCard).toHaveCount(await roomPage1.handsCards.count());
  await expect(roomPage1.selectedHandsCard).toHaveCount(0);

  await expect(roomPage2.memberTypeSelect).toHaveValue('player');
  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.blankTableCards).toHaveCount(1);
  await expect(roomPage2.faceUpTableCards).toHaveCount(1);
  await expect(roomPage2.disabledHandsCard).toHaveCount(await roomPage2.handsCards.count());
  await expect(roomPage2.selectedHandsCard).toHaveCount(1);

  // When
  await roomPage1.selectMemberType('audience');

  // Then
  await expect(roomPage1.memberTypeSelect).toHaveValue('audience');
  await expect(roomPage1.tableCards).toHaveCount(1);
  await expect(roomPage1.faceUpTableCards).toHaveCount(1);
  await expect(roomPage1.disabledHandsCard).toHaveCount(await roomPage1.handsCards.count());
  await expect(roomPage1.selectedHandsCard).toHaveCount(0);

  await expect(roomPage2.memberTypeSelect).toHaveValue('player');
  await expect(roomPage2.tableCards).toHaveCount(1);
  await expect(roomPage2.faceUpTableCards).toHaveCount(1);
  await expect(roomPage2.disabledHandsCard).toHaveCount(await roomPage2.handsCards.count());
  await expect(roomPage2.selectedHandsCard).toHaveCount(1);
});

test('ルームページで、「プレイヤー」選択中かつカード選択済みかつカードオープン済みの状態で、「観客」を選択したとき、自分のテーブルカードが消え、手札カードの選択が解除され、手札カードを選べなくなること', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);
  await roomPage1.selectCard('0');
  await roomPage2.selectCard('13');
  await roomPage1.openCards();

  await expect(roomPage1.memberTypeSelect).toHaveValue('player');
  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.faceUpTableCards).toHaveCount(2);
  await expect(roomPage1.disabledHandsCard).toHaveCount(await roomPage1.handsCards.count());
  await expect(roomPage1.selectedHandsCard).toHaveCount(1);

  await expect(roomPage2.memberTypeSelect).toHaveValue('player');
  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.faceUpTableCards).toHaveCount(2);
  await expect(roomPage2.disabledHandsCard).toHaveCount(await roomPage2.handsCards.count());
  await expect(roomPage2.selectedHandsCard).toHaveCount(1);

  // When
  await roomPage1.selectMemberType('audience');

  // Then
  await expect(roomPage1.memberTypeSelect).toHaveValue('audience');
  await expect(roomPage1.tableCards).toHaveCount(1);
  await expect(roomPage1.faceUpTableCards).toHaveCount(1);
  await expect(roomPage1.disabledHandsCard).toHaveCount(await roomPage1.handsCards.count());
  await expect(roomPage1.selectedHandsCard).toHaveCount(0);

  await expect(roomPage2.memberTypeSelect).toHaveValue('player');
  await expect(roomPage2.tableCards).toHaveCount(1);
  await expect(roomPage2.faceUpTableCards).toHaveCount(1);
  await expect(roomPage2.disabledHandsCard).toHaveCount(await roomPage2.handsCards.count());
  await expect(roomPage2.selectedHandsCard).toHaveCount(1);
});

test('ルームページで、「観客」選択中かつカード未オープンの状態で、「プレイヤー」を選択したとき、自分のテーブルカードが現れ、手札カードを選べるようになること', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);
  await roomPage1.selectMemberType('audience');
  await roomPage2.selectCard('5');

  await expect(roomPage1.memberTypeSelect).toHaveValue('audience');
  await expect(roomPage1.tableCards).toHaveCount(1);
  await expect(roomPage1.faceDownTableCards).toHaveCount(1);
  await expect(roomPage1.disabledHandsCard).toHaveCount(await roomPage1.handsCards.count());
  await expect(roomPage1.selectedHandsCard).toHaveCount(0);

  await expect(roomPage2.memberTypeSelect).toHaveValue('player');
  await expect(roomPage2.tableCards).toHaveCount(1);
  await expect(roomPage2.faceDownTableCards).toHaveCount(1);
  await expect(roomPage2.disabledHandsCard).toHaveCount(0);
  await expect(roomPage2.selectedHandsCard).toHaveCount(1);

  // When
  await roomPage1.selectMemberType('player');

  // Then
  await expect(roomPage1.memberTypeSelect).toHaveValue('player');
  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.blankTableCards).toHaveCount(1);
  await expect(roomPage1.faceDownTableCards).toHaveCount(1);
  await expect(roomPage1.disabledHandsCard).toHaveCount(0);
  await expect(roomPage1.selectedHandsCard).toHaveCount(0);

  await expect(roomPage2.memberTypeSelect).toHaveValue('player');
  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.blankTableCards).toHaveCount(1);
  await expect(roomPage2.faceDownTableCards).toHaveCount(1);
  await expect(roomPage2.disabledHandsCard).toHaveCount(0);
  await expect(roomPage2.selectedHandsCard).toHaveCount(1);
});

test('ルームページで、「観客」選択中かつカードオープン済みの状態で、「プレイヤー」を選択したとき、自分のテーブルカードが現れること', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);
  await roomPage1.selectMemberType('audience');
  await roomPage2.selectCard('5');
  await roomPage1.openCards();

  await expect(roomPage1.memberTypeSelect).toHaveValue('audience');
  await expect(roomPage1.tableCards).toHaveCount(1);
  await expect(roomPage1.faceUpTableCards).toHaveCount(1);
  await expect(roomPage1.disabledHandsCard).toHaveCount(await roomPage1.handsCards.count());
  await expect(roomPage1.selectedHandsCard).toHaveCount(0);

  await expect(roomPage2.memberTypeSelect).toHaveValue('player');
  await expect(roomPage2.tableCards).toHaveCount(1);
  await expect(roomPage2.faceUpTableCards).toHaveCount(1);
  await expect(roomPage2.disabledHandsCard).toHaveCount(await roomPage2.handsCards.count());
  await expect(roomPage2.selectedHandsCard).toHaveCount(1);

  // When
  await roomPage1.selectMemberType('player');

  // Then
  await expect(roomPage1.memberTypeSelect).toHaveValue('player');
  await expect(roomPage1.tableCards).toHaveCount(2);
  await expect(roomPage1.blankTableCards).toHaveCount(1);
  await expect(roomPage1.faceUpTableCards).toHaveCount(1);
  await expect(roomPage1.disabledHandsCard).toHaveCount(await roomPage1.handsCards.count());
  await expect(roomPage1.selectedHandsCard).toHaveCount(0);

  await expect(roomPage2.memberTypeSelect).toHaveValue('player');
  await expect(roomPage2.tableCards).toHaveCount(2);
  await expect(roomPage2.blankTableCards).toHaveCount(1);
  await expect(roomPage2.faceUpTableCards).toHaveCount(1);
  await expect(roomPage2.disabledHandsCard).toHaveCount(await roomPage2.handsCards.count());
  await expect(roomPage2.selectedHandsCard).toHaveCount(1);
});

test('ルームページで、メンバーが自分ひとりのときに「観客」を選択しても問題ないこと', async ({
  page,
}) => {
  // Given
  const roomPage: RoomPage = new RoomPage(page);
  await roomPage.goto(createRoomId());
  await roomPage.selectCard('1');

  await expect(roomPage.memberTypeSelect).toHaveValue('player');
  await expect(roomPage.tableCards).toHaveCount(1);
  await expect(roomPage.faceDownTableCards).toHaveCount(1);
  await expect(roomPage.disabledHandsCard).toHaveCount(0);
  await expect(roomPage.selectedHandsCard).toHaveCount(1);

  // When
  await roomPage.selectMemberType('audience');

  // Then
  await expect(roomPage.memberTypeSelect).toHaveValue('audience');
  await expect(roomPage.tableCards).toHaveCount(0);
  await expect(roomPage.disabledHandsCard).toHaveCount(await roomPage.handsCards.count());
  await expect(roomPage.selectedHandsCard).toHaveCount(0);

  // When
  await roomPage.selectMemberType('player');

  // Then
  await expect(roomPage.memberTypeSelect).toHaveValue('player');
  await expect(roomPage.tableCards).toHaveCount(1);
  await expect(roomPage.blankTableCards).toHaveCount(1);
  await expect(roomPage.disabledHandsCard).toHaveCount(0);
  await expect(roomPage.selectedHandsCard).toHaveCount(0);
});
