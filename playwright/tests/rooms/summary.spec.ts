import { test, expect } from '@playwright/test';
import urls from '../../helpers/urls';
import usersJoinRoom from '../../helpers/usersJoinRoom';

  test('ルームページで、カードをオープンしたとき、場に出されたカードの最大値、最小値、平均値が表示されること', async ({ page, browser }) => {
    const [page2, page3] = await usersJoinRoom(page, urls.room(), browser, 2)
    const tefudaCards1 = page.locator('data-testid=tefudaCard')
    const tefudaCards2 = page2.locator('data-testid=tefudaCard')
    const tefudaCards3 = page3.locator('data-testid=tefudaCard')
    const max = page.locator('data-testid=max')
    const min = page.locator('data-testid=min')
    const avg = page.locator('data-testid=avg')

    await tefudaCards1.nth(3).click() // 3を選択
    await tefudaCards2.nth(4).click() // 5を選択
    await tefudaCards3.nth(6).click() // 13を選択

    await expect(max).toHaveCount(0)
    await expect(min).toHaveCount(0)
    await expect(avg).toHaveCount(0)

    await page.locator('data-testid=openButton').click()

    await expect(max).toHaveText('Max13')
    await expect(min).toHaveText('Min3')
    await expect(avg).toHaveText('Avg7')
});

test('ルームページで、カードを出していないプレイヤーがいる状態で、カードをオープンにしたとき、場に出されたカードの最大値、最小値、平均値が正しく表示されること', async ({ page, browser }) => {
  const [page2, page3] = await usersJoinRoom(page, urls.room(), browser, 2)
  const tefudaCards1 = page.locator('data-testid=tefudaCard')
  const tefudaCards2 = page2.locator('data-testid=tefudaCard')
  const max = page.locator('data-testid=max')
  const min = page.locator('data-testid=min')
  const avg = page.locator('data-testid=avg')

  await tefudaCards1.nth(2).click() // 2を選択
  await tefudaCards2.nth(3).click() // 3を選択

  await expect(max).toHaveCount(0)
  await expect(min).toHaveCount(0)
  await expect(avg).toHaveCount(0)

  await page.locator('data-testid=openButton').click()

  await expect(max).toHaveText('Max3')
  await expect(min).toHaveText('Min2')
  await expect(avg).toHaveText('Avg2.5')
});

test('ルームページで、「？」のカードがある状態で、カードをオープンしたとき、場に出されたカードの最大値、最小値、平均値が正しく表示されること', async ({ page, browser }) => {
  const [page2, page3] = await usersJoinRoom(page, urls.room(), browser, 2)
  const tefudaCards1 = page.locator('data-testid=tefudaCard')
  const tefudaCards2 = page2.locator('data-testid=tefudaCard')
  const tefudaCards3 = page3.locator('data-testid=tefudaCard')
  const max = page.locator('data-testid=max')
  const min = page.locator('data-testid=min')
  const avg = page.locator('data-testid=avg')

  await tefudaCards1.nth(1).click() // 1を選択
  await tefudaCards2.nth(await tefudaCards2.count() - 1).click() // ?を選択
  await tefudaCards3.nth(2).click() // 2を選択

  await expect(max).toHaveCount(0)
  await expect(min).toHaveCount(0)
  await expect(avg).toHaveCount(0)

  await page.locator('data-testid=openButton').click()

  await expect(max).toHaveText('Max2')
  await expect(min).toHaveText('Min1')
  await expect(avg).toHaveText('Avg1.5')
});

test('ルームページで、カードをオープンにしたあとで、プレイヤーがオーディエンスに変わっても、場に出されたカードの最大値、最小値、平均値が再計算され正しく表示されること', async ({ page, browser }) => {
  const [page2, page3] = await usersJoinRoom(page, urls.room(), browser, 2)
  const tefudaCards1 = page.locator('data-testid=tefudaCard')
  const tefudaCards2 = page2.locator('data-testid=tefudaCard')
  const tefudaCards3 = page3.locator('data-testid=tefudaCard')
  const max = page.locator('data-testid=max')
  const min = page.locator('data-testid=min')
  const avg = page.locator('data-testid=avg')

  await tefudaCards1.nth(3).click() // 3を選択
  await tefudaCards2.nth(4).click(); // 5を選択
  await tefudaCards3.nth(6).click(); // 13を選択

  await page.locator('data-testid=openButton').click()

  await expect(max).toHaveText('Max13')
  await expect(min).toHaveText('Min3')
  await expect(avg).toHaveText('Avg7')

  await page3.locator('data-testid=memberTypeAudience').click()

  await expect(max).toHaveText('Max5')
  await expect(min).toHaveText('Min3')
  await expect(avg).toHaveText('Avg4')
});

test('ルームページで、場に数字のカードが出ていないとき、サマリーが表示されないこと', async ({ page, browser }) => {
  const [page2, page3] = await usersJoinRoom(page, urls.room(), browser, 2)
  const tefudaCards1 = page.locator('data-testid=tefudaCard')
  const tefudaCards2 = page2.locator('data-testid=tefudaCard')
  const tefudaCards3 = page3.locator('data-testid=tefudaCard')
  const max = page.locator('data-testid=max')
  const min = page.locator('data-testid=min')
  const avg = page.locator('data-testid=avg')

  await tefudaCards1.nth(await tefudaCards1.count() - 1).click(); // ?を選択
  await tefudaCards2.nth(await tefudaCards1.count() - 1).click(); // ?を選択
  await tefudaCards3.nth(await tefudaCards1.count() - 1).click(); // ?を選択
  await page.locator('data-testid=openButton').click()

  await expect(max).toHaveCount(0)
  await expect(min).toHaveCount(0)
  await expect(avg).toHaveCount(0)
});
