import { expect, test } from '@playwright/test';
import createRoomId from '@pw/helpers/createRoomId';
import PPPage from '@pw/models/pp-page';
import RoomPage from '@pw/models/room-page';
import TopPage from '@pw/models/top-page';
import TOSPage from '@pw/models/tos-page';

const title: string = 'Tenkiru';
const description: string =
  'Tenkiru is a simple and fun planning poker app. Simply create a room, share the room URL with your team members and start using it immediately.';
const ogImageUrl: RegExp = /opengraph-image\.jpg$/;

test('トップページで、OGが正しいこと', async ({ page }) => {
  // Given
  const topPage: TopPage = new TopPage(page);
  await topPage.goto();

  // When

  // Then
  await expect(page).toHaveTitle(title);
  await expect(topPage.head.description).toHaveAttribute('content', description);
  await expect(topPage.head.ogSiteName).toHaveAttribute('content', title);
  await expect(topPage.head.ogType).toHaveAttribute('content', 'website');
  await expect(topPage.head.ogTitle).toHaveAttribute('content', title);
  await expect(topPage.head.ogDescription).toHaveAttribute('content', description);
  await expect(topPage.head.ogImage).toHaveAttribute('content', ogImageUrl);
  await expect(topPage.head.twitterCard).toHaveAttribute('content', 'summary');
});

test('ルームページで、OGが正しいこと', async ({ page }) => {
  // Given
  const roomId: string = createRoomId();
  const roomPage: RoomPage = new RoomPage(page);
  await roomPage.goto(roomId);

  // When

  // Then
  await expect(page).toHaveTitle(title);
  await expect(roomPage.head.description).toHaveAttribute('content', description);
  await expect(roomPage.head.ogSiteName).toHaveAttribute('content', title);
  await expect(roomPage.head.ogType).toHaveAttribute('content', 'website');
  await expect(roomPage.head.ogTitle).toHaveAttribute('content', title);
  await expect(roomPage.head.ogDescription).toHaveAttribute('content', description);
  await expect(roomPage.head.ogImage).toHaveAttribute('content', ogImageUrl);
  await expect(roomPage.head.twitterCard).toHaveAttribute('content', 'summary');
});

test('利用規約ページで、OGが正しいこと', async ({ page }) => {
  // Given
  const tosPage: TOSPage = new TOSPage(page);
  await tosPage.goto();

  // When

  // Then
  await expect(page).toHaveTitle(title);
  await expect(tosPage.head.description).toHaveAttribute('content', description);
  await expect(tosPage.head.ogSiteName).toHaveAttribute('content', title);
  await expect(tosPage.head.ogType).toHaveAttribute('content', 'website');
  await expect(tosPage.head.ogTitle).toHaveAttribute('content', title);
  await expect(tosPage.head.ogDescription).toHaveAttribute('content', description);
  await expect(tosPage.head.ogImage).toHaveAttribute('content', ogImageUrl);
  await expect(tosPage.head.twitterCard).toHaveAttribute('content', 'summary');
});

test('プライバシーポリシーページで、OGが正しいこと', async ({ page }) => {
  // Given
  const ppPage: PPPage = new PPPage(page);
  await ppPage.goto();

  // When

  // Then
  await expect(page).toHaveTitle(title);
  await expect(ppPage.head.description).toHaveAttribute('content', description);
  await expect(ppPage.head.ogSiteName).toHaveAttribute('content', title);
  await expect(ppPage.head.ogType).toHaveAttribute('content', 'website');
  await expect(ppPage.head.ogTitle).toHaveAttribute('content', title);
  await expect(ppPage.head.ogDescription).toHaveAttribute('content', description);
  await expect(ppPage.head.ogImage).toHaveAttribute('content', ogImageUrl);
  await expect(ppPage.head.twitterCard).toHaveAttribute('content', 'summary');
});
