describe('rooms/memberSelectsCard', () => {
  let roomUrl

  beforeEach(() => {
    roomUrl = urls.room()
  })
  test('ルームページで、他のメンバーがカードを選択したとき、カードが場に伏せて置かれること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    const page2 = await browser.newPage();
    await page2.goto(roomUrl);
    await page2.waitForSelector('[data-testid="tableCard"]');

    let tableCards = await page.$$('[data-testid="tableCard"]');
    let tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class');

    expect(tableCards.length).toBe(2);
    expect(tableCardsClassName[0]).toContain('tableCard_blank');
    expect(tableCardsClassName[1]).toContain('tableCard_blank');

    const tefudaCards = await page2.$$('[data-testid="tefudaCard"]');
    await tefudaCards[0].click();

    await page.waitForTimeout(100);
    tableCards = await page.$$('[data-testid="tableCard"]');
    tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class');

    expect(tableCards.length).toBe(2);
    expect(tableCardsClassName[0]).toContain('tableCard_close');
    expect(tableCardsClassName[1]).toContain('tableCard_blank');

    await page2.close();
  });
});
