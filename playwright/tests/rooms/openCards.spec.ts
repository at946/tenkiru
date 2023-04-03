import { test, expect } from '@playwright/test';
import urls from '../../helpers/urls';
import usersJoinRoom from '../../helpers/usersJoinRoom';

test('ルームページで、誰もカードを場に出していないとき、カードをオープンできないこと', async ({
  context,
}) => {
  const roomUrl = urls.room();
  const [page1, page2] = await usersJoinRoom(context, roomUrl, 2);

  const tableCards = page1.locator('data-testid=tableCard');
  await expect(tableCards).toHaveCount(2);
  await expect(tableCards.nth(0)).toHaveClass(/tableCard_blank/);
  await expect(tableCards.nth(0)).toHaveText('');
  await expect(tableCards.nth(1)).toHaveClass(/tableCard_blank/);
  await expect(tableCards.nth(1)).toHaveText('');
});

test('ルームページで、誰かがカードを場に出している状態で、オープンボタンを選択したとき、場に出たカードがオープンすること', async ({
  context,
}) => {
  const roomUrl = urls.room();
  const [page1, page2] = await usersJoinRoom(context, roomUrl, 2);

  // 片方が手札から0のカードを選択
  const tefudaCards = page2.locator('data-testid=tefudaCard');
  await tefudaCards.nth(0).click();

  // この段階ではテーブルカードは1枚選択済み、1枚未選択
  const tableCards = page1.locator('data-testid=tableCard');
  await expect(tableCards).toHaveCount(2);
  await expect(tableCards.nth(0)).toHaveClass(/tableCard_close/);
  await expect(tableCards.nth(0)).toHaveText('');
  await expect(tableCards.nth(1)).toHaveClass(/tableCard_blank/);
  await expect(tableCards.nth(1)).toHaveText('');

  // カードをオープン
  await page1.click('data-testid=openButton');

  // 0と未選択のカード
  await expect(tableCards).toHaveCount(2);
  await expect(tableCards.nth(0)).toHaveClass(/tableCard_open/);
  await expect(tableCards.nth(0)).toHaveText('0');
  await expect(tableCards.nth(1)).toHaveClass(/tableCard_blank/);
  await expect(tableCards.nth(1)).toHaveText('');
});

test('ルームページで、カードをオープンした後、カードの選択を変更できないこと', async ({
  context,
}) => {
  const roomUrl = urls.room();
  const [page1, page2] = await usersJoinRoom(context, roomUrl, 2);

  // 片方が手札から1のカードを選択
  const tefudaCards = page2.locator('data-testid=tefudaCard');
  await tefudaCards.nth(1).click();

  // カードをオープン
  await expect(page1.locator('data-testid=tableCard')).toHaveCount(2);
  await page1.locator('data-testid=openButton').click();

  // 手札カードを選択できないこと
  await expect(tefudaCards.nth(0)).toHaveClass(/tefudaCard_disabled/);
  await expect(tefudaCards.nth(1)).toHaveClass(/tefudaCard_selected/);
  await tefudaCards.nth(0).click();
  await expect(tefudaCards.nth(0)).toHaveClass(/tefudaCard_disabled/);
  await expect(tefudaCards.nth(1)).toHaveClass(/tefudaCard_selected/);
});

test('ルームページで、カードをオープンした後、オープンボタンが表示されないこと', async ({
  context,
}) => {
  const roomUrl = urls.room();
  const [page1, page2] = await usersJoinRoom(context, roomUrl, 2);

  // 片方が手札から1のカードを選択
  const tefudaCards = page2.locator('data-testid=tefudaCard');
  await tefudaCards.nth(2).click();

  // カードをオープン
  await expect(page1.locator('data-testid=tableCard')).toHaveCount(2);
  await page1.locator('data-testid=openButton').click();

  // オープンボタンが非表示になること
  await expect(page1.locator('data-testid=openButton')).toHaveCount(0);
});
