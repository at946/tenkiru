import { expect, test } from '@playwright/test';
import TopPage from '../../models/top-page';
import RoomPage from '../../models/room-page';
import TOSPage from '../../models/tos-page';
import PPPage from '../../models/pp-page';
import urls from '../../helpers/urls';
import createRoomId from '../../helpers/createRoomId';

test('トップページで、フッターのプライバシーポリシーリンクを選択したとき、プライバシーポリシーページに遷移すること', async ({
  page,
}) => {
  // Given
  const topPage: TopPage = new TopPage(page);
  await topPage.goto();

  // When
  await topPage.clickFooterPPLink();

  // Then
  await expect(page).toHaveURL(urls.pp);
});

test('ルームページで、フッターのプライバシーポリシーリンクを選択したとき、プライバシーポリシーページに遷移すること', async ({
  page,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage: RoomPage = new RoomPage(page);
  await roomPage.goto(roomId);

  // When
  await roomPage.clickFooterPPLink();

  // Then
  await expect(page).toHaveURL(urls.pp);
});

test('利用規約ページで、フッターのプライバシーポリシーリンクを選択したとき、プライバシーポリシーページに遷移すること', async ({
  page,
}) => {
  // Given
  const tosPage: TOSPage = new TOSPage(page);
  await tosPage.goto();

  // When
  await tosPage.clickFooterPPLink();

  // Then
  await expect(page).toHaveURL(urls.pp);
});

test('プライバシーポリシーページで、フッターのプライバシーポリシーリンクを選択したとき、どこにも遷移しないこと', async ({
  page,
}) => {
  // Given
  const ppPage: PPPage = new PPPage(page);
  await ppPage.goto();

  // When
  await ppPage.clickFooterPPLink();

  // Then
  await expect(page).toHaveURL(urls.pp);
});
