import { test, expect } from '@playwright/test';
import urls from '../../helpers/urls';
import userJoinRoom from '../../helpers/userJoinRoom';
import usersJoinRoom from '../../helpers/usersJoinRoom';

test('ルームページで、デフォルトで「Player」が選択されていること', async ({ context }) => {
  const [page1, page2] = await usersJoinRoom(context, urls.room(), 2);

  const memberTypePlayer = page1.locator('data-testid=memberTypePlayer');
  await expect(memberTypePlayer).toHaveText('Player');
  await expect(memberTypePlayer).toHaveClass('is-active');

  const memberTypeAudience = page1.locator('data-testid=memberTypeAudience');
  await expect(memberTypeAudience).toHaveText('Audience');
  await expect(memberTypeAudience).not.toHaveClass('is-active');
});

test('ルームページで、「Player」選択中かつカード未選択かつカード未オープンの状態で、「Audience」を選択したとき、自分のテーブルカードが消え、手札カードを選べなくなること', async ({
  context,
}) => {
  const [page1, page2] = await usersJoinRoom(context, urls.room(), 2);

  const tableCards = page1.locator('data-testid=tableCard');
  const tefudaCards = page1.locator('data-testid=tefudaCard');
  const memberTypePlayer = page1.locator('data-testid=memberTypePlayer');
  const memberTypeAudience = page1.locator('data-testid=memberTypeAudience');

  await expect(tableCards).toHaveCount(2);
  await expect(tableCards.nth(0)).toHaveClass(/tableCard_blank/);
  await expect(tableCards.nth(1)).toHaveClass(/tableCard_blank/);
  await expect(tefudaCards.nth(0)).not.toHaveClass(/tefudaCard_[selected|disabled]/);
  await expect(tefudaCards.nth(1)).not.toHaveClass(/tefudaCard_[selected|disabled]/);
  await expect(memberTypePlayer).toHaveClass('is-active');
  await expect(memberTypeAudience).not.toHaveClass('is-active');

  await memberTypeAudience.click();

  await expect(tableCards).toHaveCount(1);
  await expect(tableCards.nth(0)).toHaveClass(/tableCard_blank/);
  await expect(tefudaCards.nth(0)).toHaveClass(/tefudaCard_disabled/);
  await expect(tefudaCards.nth(1)).toHaveClass(/tefudaCard_disabled/);
  await expect(memberTypePlayer).not.toHaveClass('is-active');
  await expect(memberTypeAudience).toHaveClass('is-active');

  await tefudaCards.nth(2).click();
  await expect(tefudaCards.nth(2)).not.toHaveClass(/tefudaCard_selected/);
});

test('ルームページで、「Player」選択中かつカード選択済みかつカード未オープンの状態で、「Audience」を選択したとき、自分のテーブルカードが消え、手札カードの選択が解除され、手札カードを選べなくなること', async ({
  context,
}) => {
  const [page1, page2] = await usersJoinRoom(context, urls.room(), 2);

  const tableCards = page1.locator('data-testid=tableCard');
  const tefudaCards = page1.locator('data-testid=tefudaCard');
  const memberTypePlayer = page1.locator('data-testid=memberTypePlayer');
  const memberTypeAudience = page1.locator('data-testid=memberTypeAudience');

  await tefudaCards.nth(0).click();

  await expect(tableCards).toHaveCount(2);
  await expect(tableCards.nth(0)).toHaveClass(/tableCard_close/);
  await expect(tableCards.nth(1)).toHaveClass(/tableCard_blank/);
  await expect(tefudaCards.nth(0)).toHaveClass(/tefudaCard_selected/);
  await expect(tefudaCards.nth(1)).not.toHaveClass(/tefudaCard_[selected|disabled]/);
  await expect(memberTypePlayer).toHaveClass('is-active');
  await expect(memberTypeAudience).not.toHaveClass('is-active');

  await memberTypeAudience.click();

  await expect(tableCards).toHaveCount(1);
  await expect(tableCards.nth(0)).toHaveClass(/tableCard_blank/);
  await expect(tefudaCards.nth(0)).toHaveClass(/tefudaCard_disabled/);
  await expect(tefudaCards.nth(1)).toHaveClass(/tefudaCard_disabled/);
  await expect(memberTypePlayer).not.toHaveClass('is-active');
  await expect(memberTypeAudience).toHaveClass('is-active');

  await tefudaCards.nth(2).click();
  await expect(tefudaCards.nth(2)).not.toHaveClass(/tefudaCard_selected/);
});

