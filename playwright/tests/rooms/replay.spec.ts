import { test, expect } from '@playwright/test';
import urls from '../../helpers/urls';
import usersJoinRoom from '../../helpers/usersJoinRoom';

test('ルームページで、カードをオープンしたあと、リプレイできること', async ({ page, browser }) => {
  const roomURL = urls.room();
  const [page2] = await usersJoinRoom(page, roomURL, browser, 1);

  await page.locator('data-testid=tefudaCard').nth(0).click();

  // カードオープン前はリプレイボタンは非表示
  await expect(page.locator('data-testid=replayButton')).toHaveCount(0);

  await page.click('data-testid=openButton');

  // カードオープン後はリプレイボタンは表示
  await expect(page.locator('data-testid=replayButton')).toHaveCount(1);

  await expect(page.locator('data-testid=tableCard').nth(0)).toHaveClass(/tableCard_open/);
  await expect(page.locator('data-testid=tableCard').nth(0)).toHaveText('0');
  await expect(page.locator('data-testid=tableCard').nth(1)).toHaveClass(/tableCard_blank/);
  await expect(page.locator('data-testid=tableCard').nth(1)).toHaveText('');
  await expect(page.locator('data-testid=tefudaCard').nth(0)).toHaveClass(/tefudaCard_selected/);
  await expect(page.locator('data-testid=tefudaCard').nth(1)).toHaveClass(/tefudaCard_disabled/);

  await page.click('data-testid=replayButton');

  await expect(page.locator('data-testid=tableCard').nth(0)).toHaveClass(/tableCard_blank/);
  await expect(page.locator('data-testid=tableCard').nth(0)).toHaveText('');
  await expect(page.locator('data-testid=tableCard').nth(1)).toHaveClass(/tableCard_blank/);
  await expect(page.locator('data-testid=tableCard').nth(1)).toHaveText('');
  await expect(page.locator('data-testid=tefudaCard').nth(0)).not.toHaveClass(
    /tefudaCard_[selected|disabled]/,
  );
  await expect(page.locator('data-testid=tefudaCard').nth(1)).not.toHaveClass(
    /tefudaCard_[selected|disabled]/,
  );
});

test('ルームページで、カードをオープンしたあと、他のメンバーがリプレイできること', async ({
  page,
  browser,
}) => {
  const roomURL = urls.room();
  const [page2] = await usersJoinRoom(page, roomURL, browser, 1);

  await page.locator('data-testid=tefudaCard').nth(1).click();

  // カードオープン前はリプレイボタンは非表示
  await expect(page.locator('data-testid=replayButton')).toHaveCount(0);

  await page.click('data-testid=openButton');

  // カードオープン後はリプレイボタンは表示
  await expect(page.locator('data-testid=replayButton')).toHaveCount(1);

  await expect(page.locator('data-testid=tableCard').nth(0)).toHaveClass(/tableCard_open/);
  await expect(page.locator('data-testid=tableCard').nth(0)).toHaveText('1');
  await expect(page.locator('data-testid=tableCard').nth(1)).toHaveClass(/tableCard_blank/);
  await expect(page.locator('data-testid=tableCard').nth(1)).toHaveText('');
  await expect(page.locator('data-testid=tefudaCard').nth(0)).toHaveClass(/tefudaCard_disabled/);
  await expect(page.locator('data-testid=tefudaCard').nth(1)).toHaveClass(/tefudaCard_selected/);

  await page2.click('data-testid=replayButton');

  await expect(page.locator('data-testid=tableCard').nth(0)).toHaveClass(/tableCard_blank/);
  await expect(page.locator('data-testid=tableCard').nth(0)).toHaveText('');
  await expect(page.locator('data-testid=tableCard').nth(1)).toHaveClass(/tableCard_blank/);
  await expect(page.locator('data-testid=tableCard').nth(1)).toHaveText('');
  await expect(page.locator('data-testid=tefudaCard').nth(0)).not.toHaveClass(
    /tefudaCard_[selected|disabled]/,
  );
  await expect(page.locator('data-testid=tefudaCard').nth(1)).not.toHaveClass(
    /tefudaCard_[selected|disabled]/,
  );
});
