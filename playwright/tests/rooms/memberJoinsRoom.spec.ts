import { test, expect } from '@playwright/test';
import urls from '../../helpers/urls';

test('ルームページで、同じ部屋に他のメンバーが入ってきたとき、カード置き場が増えること', async ({
  page,
  browser,
}) => {
  const roomURL = urls.room();
  await page.goto(roomURL);
  await expect(page.locator('data-testid=tableCard')).toHaveCount(1);

  const page2 = await browser.newPage();
  await page2.goto(roomURL);

  await expect(page.locator('data-testid=tableCard')).toHaveCount(2);
  await expect(page2.locator('data-testid=tableCard')).toHaveCount(2);
});

test('ルームページで、別の部屋に別のメンバーが入ってきたとき、カード置き場は増えないこと', async ({
  page,
  browser,
}) => {
  const roomURL = urls.room();
  await page.goto(roomURL);
  await expect(page.locator('data-testid=tableCard')).toHaveCount(1);

  const roomURL2 = urls.room();
  const page2 = await browser.newPage();
  await page2.goto(roomURL2);

  await expect(page.locator('data-testid=tableCard')).toHaveCount(1);
  await expect(page2.locator('data-testid=tableCard')).toHaveCount(1);
});

test('ルームページで、カードがオープンした部屋に入室したとき、カードがオープンな状態からスタートすること', async ({
  page,
  browser,
}) => {
  const roomURL = urls.room();
  await page.goto(roomURL);
  await expect(page.locator('data-testid=tableCard')).toHaveCount(1);

  // カードをオープンにしておく
  await page.locator('data-testid=tefudaCard').nth(0).click();
  await page.click('data-testid=openButton');

  const page2 = await browser.newPage();
  await page2.goto(roomURL);
  await expect(page.locator('data-testid=tableCard')).toHaveCount(2);
  await expect(page2.locator('data-testid=tableCard')).toHaveCount(2);

  await expect(page.locator('data-testid=openButton')).toHaveCount(0);
  await expect(page.locator('data-testid=replayButton')).toHaveCount(1);
  await expect(page2.locator('data-testid=openButton')).toHaveCount(0);
  await expect(page2.locator('data-testid=replayButton')).toHaveCount(1);
});

test('ルームページで、デッキがFibonacci以外を選択された状態で入室したとき、そのデッキが手札に表示されること', async ({
  page,
  browser,
}) => {
  const roomURL = urls.room();
  await page.goto(roomURL);
  await expect(page.locator('data-testid=tableCard')).toHaveCount(1);

  await page.selectOption('data-testid=deckSelect', 'sequential');

  const page2 = await browser.newPage();
  await page2.goto(roomURL);
  await expect(page2.locator('data-testid=tableCard')).toHaveCount(2);

  await expect(page2.locator('data-testid=deckSelect')).toHaveValue('sequential');
  const tefudaCards = page2.locator('data-testid=tefudaCard');
  const expectTefudaCards = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '?'];
  for (var i = 0; i < (await tefudaCards.count()); i++) {
    await expect(tefudaCards.nth(i)).toHaveText(expectTefudaCards[i]);
  }
});
