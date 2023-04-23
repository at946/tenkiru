import { Locator, expect, test } from '@playwright/test';
import TopPage from '../../models/top-page';
import RoomPage from '../../models/room-page';
import TOSPage from '../../models/tos-page';
import PPPage from '../../models/pp-page';
import urls from '../../helpers/urls';
import createRoomId from '../../helpers/createRoomId';

test('トップページで、フッターのコピーライトを選択したとき、開発者のTwitterアカウントのプロフィールページが開くこと', async ({
  page,
}) => {
  // Given
  const topPage: TopPage = new TopPage(page);
  const copyright: Locator = await topPage.footer.copyright;
  await topPage.goto();

  // When

  // Then
  await expect(copyright).toHaveAttribute('href', 'https://twitter.com/at_946');
  await expect(copyright).toHaveAttribute('target', '_blank');
});

test('ルームページで、フッターのコピーライトを選択したとき、開発者のTwitterアカウントのプロフィールページが開くこと', async ({
  page,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage: RoomPage = new RoomPage(page);
  const copyright: Locator = await roomPage.footer.copyright;
  await roomPage.goto(roomId);

  // When

  // Then
  await expect(copyright).toHaveAttribute('href', 'https://twitter.com/at_946');
  await expect(copyright).toHaveAttribute('target', '_blank');
});

test('利用規約ページで、フッターのコピーライトを選択したとき、開発者のTwitterアカウントのプロフィールページが開くこと', async ({
  page,
}) => {
  // Given
  const tosPage: TopPage = new TOSPage(page);
  const copyright: Locator = await tosPage.footer.copyright;
  await tosPage.goto();

  // When

  // Then
  await expect(copyright).toHaveAttribute('href', 'https://twitter.com/at_946');
  await expect(copyright).toHaveAttribute('target', '_blank');
});

test('プライバシーポリシーページで、フッターのコピーライトを選択したとき、開発者のTwitterアカウントのプロフィールページが開くこと', async ({
  page,
}) => {
  // Given
  const ppPage: PPPage = new PPPage(page);
  const copyright: Locator = await ppPage.footer.copyright;
  await ppPage.goto();

  // When

  // Then
  await expect(copyright).toHaveAttribute('href', 'https://twitter.com/at_946');
  await expect(copyright).toHaveAttribute('target', '_blank');
});
