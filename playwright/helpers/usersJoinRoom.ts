import { Browser, expect, Page } from "@playwright/test"

const usersJoinRoom = async (page: Page, roomUrl: string, browser: Browser, additionalUserCount: number): Promise<Page[]> => {
  await page.goto(roomUrl)
  const pages = []

  for (var i = 0; i < additionalUserCount; i++) {
    const newPage = await browser.newPage()
    newPage.goto(roomUrl)
    pages.push(newPage)
  }

  await expect(page.locator('data-testid=tableCard')).toHaveCount(1 + additionalUserCount)
  for (var i = 0; i < pages.length; i++) {
    await expect(pages[i].locator('data-testid=tableCard')).toHaveCount(1 + additionalUserCount)
  }

  return pages
}

export default usersJoinRoom