describe('rooms/summary', () => {
  let roomUrl;

  beforeEach(() => {
    roomUrl = urls.room();
  });

  test('ルームページで、カードをオープンしたとき、場に出されたカードの最大値、最小値、平均値が表示されること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    const page2 = await browser.newPage();
    await page2.goto(roomUrl);
    await page2.waitForSelector('[data-testid="tableCard"]');
    const page3 = await browser.newPage();
    await page3.goto(roomUrl);
    await page3.waitForSelector('[data-testid="tableCard"]');

    const tefudaCards = await page.$$('[data-testid="tefudaCard"]');
    const tefudaCards2 = await page2.$$('[data-testid="tefudaCard"]');
    const tefudaCards3 = await page3.$$('[data-testid="tefudaCard"]');

    await tefudaCards[2].click(); // 3を選択
    await tefudaCards2[3].click(); // 5を選択
    await tefudaCards3[5].click(); // 13を選択

    expect(await page.$('[data-testid="max"]')).toBeNull();
    expect(await page.$('[data-testid="min"]')).toBeNull();
    expect(await page.$('[data-testid="avg"]')).toBeNull();

    await page.click('[data-testid="openButton"]');

    await takeScreenshot(1);
    expect(await page.$eval('[data-testid="max"]', (el) => el.innerText)).toBe('Max\n13');
    expect(await page.$eval('[data-testid="min"]', (el) => el.innerText)).toBe('Min\n3');
    expect(await page.$eval('[data-testid="avg"]', (el) => el.innerText)).toBe('Avg\n7');
  }, 10000);

  // ルームページで、カードを出していないプレイヤーがいる状態で、カードをオープンにしたとき、場に出されたカードの最大値、最小値、平均値が正しく表示されること
  // ルームページで、「？」のカードがある状態で、カードをオープンしたとき、場に出されたカードの最大値、最小値、平均値が正しく表示されること
  // ルームページで、カードをオープンにしたあとで、プレイヤーがオーディエンスに変わっても、場に出されたカードの最大値、最小値、平均値が再計算され正しく表示されること
});