test('ルームページで、「Player」選択中かつカード未選択かつカードオープン済みの状態で、「Audience」を選択したとき、自分のテーブルカードが消え、手札カードを選べなくなること', async ({
  context,
}) => {
  const [page1, page2] = await usersJoinRoom(context, urls.room(), 2);

  const tableCards = page1.locator('data-testid=tableCard');
  const tefudaCards = page1.locator('data-testid=tefudaCard');
  const memberTypePlayer = page1.locator('data-testid=memberTypePlayer');
  const memberTypeAudience = page1.locator('data-testid=memberTypeAudience');

  await page2.locator('data-testid=tefudaCard').nth(1).click();
  await page1.locator('data-testid=openButton').click();

  await expect(tableCards).toHaveCount(2);
  await expect(tableCards.nth(0)).toHaveClass(/tableCard_open/);
  await expect(tableCards.nth(1)).toHaveClass(/tableCard_blank/);
  await expect(tefudaCards.nth(0)).toHaveClass(/tefudaCard_disabled/);
  await expect(tefudaCards.nth(1)).toHaveClass(/tefudaCard_disabled/);
  await expect(memberTypePlayer).toHaveClass('is-active');
  await expect(memberTypeAudience).not.toHaveClass('is-active');

  await memberTypeAudience.click();

  await expect(tableCards).toHaveCount(1);
  await expect(tableCards.nth(0)).toHaveClass(/tableCard_open/);
  await expect(tefudaCards.nth(0)).toHaveClass(/tefudaCard_disabled/);
  await expect(tefudaCards.nth(1)).toHaveClass(/tefudaCard_disabled/);
  await expect(memberTypePlayer).not.toHaveClass('is-active');
  await expect(memberTypeAudience).toHaveClass('is-active');

  await tefudaCards.nth(2).click();
  await expect(tefudaCards.nth(2)).not.toHaveClass(/tefudaCard_selected/);
});

test('ルームページで、「Player」選択中かつカード選択済みかつカードオープン済みの状態で、「Audience」を選択したとき、自分のテーブルカードが消え、手札カードの選択が解除され、手札カードを選べなくなること', async ({
  context,
}) => {
  const [page1, page2] = await usersJoinRoom(context, urls.room(), 2);

  const tableCards = page1.locator('data-testid=tableCard');
  const tefudaCards = page1.locator('data-testid=tefudaCard');
  const memberTypePlayer = page1.locator('data-testid=memberTypePlayer');
  const memberTypeAudience = page1.locator('data-testid=memberTypeAudience');

  await tefudaCards.nth(1).click();
  await page1.locator('data-testid=openButton').click();

  await expect(tableCards).toHaveCount(2);
  await expect(tableCards.nth(0)).toHaveClass(/tableCard_open/);
  await expect(tableCards.nth(1)).toHaveClass(/tableCard_blank/);
  await expect(tefudaCards.nth(0)).toHaveClass(/tefudaCard_disabled/);
  await expect(tefudaCards.nth(1)).toHaveClass(/tefudaCard_selected/);
  await expect(memberTypePlayer).toHaveClass('is-active');
  await expect(memberTypeAudience).not.toHaveClass('is-active');

  await memberTypeAudience.click();

  await expect(tableCards).toHaveCount(1);
  await expect(tableCards.nth(0)).toHaveClass(/tableCard_blank/);
  await expect(tefudaCards.nth(0)).toHaveClass(/tefudaCard_disabled/);
  await expect(tefudaCards.nth(1)).toHaveClass(/tefudaCard_disabled/);
  await expect(memberTypePlayer).not.toHaveClass('is-active');
  await expect(memberTypeAudience).toHaveClass('is-active');

  await tefudaCards.nth(2).click();
  await expect(tefudaCards.nth(2)).not.toHaveClass(/tefudaCard_selected/);
});

test('ルームページで、「Audience」選択中かつカード未オープンの状態で、「Player」を選択したとき、自分のテーブルカードが現れ、手札カードを選べるようになること', async ({
  context,
}) => {
  const [page1, page2] = await usersJoinRoom(context, urls.room(), 2);

  const tableCards = page1.locator('data-testid=tableCard');
  const tefudaCards = page1.locator('data-testid=tefudaCard');
  const memberTypePlayer = page1.locator('data-testid=memberTypePlayer');
  const memberTypeAudience = page1.locator('data-testid=memberTypeAudience');

  await memberTypeAudience.click();

  await expect(tableCards).toHaveCount(1);
  await expect(tableCards.nth(0)).toHaveClass(/tableCard_blank/);
  await expect(tefudaCards.nth(0)).toHaveClass(/tefudaCard_disabled/);
  await expect(tefudaCards.nth(1)).toHaveClass(/tefudaCard_disabled/);
  await expect(memberTypePlayer).not.toHaveClass('is-active');
  await expect(memberTypeAudience).toHaveClass('is-active');

  await memberTypePlayer.click();

  await expect(tableCards).toHaveCount(2);
  await expect(tableCards.nth(0)).toHaveClass(/tableCard_blank/);
  await expect(tableCards.nth(1)).toHaveClass(/tableCard_blank/);
  await expect(tefudaCards.nth(0)).not.toHaveClass(/tefudaCard_[selected|disabled]/);
  await expect(tefudaCards.nth(1)).not.toHaveClass(/tefudaCard_[selected|disabled]/);
  await expect(memberTypePlayer).toHaveClass('is-active');
  await expect(memberTypeAudience).not.toHaveClass('is-active');

  await tefudaCards.nth(2).click();
  await expect(tefudaCards.nth(2)).toHaveClass(/tefudaCard_selected/);
});

