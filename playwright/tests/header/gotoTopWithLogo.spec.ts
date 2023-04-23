import { test, expect } from '@playwright/test';
import TopPage from '../../models/top-page';
import RoomPage from '../../models/room-page';
import TOSPage from '../../models/tos-page';
import PPPage from '../../models/pp-page';
import createRoomId from '../../helpers/createRoomId';
import urls from '../../helpers/urls';
import usersJoinRoom from '../../helpers/usersJoinRoom';

test('トップページで、ヘッダーのロゴを選択したとき、どこにも遷移しないこと', async ({ page }) => {
  // Given
  const topPage: TopPage = new TopPage(page);
  await topPage.goto();

  // When
  await topPage.clickHeaderLogo();

  // Then
  await expect(page).toHaveURL(urls.top);
});

test('ルームページで、ヘッダーのロゴを選択したとき、トップページへ遷移すること', async ({
  page,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage: RoomPage = new RoomPage(page);
  await roomPage.goto(roomId);

  // When
  await roomPage.clickHeaderLogo();

  // Then
  await expect(page).toHaveURL(urls.top);
});

test('利用規約ページで、ヘッダーのロゴを選択したとき、トップページへ遷移すること', async ({
  page,
}) => {
  // Given
  const tosPage: TOSPage = new TOSPage(page);
  await tosPage.goto();

  // When
  await tosPage.clickHeaderLogo();

  // Then
  await expect(page).toHaveURL(urls.top);
});

test('プライバシーページで、ヘッダーのロゴを選択したとき、トップページへ遷移すること', async ({
  page,
}) => {
  // Given
  const ppPage: PPPage = new PPPage(page);
  await ppPage.goto();

  // When
  await ppPage.clickHeaderLogo();

  // Then
  await expect(page).toHaveURL(urls.top);
});
