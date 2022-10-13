describe('rooms/memberSelectsCard', () => {
  test('ルームページで、他のメンバーがカードを選択したとき、カードが場に伏せて置かれること', async () => {
    const page2 = await browser.newPage();
    await page.goto(urls.room1);
    await page2.goto(urls.room1);
    await page.waitForTimeout(500);

    let tableCards = await page.$$('[data-testid="tableCard"]');
    let tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class');

    expect(tableCards.length).toBe(2);
    expect(tableCardsClassName[0]).toContain('tableCard_blank');
    expect(tableCardsClassName[0]).not.toContain('tableCard_close');
    expect(tableCardsClassName[0]).not.toContain('tableCard_open');
    expect(tableCardsClassName[1]).toContain('tableCard_blank');
    expect(tableCardsClassName[1]).not.toContain('tableCard_close');
    expect(tableCardsClassName[1]).not.toContain('tableCard_open');

    const tefudaCards = await page2.$$('[data-testid="tefudaCard"]');
    await tefudaCards[0].click();

    await page.waitForTimeout(100);
    tableCards = await page.$$('[data-testid="tableCard"]');
    tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class');

    expect(tableCards.length).toBe(2);
    expect(tableCardsClassName[0]).not.toContain('tableCard_blank');
    expect(tableCardsClassName[0]).toContain('tableCard_close');
    expect(tableCardsClassName[0]).not.toContain('tableCard_open');
    expect(tableCardsClassName[1]).toContain('tableCard_blank');
    expect(tableCardsClassName[1]).not.toContain('tableCard_close');
    expect(tableCardsClassName[1]).not.toContain('tableCard_open');
  });
});
