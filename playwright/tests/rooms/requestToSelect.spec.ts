import { test, expect } from '@playwright/test';
import createRoomId from '../../helpers/createRoomId';
import RoomPage from '../../models/room-page';

test('ルームページで、「早く選んで」ボタンを選択したとき、呼びかけましたトーストが表示されること', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  const roomPage3: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage1.selectCard('0');
  await roomPage2.goto(roomId);
  await roomPage3.goto(roomId);
  await roomPage3.selectUserType('audience');

  // When
  await roomPage1.requestToSelect();

  // Then
  await expect(roomPage1.haveRequestedToSelectToast).toBeVisible();
  await expect(roomPage2.haveRequestedToSelectToast).not.toBeVisible();
  await expect(roomPage3.haveRequestedToSelectToast).not.toBeVisible();

  // Then - Toastは少ししたら消える
  await expect(roomPage1.haveRequestedToSelectToast).not.toBeVisible();
});

test('ルームページで、「早く選んで」ボタンを選択したとき、まだカードを選んでいないプレイヤーに催促のトーストが表示されて音が鳴ること', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage1: RoomPage = new RoomPage(await context.newPage());
  const roomPage2: RoomPage = new RoomPage(await context.newPage());
  const roomPage3: RoomPage = new RoomPage(await context.newPage());
  await roomPage1.goto(roomId);
  await roomPage1.selectCard('0');
  await roomPage2.goto(roomId);
  await roomPage3.goto(roomId);
  await roomPage3.selectUserType('audience');

  // When
  await roomPage1.requestToSelect();

  // Then
  await expect(roomPage1.hadBeenRequestedToSelectToast).not.toBeVisible();
  await expect(roomPage2.hadBeenRequestedToSelectToast).toBeVisible();
  await expect(roomPage3.hadBeenRequestedToSelectToast).not.toBeVisible();

  // Then - Toastは少ししたら消える
  await expect(roomPage2.hadBeenRequestedToSelectToast).not.toBeVisible();
});

test('ルームページで、カードをオープンにしたとき、「早く選んで」ボタンは表示されないこと', async ({
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

test('ルームページで、全プレイヤーがカードを出しているとき、「早く選んで」ボタンは選択できないこと', async ({
  context,
}) => {
  // Given
  // When
  // Then
});
