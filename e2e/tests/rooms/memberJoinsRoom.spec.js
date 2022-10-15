describe('rooms/memberJoinsRoom', () => {
  let roomUrl

  beforeEach(() => {
    roomUrl = urls.room()
  })
  test('ルームページで、同じ部屋に他のメンバーが入ってきたとき、カード置き場が増えること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    expect(await page.$$eval('[data-testid="tableCard"]', (els) => els.length)).toBe(1);

    const page2 = await browser.newPage();
    await page2.goto(roomUrl);
    await page2.waitForSelector('[data-testid="tableCard"]');
    expect(await page.$$eval('[data-testid="tableCard"]', (els) => els.length)).toBe(2);
    expect(await page2.$$eval('[data-testid="tableCard"]', (els) => els.length)).toBe(2);
    await page2.close();
  });

  test('ルームページで、別の部屋に別のメンバーが入ってきたとき、カード置き場は増えないこと', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    expect(await page.$$eval('[data-testid="tableCard"]', (els) => els.length)).toBe(1);

    const page2 = await browser.newPage();
    await page2.goto(urls.room());
    await page2.waitForSelector('[data-testid="tableCard"]');
    expect(await page.$$eval('[data-testid="tableCard"]', (els) => els.length)).toBe(1);
    expect(await page2.$$eval('[data-testid="tableCard"]', (els) => els.length)).toBe(1);
    await page2.close();
  });
});