test('ルームページで、「Audience」選択中かつカードオープン済みの状態で、「Player」を選択したとき、自分のテーブルカードが現れること', async ({
  context,
}) => {
  const [page1, page2] = await usersJoinRoom(context, urls.room(), 2);

  const tableCards = page1.locator('data-testid=tableCard');
  const tefudaCards = page1.locator('data-testid=tefudaCard');
  const memberTypePlayer = page1.locator('data-testid=memberTypePlayer');
  const memberTypeAudience = page1.locator('data-testid=memberTypeAudience');

  await memberTypeAudience.click();

  await page2.locator('data-testid=tefudaCard').nth(0).click();
  await page1.locator('data-testid=openButton').click();

  await expect(tableCards).toHaveCount(1);
  await expect(tableCards.nth(0)).toHaveClass(/tableCard_open/);
  await expect(tefudaCards.nth(0)).toHaveClass(/tefudaCard_disabled/);
  await expect(tefudaCards.nth(1)).toHaveClass(/tefudaCard_disabled/);
  await expect(memberTypePlayer).not.toHaveClass('is-active');
  await expect(memberTypeAudience).toHaveClass('is-active');

  await memberTypePlayer.click();

  await expect(tableCards).toHaveCount(2);
  await expect(tableCards.nth(0)).toHaveClass(/tableCard_open/);
  await expect(tableCards.nth(1)).toHaveClass(/tableCard_blank/);
  await expect(tefudaCards.nth(0)).toHaveClass(/tefudaCard_disabled/);
  await expect(tefudaCards.nth(1)).toHaveClass(/tefudaCard_disabled/);
  await expect(memberTypePlayer).toHaveClass('is-active');
  await expect(memberTypeAudience).not.toHaveClass('is-active');

  await tefudaCards.nth(2).click();
  await expect(tefudaCards.nth(2)).not.toHaveClass(/tefudaCard_selected/);
});

test('ルームページで、メンバーが自分ひとりのときに「Audience」を選択しても問題ないこと', async ({
  page,
}) => {
  await userJoinRoom(page, urls.room());

  const tableCards = page.locator('data-testid=tableCard');
  const tefudaCards = page.locator('data-testid=tefudaCard');
  const memberTypePlayer = page.locator('data-testid=memberTypePlayer');
  const memberTypeAudience = page.locator('data-testid=memberTypeAudience');
  const openButton = page.locator('data-testid=openButton');
  const replayButton = page.locator('data-testid=replayButton');

  await memberTypeAudience.click();

  await expect(tableCards).toHaveCount(0);
  await expect(tefudaCards.nth(0)).toHaveClass(/tefudaCard_disabled/);
  await expect(tefudaCards.nth(1)).toHaveClass(/tefudaCard_disabled/);
  await expect(memberTypePlayer).not.toHaveClass('is-active');
  await expect(memberTypeAudience).toHaveClass('is-active');
  await expect(openButton).toBeDisabled();
  await expect(replayButton).toHaveCount(0);

  await memberTypePlayer.click();
  await tefudaCards.nth(2).click();
  await openButton.click();
  await memberTypeAudience.click();

  await expect(tableCards).toHaveCount(0);
  await expect(tefudaCards.nth(0)).toHaveClass(/tefudaCard_disabled/);
  await expect(tefudaCards.nth(1)).toHaveClass(/tefudaCard_disabled/);
  await expect(memberTypePlayer).not.toHaveClass('is-active');
  await expect(memberTypeAudience).toHaveClass('is-active');
  await expect(openButton).toHaveCount(0);
  await expect(replayButton).toBeEnabled();

  await replayButton.click();
  await expect(openButton).toBeDisabled();
  await expect(replayButton).toHaveCount(0);
});
