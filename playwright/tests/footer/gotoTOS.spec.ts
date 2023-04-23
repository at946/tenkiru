import { expect, test } from '@playwright/test';
import TopPage from '../../models/top-page';
import RoomPage from '../../models/room-page';
import TOSPage from '../../models/tos-page';
import PPPage from '../../models/pp-page';
import urls from '../../helpers/urls';
import createRoomId from '../../helpers/createRoomId';

test('トップページで、フッターの利用規約リンクを選択したとき、利用規約ページに遷移すること', async ({
  page,
}) => {
  // Given
  const topPage: TopPage = new TopPage(page);
  await topPage.goto();

  // When
  await topPage.clickFooterTOSLink();

  // Then
  await expect(page).toHaveURL(urls.tos);
});

test('ルームページで、フッターの利用規約リンクを選択したとき、利用規約ページに遷移すること', async ({
  page,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage: RoomPage = new RoomPage(page);
  await roomPage.goto(roomId);

  // When
  await roomPage.clickFooterTOSLink();

  // Then
  await expect(page).toHaveURL(urls.tos);
});

test('利用規約ページで、フッターの利用規約リンクを選択したとき、どこにも遷移しないこと', async ({
  page,
}) => {
  // Given
  const tosPage: TOSPage = new TOSPage(page);
  await tosPage.goto();

  // When
  await tosPage.clickFooterTOSLink();

  // Then
  await expect(page).toHaveURL(urls.tos);
});

test('プライバシーポリシーページで、フッターの利用規約リンクを選択したとき、利用規約ページに遷移すること', async ({
  page,
}) => {
  // Given
  const ppPage: PPPage = new PPPage(page);
  await ppPage.goto();

  // When
  await ppPage.clickFooterTOSLink();

  // Then
  await expect(page).toHaveURL(urls.tos);
});
