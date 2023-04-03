import { BrowserContext, expect, Page } from '@playwright/test';

const usersJoinRoom = async (
  context: BrowserContext,
  roomURL: string,
  usersCount: number,
): Promise<Page[]> => {
  const pages: Page[] = [];

  await Promise.all(
    Array.from({ length: usersCount }, async () => {
      const newPage = await context.newPage();
      await newPage.goto(roomURL, { waitUntil: 'load' });
      pages.push(newPage);
    }),
  );

  return pages;
};

export default usersJoinRoom;
