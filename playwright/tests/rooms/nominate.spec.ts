import { test, expect, Page } from '@playwright/test';
import RoomPage from '../../models/room-page';
import createRoomId from '../../helpers/createRoomId';

test('ルームページで、カードをオープンしているとき、「指名」ボタンがカードの下に表示されること', async ({
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

  await expect(roomPage1.tableCardSetByNth(0).nominateButton).not.toBeVisible();
  await expect(roomPage1.tableCardSetByNth(1).nominateButton).not.toBeVisible();
  await expect(roomPage1.tableCardSetByNth(2).nominateButton).not.toBeVisible();

  await expect(roomPage2.tableCardSetByNth(0).nominateButton).not.toBeVisible();
  await expect(roomPage2.tableCardSetByNth(1).nominateButton).not.toBeVisible();
  await expect(roomPage2.tableCardSetByNth(2).nominateButton).not.toBeVisible();

  await expect(roomPage3.tableCardSetByNth(0).nominateButton).not.toBeVisible();
  await expect(roomPage3.tableCardSetByNth(1).nominateButton).not.toBeVisible();
  await expect(roomPage3.tableCardSetByNth(2).nominateButton).not.toBeVisible();

  // When - カードをオープンする
  await roomPage1.openCards();

  // Then - オープンしたカードには「指名」ボタンが表示される
  await expect(roomPage1.tableCardSetByNth(0).nominateButton).toBeVisible();
  await expect(roomPage1.tableCardSetByNth(1).nominateButton).toBeVisible();
  await expect(roomPage1.tableCardSetByNth(2).nominateButton).not.toBeVisible();

  await expect(roomPage2.tableCardSetByNth(0).nominateButton).toBeVisible();
  await expect(roomPage2.tableCardSetByNth(1).nominateButton).toBeVisible();
  await expect(roomPage2.tableCardSetByNth(2).nominateButton).not.toBeVisible();

  await expect(roomPage3.tableCardSetByNth(0).nominateButton).toBeVisible();
  await expect(roomPage3.tableCardSetByNth(1).nominateButton).toBeVisible();
  await expect(roomPage3.tableCardSetByNth(2).nominateButton).not.toBeVisible();
});

test('ルームページで、自分以外の出したカードの「指名」ボタンを選択したとき、そのカードを場に出したメンバーに「指名アラート」が表示されること', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const page1: Page = await context.newPage();
  const page2: Page = await context.newPage();
  const page3: Page = await context.newPage();
  const roomPage1: RoomPage = new RoomPage(page1);
  const roomPage2: RoomPage = new RoomPage(page2);
  const roomPage3: RoomPage = new RoomPage(page3);
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
  await expect(page1.getByText('指名しました！')).not.toBeVisible();
  await expect(page2.getByText('指名しました！')).toBeVisible();
  await expect(page3.getByText('指名しました！')).not.toBeVisible();
  // 指名されたユーザーのみ、「指名されました」トーストが表示される
  await expect(page1.getByText('指名されました！🎉')).toBeVisible();
  await expect(page2.getByText('指名されました！🎉')).not.toBeVisible();
  await expect(page3.getByText('指名されました！🎉')).not.toBeVisible();
  // トーストは時間が経つと消える
  await expect(page2.getByText('指名しました！')).not.toBeVisible();
  await expect(page1.getByText('指名されました！🎉')).not.toBeVisible();
});

test('ルームページで、自分の出したカードの「指名」ボタンを選択したとき、自分に「指名アラート」が表示されること', async ({
  context,
}) => {
  // Given
  const roomId: string = createRoomId();
  const page1: Page = await context.newPage();
  const page2: Page = await context.newPage();
  const page3: Page = await context.newPage();
  const roomPage1: RoomPage = new RoomPage(page1);
  const roomPage2: RoomPage = new RoomPage(page2);
  const roomPage3: RoomPage = new RoomPage(page3);
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
  await expect(page1.getByText('指名しました！')).toBeVisible();
  await expect(page2.getByText('指名しました！')).not.toBeVisible();
  await expect(page3.getByText('指名しました！')).not.toBeVisible();
  // 指名されたユーザーのみ、「指名されました」トーストが表示される
  await expect(page1.getByText('指名されました！🎉')).toBeVisible();
  await expect(page2.getByText('指名されました！🎉')).not.toBeVisible();
  await expect(page3.getByText('指名されました！🎉')).not.toBeVisible();
  // トーストは時間が経つと消える
  await expect(page1.getByText('指名しました！')).not.toBeVisible();
  await expect(page1.getByText('指名されました！🎉')).not.toBeVisible();
});
