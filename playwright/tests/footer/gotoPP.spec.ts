import { expect, test } from '@playwright/test';
import TopPage from '../../models/top-page';
import RoomPage from '../../models/room-page';
import TOSPage from '../../models/tos-page';
import urls from '../../helpers/urls';
import createRoomId from '../../helpers/createRoomId';

test('トップページで、フッターのプライバシーポリシーリンクを選択したとき、プライバシーポリシーページに遷移すること', async ({
  page,
}) => {
  // Given
  const topPage = new TopPage(page);
  await topPage.goto();

  // When
  await topPage.gotoPP();

  // Then
  await expect(page).toHaveURL(urls.pp);
});

test('ルームページで、フッターのプライバシーポリシーリンクを選択したとき、プライバシーポリシーページに遷移すること', async ({
  page,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage = new RoomPage(page);
  await roomPage.goto(roomId);

  // When
  await roomPage.gotoPP();

  // Then
  await expect(page).toHaveURL(urls.pp);
});

test('利用規約ページで、フッターのプライバシーポリシーリンクを選択したとき、プライバシーポリシーページに遷移すること', async ({
  page,
}) => {
  // Given
  const tosPage = new TOSPage(page);
  await tosPage.goto();

  // When
  await tosPage.gotoPP();

  // Then
  await expect(page).toHaveURL(urls.pp);
});
