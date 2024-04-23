import { expect, test } from '@playwright/test';
import createRoomId from '../../helpers/createRoomId';
import RoomPage from '../../models/room-page';

test('ルームページで、カードをオープンしていないとき、「指名」ボタンは選択できないこと', async ({ context }) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage2.goto(roomId);
  await roomPage1.selectCard('0');

  // Then
  await expect(roomPage1.nominateButtons).toHaveCount(2);
  await expect(roomPage1.nominateButtons.nth(0)).toBeDisabled();
  await expect(roomPage1.nominateButtons.nth(1)).toBeDisabled();

  await expect(roomPage2.nominateButtons).toHaveCount(2);
  await expect(roomPage2.nominateButtons.nth(0)).toBeDisabled();
  await expect(roomPage2.nominateButtons.nth(1)).toBeDisabled();
});

test('ルームページで、カードをオープンしているとき、オープンしたカードの「指名」ボタンは選択可能になること', async ({
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

  await expect(roomPage1.nominateButtons).toHaveCount(3);
  await expect(roomPage1.nominateButtons.nth(0)).toBeDisabled();
  await expect(roomPage1.nominateButtons.nth(1)).toBeDisabled();
  await expect(roomPage1.nominateButtons.nth(2)).toBeDisabled();

  await expect(roomPage2.nominateButtons).toHaveCount(3);
  await expect(roomPage2.nominateButtons.nth(0)).toBeDisabled();
  await expect(roomPage2.nominateButtons.nth(1)).toBeDisabled();
  await expect(roomPage2.nominateButtons.nth(2)).toBeDisabled();

  await expect(roomPage3.nominateButtons).toHaveCount(3);
  await expect(roomPage3.nominateButtons.nth(0)).toBeDisabled();
  await expect(roomPage3.nominateButtons.nth(1)).toBeDisabled();
  await expect(roomPage3.nominateButtons.nth(2)).toBeDisabled();

  // When - カードをオープンする
  await roomPage1.openCards();

  // Then - オープンしたカードには「指名」ボタンが表示される
  await expect(roomPage1.nominateButtons).toHaveCount(3);
  await expect(roomPage1.nominateButtons.nth(0)).not.toBeDisabled();
  await expect(roomPage1.nominateButtons.nth(1)).not.toBeDisabled();
  await expect(roomPage1.nominateButtons.nth(2)).toBeDisabled();

  await expect(roomPage2.nominateButtons).toHaveCount(3);
  await expect(roomPage2.nominateButtons.nth(0)).not.toBeDisabled();
  await expect(roomPage2.nominateButtons.nth(1)).not.toBeDisabled();
  await expect(roomPage2.nominateButtons.nth(2)).toBeDisabled();

  await expect(roomPage3.nominateButtons).toHaveCount(3);
  await expect(roomPage3.nominateButtons.nth(0)).not.toBeDisabled();
  await expect(roomPage3.nominateButtons.nth(1)).not.toBeDisabled();
  await expect(roomPage3.nominateButtons.nth(2)).toBeDisabled();
});

test('ルームページで、自分以外の出したカードの「指名」ボタンを選択したとき、そのカードを場に出したメンバーに「指名トースト」が表示されること', async ({
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
  await roomPage2.nominateByCard('0');

  // Then
  // 指名ボタンを押したユーザーのみ、「指名しました」トーストが表示される
  await expect(roomPage1.haveNominatedToast).not.toBeVisible();
  await expect(roomPage2.haveNominatedToast).toBeVisible();
  await expect(roomPage3.haveNominatedToast).not.toBeVisible();
  // 指名されたユーザーのみ、「指名されました」トーストが表示される
  await expect(roomPage1.haveBeenNominatedToast).toBeVisible();
  await expect(roomPage2.haveBeenNominatedToast).not.toBeVisible();
  await expect(roomPage3.haveBeenNominatedToast).not.toBeVisible();
  // トーストは時間が経つと消える
  await expect(roomPage2.haveNominatedToast).not.toBeVisible();
  await expect(roomPage1.haveBeenNominatedToast).not.toBeVisible();
});

test('ルームページで、自分の出したカードの「指名」ボタンを選択したとき、自分に「指名トースト」が表示されること', async ({
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
  await roomPage1.nominateByCard('0');

  // Then
  // 指名ボタンを押したユーザーのみ、「指名しました」トーストが表示される
  await expect(roomPage1.haveNominatedToast).toBeVisible();
  await expect(roomPage2.haveNominatedToast).not.toBeVisible();
  await expect(roomPage3.haveNominatedToast).not.toBeVisible();
  // 指名されたユーザーのみ、「指名されました」トーストが表示される
  await expect(roomPage1.haveBeenNominatedToast).toBeVisible();
  await expect(roomPage2.haveBeenNominatedToast).not.toBeVisible();
  await expect(roomPage3.haveBeenNominatedToast).not.toBeVisible();
  // トーストは時間が経つと消える
  await expect(roomPage1.haveNominatedToast).not.toBeVisible();
  await expect(roomPage1.haveBeenNominatedToast).not.toBeVisible();
});
