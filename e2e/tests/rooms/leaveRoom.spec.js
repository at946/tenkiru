describe('rooms/leaveRoom', () => {
  let roomUrl;

  beforeEach(() => {
    roomUrl = urls.room();
  });

  test('ルームページで、別のページに遷移したとき、ルームから抜け出すこと', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    const page2 = await browser.newPage();
    await page2.goto(roomUrl);
    await page2.waitForSelector('[data-testid="tableCard"]');

    let tableCards = await page.$$('[data-testid="tableCard"]');
    expect(tableCards.length).toBe(2);

    await page2.goto(urls.top);

    tableCards = await page.$$('[data-testid="tableCard"]');
    expect(tableCards.length).toBe(1);

    await page2.close();
  });

  test('ルームページで、ブラウザを閉じたとき、ルームから抜け出すこと', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    const page2 = await browser.newPage();
    await page2.goto(roomUrl);
    await page2.waitForSelector('[data-testid="tableCard"]');

    let tableCards = await page.$$('[data-testid="tableCard"]');
    expect(tableCards.length).toBe(2);

    await page2.close();
    await page.waitForTimeout(100);

    tableCards = await page.$$('[data-testid="tableCard"]');
    expect(tableCards.length).toBe(1);
  });
});
