import { expect, test } from '@playwright/test';
import TopPage from '../../models/top-page';
import RoomPage from '../../models/room-page';
import PPPage from '../../models/pp-page';
import urls from '../../helpers/urls';
import createRoomId from '../../helpers/createRoomId';

test('トップページで、フッターの利用規約リンクを選択したとき、利用規約ページに遷移すること', async ({
  page,
}) => {
  // Given
  const topPage = new TopPage(page);
  await topPage.goto();

  // When
  await topPage.gotoTOS();

  // Then
  await expect(page).toHaveURL(urls.tos);
});

test('ルームページで、フッターの利用規約リンクを選択したとき、利用規約ページに遷移すること', async ({
  page,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage = new RoomPage(page);
  await roomPage.goto(roomId);

  // When
  await roomPage.gotoTOS();

  // Then
  await expect(page).toHaveURL(urls.tos);
});

test('プライバシーポリシーページで、フッターの利用規約リンクを選択したとき、利用規約ページに遷移すること', async ({
  page,
}) => {
  // Given
  const ppPage = new PPPage(page);
  await ppPage.goto();

  // When
  await ppPage.gotoTOS();

  // Then
  await expect(page).toHaveURL(urls.tos);
});
