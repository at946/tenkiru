import { test, expect } from '@playwright/test';
import urls from '../../helpers/urls';
import userJoinRoom from '../../helpers/userJoinRoom';
import usersJoinRoom from '../../helpers/usersJoinRoom';

test('ルームページで、デッキはデフォルトで「Fibonacci」が選択されていること', async ({ page }) => {
  await userJoinRoom(page, urls.room());

  await expect(page.locator('data-testid=deckSelect')).toHaveValue('fibonacci');
  const tefudaCards = page.locator('data-testid=tefudaCard');
  await expect(tefudaCards).toHaveCount(9);
  await expect(tefudaCards.nth(0)).toHaveText('0');
  await expect(tefudaCards.nth(1)).toHaveText('1');
  await expect(tefudaCards.nth(2)).toHaveText('2');
  await expect(tefudaCards.nth(3)).toHaveText('3');
  await expect(tefudaCards.nth(4)).toHaveText('5');
  await expect(tefudaCards.nth(5)).toHaveText('8');
  await expect(tefudaCards.nth(6)).toHaveText('13');
  await expect(tefudaCards.nth(7)).toHaveText('21');
  await expect(tefudaCards.nth(8)).toHaveText('?');
});

test('ルームページで、デッキを変更するとき、カードの選択が解除されること', async ({ page }) => {
  await userJoinRoom(page, urls.room());
  const tefudaCards = page.locator('data-testid=tefudaCard');
  await tefudaCards.nth(0).click();

  await expect(tefudaCards.nth(0)).toHaveClass(/tefudaCard_selected/);

  await page.selectOption('data-testid=deckSelect', 'sequential');

  await expect(tefudaCards.nth(0)).not.toHaveClass(/tefudaCard_selected/);
});

test('ルームページで、デッキを変更するとき、カードがオープン状態でも場がリセットされること', async ({
  page,
}) => {
  await userJoinRoom(page, urls.room());
  await page.locator('data-testid=tefudaCard').nth(0).click();
  await page.click('data-testid=openButton');

  const tableCards = page.locator('data-testid=tableCard');
  const tefudaCards = page.locator('data-testid=tefudaCard');
  await expect(tableCards.nth(0)).toHaveClass(/tableCard_open/);
  await expect(tefudaCards.nth(0)).toHaveClass(/tefudaCard_selected/);

  await page.selectOption('data-testid=deckSelect', 'sequential');

  await expect(tableCards.nth(0)).toHaveClass(/tableCard_blank/);
  await expect(tefudaCards.nth(0)).not.toHaveClass(/tefudaCard_selected/);
});

test('ルームページで、「Fibonacci」を選択したとき、フィボナッチ数列のカードが並ぶこと', async ({
  page,
}) => {
  await userJoinRoom(page, urls.room());
  await page.selectOption('data-testid=deckSelect', 'sequential');
  await page.selectOption('data-testid=deckSelect', 'fibonacci');

  await expect(page.locator('data-testid=deckSelect')).toHaveValue('fibonacci');
  const tefudaCards = page.locator('data-testid=tefudaCard');
  await expect(tefudaCards).toHaveCount(9);
  await expect(tefudaCards.nth(0)).toHaveText('0');
  await expect(tefudaCards.nth(1)).toHaveText('1');
  await expect(tefudaCards.nth(2)).toHaveText('2');
  await expect(tefudaCards.nth(3)).toHaveText('3');
  await expect(tefudaCards.nth(4)).toHaveText('5');
  await expect(tefudaCards.nth(5)).toHaveText('8');
  await expect(tefudaCards.nth(6)).toHaveText('13');
  await expect(tefudaCards.nth(7)).toHaveText('21');
  await expect(tefudaCards.nth(8)).toHaveText('?');
});

test('ルームページで、「Sequential」を選択したとき、1-10の数列のカードが並ぶこと', async ({
  page,
}) => {
  await userJoinRoom(page, urls.room());
  await page.selectOption('data-testid=deckSelect', 'sequential');

  await expect(page.locator('data-testid=deckSelect')).toHaveValue('sequential');
  const tefudaCards = page.locator('data-testid=tefudaCard');
  await expect(tefudaCards).toHaveCount(11);
  await expect(tefudaCards.nth(0)).toHaveText('1');
  await expect(tefudaCards.nth(1)).toHaveText('2');
  await expect(tefudaCards.nth(2)).toHaveText('3');
  await expect(tefudaCards.nth(3)).toHaveText('4');
  await expect(tefudaCards.nth(4)).toHaveText('5');
  await expect(tefudaCards.nth(5)).toHaveText('6');
  await expect(tefudaCards.nth(6)).toHaveText('7');
  await expect(tefudaCards.nth(7)).toHaveText('8');
  await expect(tefudaCards.nth(8)).toHaveText('9');
  await expect(tefudaCards.nth(9)).toHaveText('10');
  await expect(tefudaCards.nth(10)).toHaveText('?');
});

test('ルームページで、「T-shirt size」を選択したとき、1-10の数列のカードが並ぶこと', async ({
  page,
}) => {
  await userJoinRoom(page, urls.room());
  await page.selectOption('data-testid=deckSelect', 'tShirtSize');

  await expect(page.locator('data-testid=deckSelect')).toHaveValue('tShirtSize');
  const tefudaCards = page.locator('data-testid=tefudaCard');
  await expect(tefudaCards).toHaveCount(6);
  await expect(tefudaCards.nth(0)).toHaveText('XS');
  await expect(tefudaCards.nth(1)).toHaveText('S');
  await expect(tefudaCards.nth(2)).toHaveText('M');
  await expect(tefudaCards.nth(3)).toHaveText('L');
  await expect(tefudaCards.nth(4)).toHaveText('XL');
  await expect(tefudaCards.nth(5)).toHaveText('?');
});

test('ルームページで、別のメンバーがデッキを選択したとき、自分の手札に反映されること', async ({
  page,
  browser,
}) => {
  const [page2] = await usersJoinRoom(page, urls.room(), browser, 1);

  const deckSelect = page.locator('data-testid=deckSelect');
  await expect(deckSelect).toHaveValue('fibonacci');

  await page2.selectOption('data-testid=deckSelect', 'sequential');

  await expect(deckSelect).toHaveValue('sequential');
});
