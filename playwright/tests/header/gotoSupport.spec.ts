import { test, expect, Locator } from '@playwright/test';
import TopPage from '../../models/top-page';
import RoomPage from '../../models/room-page';
import TOSPage from '../../models/tos-page';
import PPPage from '../../models/pp-page';
import urls from '../../helpers/urls';
import usersJoinRoom from '../../helpers/usersJoinRoom';
import createRoomId from '../../helpers/createRoomId';

test('トップページで、ヘッダーのサポートメニューを選択したとき、noteのページへ遷移すること', async ({
  page,
}) => {
  // Given
  const topPage: TopPage = new TopPage(page);
  const supportLink: Locator = topPage.header.supportLink;
  await topPage.goto();

  // When

  // Then
  await expect(supportLink).toHaveAttribute('href', 'https://note.com/_at_946/n/nb84babf02d87');
  await expect(supportLink).toHaveAttribute('target', '_blank');
});

test('ルームページで、ヘッダーのサポートメニューを選択したとき、noteのページへ遷移すること', async ({
  page,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage: RoomPage = new RoomPage(page);
  const supportLink: Locator = roomPage.header.supportLink;
  await roomPage.goto(roomId);

  // When

  // Then
  await expect(supportLink).toHaveAttribute('href', 'https://note.com/_at_946/n/nb84babf02d87');
  await expect(supportLink).toHaveAttribute('target', '_blank');
});

test('利用規約ページで、ヘッダーのサポートメニューを選択したとき、noteのページへ遷移すること', async ({
  page,
}) => {
  // Given
  const tosPage: TOSPage = new TOSPage(page);
  const supportLink: Locator = tosPage.header.supportLink;
  await tosPage.goto();

  // When

  // Then
  await expect(supportLink).toHaveAttribute('href', 'https://note.com/_at_946/n/nb84babf02d87');
  await expect(supportLink).toHaveAttribute('target', '_blank');
});

test('プライバシーポリシーページで、ヘッダーのサポートメニューを選択したとき、noteのページへ遷移すること', async ({
  page,
}) => {
  // Given
  const ppPage: PPPage = new PPPage(page);
  const supportLink: Locator = ppPage.header.supportLink;
  await ppPage.goto();

  // When

  // Then
  await expect(supportLink).toHaveAttribute('href', 'https://note.com/_at_946/n/nb84babf02d87');
  await expect(supportLink).toHaveAttribute('target', '_blank');
});
