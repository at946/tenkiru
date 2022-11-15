describe('rooms/selectDeck', () => {
  let roomUrl;

  beforeEach(() => {
    roomUrl = urls.room();
  });

  test('ルームページで、デッキはデフォルトで「Fibonacci」が選択されていること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');

    expect(await page.$eval('[data-testid="deckSelect"]', (el) => el.value)).toBe('fibonacci');
    const tefudaCardsValue = await page.$$eval('[data-testid="tefudaCard"]', (els) =>
      els.map((el) => el.innerText),
    );
    expect(tefudaCardsValue).toEqual(['0', '1', '2', '3', '5', '8', '13', '21', '?']);
  });

  test('ルームページで、デッキを変更するとき、カードの選択が解除されること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');

    const tefudaCards = await page.$$('[data-testid="tefudaCard"]');
    await tefudaCards[0].click();
    await page.waitForTimeout(100);

    let tefudaCardsClassName = await getAttribute.$$(page, '[data-testid="tefudaCard"]', 'class');
    expect(tefudaCardsClassName[0]).toContain('tefudaCard_selected');

    await page.select('[data-testid="deckSelect"]', 'sequential');

    tefudaCardsClassName = await getAttribute.$$(page, '[data-testid="tefudaCard"]', 'class');
    expect(tefudaCardsClassName[0]).not.toContain('tefudaCard_selected');
  });

  test('ルームページで、デッキを変更するとき、カードがオープン状態でも場がリセットされること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');

    const tefudaCards = await page.$$('[data-testid="tefudaCard"]');
    await tefudaCards[0].click();
    await page.click('[data-testid="openButton"]');

    let tableCardClassName = await getAttribute.$(page, '[data-testid="tableCard"]', 'class');
    let tefudaCardsClassName = await getAttribute.$$(page, '[data-testid="tefudaCard"]', 'class');
    expect(tableCardClassName).toContain('tableCard_open');
    expect(tefudaCardsClassName[0]).toContain('tefudaCard_selected');

    await page.select('[data-testid="deckSelect"]', 'sequential');

    tableCardClassName = await getAttribute.$(page, '[data-testid="tableCard"]', 'class');
    tefudaCardsClassName = await getAttribute.$$(page, '[data-testid="tefudaCard"]', 'class');
    expect(tableCardClassName).toContain('tableCard_blank');
    expect(tefudaCardsClassName[0]).not.toContain('tefudaCard_selected');
  });

  test('ルームページで、「Fibonacci」を選択したとき、フィボナッチ数列のカードが並ぶこと', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');

    await page.select('[data-testid="deckSelect"]', 'sequential');
    await page.select('[data-testid="deckSelect"]', 'fibonacci');

    expect(await page.$eval('[data-testid="deckSelect"]', (el) => el.value)).toBe('fibonacci');
    const tefudaCardsValue = await page.$$eval('[data-testid="tefudaCard"]', (els) =>
      els.map((el) => el.innerText),
    );
    expect(tefudaCardsValue).toEqual(['0', '1', '2', '3', '5', '8', '13', '21', '?']);
  });

  test('ルームページで、「Sequential」を選択したとき、1-10の数列のカードが並ぶこと', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');

    await page.select('[data-testid="deckSelect"]', 'sequential');
    await page.waitForTimeout(100);

    expect(await page.$eval('[data-testid="deckSelect"]', (el) => el.value)).toBe('sequential');
    const tefudaCardsValue = await page.$$eval('[data-testid="tefudaCard"]', (els) =>
      els.map((el) => el.innerText),
    );
    expect(tefudaCardsValue).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '?']);
  });

  test('ルームページで、「T-shirt size」を選択したとき、1-10の数列のカードが並ぶこと', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');

    await page.select('[data-testid="deckSelect"]', 'tShirtSize');
    await page.waitForTimeout(100);

    expect(await page.$eval('[data-testid="deckSelect"]', (el) => el.value)).toBe('tShirtSize');
    const tefudaCardsValue = await page.$$eval('[data-testid="tefudaCard"]', (els) =>
      els.map((el) => el.innerText),
    );
    expect(tefudaCardsValue).toEqual(['XS', 'S', 'M', 'L', 'XL', '?']);
  });

  test('ルームページで、別のメンバーがデッキを選択したとき、自分の手札に反映されること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    const page2 = await browser.newPage();
    await page2.goto(roomUrl);
    await page2.waitForSelector('[data-testid="tableCard"]');

    expect(await page.$eval('[data-testid="deckSelect"]', (el) => el.value)).toBe('fibonacci');
    expect(
      await page.$$eval('[data-testid="tefudaCard"]', (els) => els.map((el) => el.innerText)),
    ).toEqual(['0', '1', '2', '3', '5', '8', '13', '21', '?']);

    await page2.select('[data-testid="deckSelect"]', 'sequential');
    await page.waitForTimeout(100);

    expect(await page.$eval('[data-testid="deckSelect"]', (el) => el.value)).toBe('sequential');
    expect(
      await page.$$eval('[data-testid="tefudaCard"]', (els) => els.map((el) => el.innerText)),
    ).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '?']);

    await page2.close();
  });
});
