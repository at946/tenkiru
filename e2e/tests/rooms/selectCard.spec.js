describe('rooms/selectCard', () => {
  test('ルームページで、カードを選択したとき、カードが場に伏せて置かれること', async () => {
    const page2 = await browser.newPage();
    await page.goto(urls.room1);
    await page2.goto(urls.room1);
    await page.waitForTimeout(500);

    let tableCards = await page.$$('[data-testid="tableCard"]');
    let tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class');

    expect(tableCards.length).toBe(2);
    expect(tableCardsClassName[0]).toContain('tableCard_blank');
    expect(tableCardsClassName[1]).toContain('tableCard_blank');

    const tefudaCards = await page.$$('[data-testid="tefudaCard"]');
    await tefudaCards[0].click();

    await page.waitForTimeout(100);
    tableCards = await page.$$('[data-testid="tableCard"]');
    tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class');

    expect(tableCards.length).toBe(2);
    expect(tableCardsClassName[0]).toContain('tableCard_close');
    expect(tableCardsClassName[1]).toContain('tableCard_blank');
  });

  test('ルームページで、カードを選択したとき、選択したカードが選択状態だとわかること', async () => {
    const page2 = await browser.newPage();
    await page.goto(urls.room1);
    await page2.goto(urls.room1);

    let classNameOfTefudaCards = await getAttribute.$$(page, '[data-testid="tefudaCard"]', 'class');

    expect(classNameOfTefudaCards[0]).not.toContain('tefudaCard_selected');
    expect(classNameOfTefudaCards[1]).not.toContain('tefudaCard_selected');

    const tefudaCards = await page.$$('[data-testid="tefudaCard"]');
    await tefudaCards[0].click();
    classNameOfTefudaCards = await getAttribute.$$(page, '[data-testid="tefudaCard"]', 'class');

    expect(classNameOfTefudaCards[0]).toContain('tefudaCard_selected');
    expect(classNameOfTefudaCards[1]).not.toContain('tefudaCard_selected');

    await tefudaCards[1].click();
    classNameOfTefudaCards = await getAttribute.$$(page, '[data-testid="tefudaCard"]', 'class');

    expect(classNameOfTefudaCards[0]).not.toContain('tefudaCard_selected');
    expect(classNameOfTefudaCards[1]).toContain('tefudaCard_selected');
  });
});
