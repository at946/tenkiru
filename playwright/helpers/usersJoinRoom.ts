import { Browser, expect, Page } from '@playwright/test';

const usersJoinRoom = async (
  page: Page,
  roomURL: string,
  browser: Browser,
  additionalUserCount: number,
): Promise<Page[]> => {
  await page.goto(roomURL);
  const pages = [];

  for (var i = 0; i < additionalUserCount; i++) {
    const newPage = await browser.newPage();
    await newPage.goto(roomURL);
    pages.push(newPage);
  }

  const userCount = additionalUserCount + 1;
  await expect(page.locator('data-testid=tableCard')).toHaveCount(userCount);
  for (var i = 0; i < pages.length; i++) {
    await expect(pages[i].locator('data-testid=tableCard')).toHaveCount(userCount);
  }

  return pages;
};

export default usersJoinRoom;
