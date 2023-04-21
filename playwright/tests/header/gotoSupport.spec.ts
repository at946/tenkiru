import { test, expect } from '@playwright/test';
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
  const topPage = new TopPage(page);
  const supportLink = topPage.header.supportLink;
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
  const roomPage = new RoomPage(page);
  const supportLink = roomPage.header.supportLink;
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
  const tosPage = new TOSPage(page);
  const supportLink = tosPage.header.supportLink;
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
  const ppPage = new PPPage(page);
  const supportLink = ppPage.header.supportLink;
  await ppPage.goto();

  // When

  // Then
  await expect(supportLink).toHaveAttribute('href', 'https://note.com/_at_946/n/nb84babf02d87');
  await expect(supportLink).toHaveAttribute('target', '_blank');
});
