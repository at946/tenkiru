import { Locator, expect, test } from '@playwright/test';
import TopPage from '../../models/top-page';
import RoomPage from '../../models/room-page';
import TOSPage from '../../models/tos-page';
import PPPage from '../../models/pp-page';
import urls from '../../helpers/urls';
import createRoomId from '../../helpers/createRoomId';

test('トップページで、フッターのお問い合わせリンクを選択したとき、開発者のTwitterアカウントのプロフィールページが開くこと', async ({
  page,
}) => {
  // Given
  const topPage: TopPage = new TopPage(page);
  const inquiryLink: Locator = await topPage.footer.inquiryLink;
  await topPage.goto();

  // When

  // Then
  await expect(inquiryLink).toHaveAttribute('href', 'https://twitter.com/at_946');
  await expect(inquiryLink).toHaveAttribute('target', '_blank');
});

test('ルームページで、フッターのお問い合わせリンクを選択したとき、開発者のTwitterアカウントのプロフィールページが開くこと', async ({
  page,
}) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage: RoomPage = new RoomPage(page);
  const inquiryLink: Locator = await roomPage.footer.inquiryLink;
  await roomPage.goto(roomId);

  // When

  // Then
  await expect(inquiryLink).toHaveAttribute('href', 'https://twitter.com/at_946');
  await expect(inquiryLink).toHaveAttribute('target', '_blank');
});

test('利用規約ページで、フッターのお問い合わせリンクを選択したとき、開発者のTwitterアカウントのプロフィールページが開くこと', async ({
  page,
}) => {
  // Given
  const tosPage: TOSPage = new TOSPage(page);
  const inquiryLink: Locator = await tosPage.footer.inquiryLink;
  await tosPage.goto();

  // When

  // Then
  await expect(inquiryLink).toHaveAttribute('href', 'https://twitter.com/at_946');
  await expect(inquiryLink).toHaveAttribute('target', '_blank');
});

test('プライバシーポリシーページで、フッターのお問い合わせリンクを選択したとき、開発者のTwitterアカウントのプロフィールページが開くこと', async ({
  page,
}) => {
  // Given
  const ppPage: PPPage = new PPPage(page);
  const inquiryLink: Locator = await ppPage.footer.inquiryLink;
  await ppPage.goto();

  // When

  // Then
  await expect(inquiryLink).toHaveAttribute('href', 'https://twitter.com/at_946');
  await expect(inquiryLink).toHaveAttribute('target', '_blank');
});
