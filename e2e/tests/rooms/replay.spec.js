describe('rooms/replay', () => {
  let roomUrl;

  beforeEach(() => {
    roomUrl = urls.room();
  });
  test('ルームページで、カードをオープンしたあと、リプレイできること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');

    let tefudaCards = await page.$$('[data-testid="tefudaCard"]');
    await tefudaCards[0].click();

    expect(await page.$('[data-testid="replayButton"]')).toBeNull();

    await page.click('[data-testid="openButton"]');
    await page.waitForSelector('[data-testid="replayButton"]');

    let tefudaCardsClassName = await getAttribute.$$(page, '[data-testid="tefudaCard"]', 'class');
    let tableCardValue = await page.$eval('[data-testid="tableCard"]', (el) => el.innerText);
    let tableCardClassName = await getAttribute.$(page, '[data-testid="tableCard"]', 'class');

    expect(await page.$('[data-testid="replayButton"]')).not.toBeNull();
    expect(tefudaCardsClassName[0]).toContain('tefudaCard_selected');
    expect(tableCardValue).toBe('1');
    expect(tableCardClassName).toContain('tableCard_open');

    await page.click('[data-testid="replayButton"]');

    tefudaCardsClassName = await getAttribute.$$(page, '[data-testid="tefudaCard"]', 'class');
    tableCardValue = await page.$eval('[data-testid="tableCard"]', (el) => el.innerText);
    tableCardClassName = await getAttribute.$(page, '[data-testid="tableCard"]', 'class');

    expect(await page.$('[data-testid="replayButton"]')).toBeNull();
    expect(await page.$('[data-testid="openButton"]')).not.toBeNull();
    expect(tefudaCardsClassName[0]).not.toContain('tefudaCard_selected');
    expect(tableCardValue).toBe('');
    expect(tableCardClassName).toContain('tableCard_blank');
  });

  test('ルームページで、カードをオープンしたあと、他のメンバーがリプレイできること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    const page2 = await browser.newPage();
    await page2.goto(roomUrl);
    await page2.waitForSelector('[data-testid="tableCard"]');

    let tefudaCards = await page.$$('[data-testid="tefudaCard"]');
    await tefudaCards[0].click();

    expect(await page.$('[data-testid="replayButton"]')).toBeNull();

    await page.click('[data-testid="openButton"]');

    let tefudaCardsClassName = await getAttribute.$$(page, '[data-testid="tefudaCard"]', 'class');
    let tableCardValue = await page.$eval('[data-testid="tableCard"]', (el) => el.innerText);
    let tableCardClassName = await getAttribute.$(page, '[data-testid="tableCard"]', 'class');

    expect(await page.$('[data-testid="replayButton"]')).not.toBeNull();
    expect(tefudaCardsClassName[0]).toContain('tefudaCard_selected');
    expect(tableCardValue).toBe('1');
    expect(tableCardClassName).toContain('tableCard_open');

    await page2.click('[data-testid="replayButton"]');

    tefudaCardsClassName = await getAttribute.$$(page, '[data-testid="tefudaCard"]', 'class');
    tableCardValue = await page.$eval('[data-testid="tableCard"]', (el) => el.innerText);
    tableCardClassName = await getAttribute.$(page, '[data-testid="tableCard"]', 'class');

    expect(await page.$('[data-testid="replayButton"]')).toBeNull();
    expect(await page.$('[data-testid="openButton"]')).not.toBeNull();
    expect(tefudaCardsClassName[0]).not.toContain('tefudaCard_selected');
    expect(tableCardValue).toBe('');
    expect(tableCardClassName).toContain('tableCard_blank');

    await page2.close();
  });
});
