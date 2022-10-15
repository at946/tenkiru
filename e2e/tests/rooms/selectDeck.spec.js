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
    expect(tefudaCardsValue).toEqual(['1', '2', '3', '5', '8', '13', '21', '?']);
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
    expect(tefudaCardsValue).toEqual(['1', '2', '3', '5', '8', '13', '21', '?']);
  });

  test('ルームページで、「Sequential」を選択したとき、1-10の数列のカードが並ぶこと', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');

    await page.select('[data-testid="deckSelect"]', 'sequential');

    expect(await page.$eval('[data-testid="deckSelect"]', (el) => el.value)).toBe('sequential');
    const tefudaCardsValue = await page.$$eval('[data-testid="tefudaCard"]', (els) =>
      els.map((el) => el.innerText),
    );
    expect(tefudaCardsValue).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '?']);
  });
});
