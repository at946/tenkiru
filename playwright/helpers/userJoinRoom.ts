import { expect, Page } from "@playwright/test";

const userJoinRoom = async (page: Page, roomURL: string) => {
  await page.goto(roomURL)
  await expect(page.locator('data-testid=tableCard')).toHaveCount(1)
}

export default userJoinRoom