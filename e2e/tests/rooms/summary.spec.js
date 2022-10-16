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

    expect(await page.$eval('[data-testid="max"]', (el) => el.innerText)).toBe('Max\n13');
    expect(await page.$eval('[data-testid="min"]', (el) => el.innerText)).toBe('Min\n3');
    expect(await page.$eval('[data-testid="avg"]', (el) => el.innerText)).toBe('Avg\n7');

    page2.close();
    page3.close();
  }, 10000);

  test('ルームページで、カードを出していないプレイヤーがいる状態で、カードをオープンにしたとき、場に出されたカードの最大値、最小値、平均値が正しく表示されること', async () => {
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

    await tefudaCards[1].click(); // 2を選択
    await tefudaCards2[2].click(); // 3を選択

    expect(await page.$('[data-testid="max"]')).toBeNull();
    expect(await page.$('[data-testid="min"]')).toBeNull();
    expect(await page.$('[data-testid="avg"]')).toBeNull();

    await page.click('[data-testid="openButton"]');

    expect(await page.$eval('[data-testid="max"]', (el) => el.innerText)).toBe('Max\n3');
    expect(await page.$eval('[data-testid="min"]', (el) => el.innerText)).toBe('Min\n2');
    expect(await page.$eval('[data-testid="avg"]', (el) => el.innerText)).toBe('Avg\n2.5');

    page2.close();
    page3.close();
  }, 10000);

  test('ルームページで、「？」のカードがある状態で、カードをオープンしたとき、場に出されたカードの最大値、最小値、平均値が正しく表示されること', async () => {
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

    await tefudaCards[0].click(); // 1を選択
    await tefudaCards2[tefudaCards2.length - 1].click(); // ?を選択
    await tefudaCards3[1].click(); // 2を選択

    expect(await page.$('[data-testid="max"]')).toBeNull();
    expect(await page.$('[data-testid="min"]')).toBeNull();
    expect(await page.$('[data-testid="avg"]')).toBeNull();

    await page.click('[data-testid="openButton"]');

    expect(await page.$eval('[data-testid="max"]', (el) => el.innerText)).toBe('Max\n2');
    expect(await page.$eval('[data-testid="min"]', (el) => el.innerText)).toBe('Min\n1');
    expect(await page.$eval('[data-testid="avg"]', (el) => el.innerText)).toBe('Avg\n1.5');

    page2.close();
    page3.close();
  }, 10000);

  test('ルームページで、カードをオープンにしたあとで、プレイヤーがオーディエンスに変わっても、場に出されたカードの最大値、最小値、平均値が再計算され正しく表示されること', async () => {
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
    await page.click('[data-testid="openButton"]');

    expect(await page.$eval('[data-testid="max"]', (el) => el.innerText)).toBe('Max\n13');
    expect(await page.$eval('[data-testid="min"]', (el) => el.innerText)).toBe('Min\n3');
    expect(await page.$eval('[data-testid="avg"]', (el) => el.innerText)).toBe('Avg\n7');

    await page3.click('[data-testid="memberTypeAudience"]');

    expect(await page.$eval('[data-testid="max"]', (el) => el.innerText)).toBe('Max\n5');
    expect(await page.$eval('[data-testid="min"]', (el) => el.innerText)).toBe('Min\n3');
    expect(await page.$eval('[data-testid="avg"]', (el) => el.innerText)).toBe('Avg\n4');

    page2.close();
    page3.close();
  });

  test('ルームページで、場に数字のカードが出ていないとき、サマリーが表示されないこと', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');

    const tefudaCards = await page.$$('[data-testid="tefudaCard"]');
    await tefudaCards[tefudaCards.length - 1].click(); // ?を選択
    await page.click('[data-testid="openButton"]');

    expect(await page.$('[data-testid="max"]')).toBeNull();
    expect(await page.$('[data-testid="min"]')).toBeNull();
    expect(await page.$('[data-testid="avg"]')).toBeNull();

    await page.click('[data-testid="memberTypeAudience"]');

    expect(await page.$('[data-testid="max"]')).toBeNull();
    expect(await page.$('[data-testid="min"]')).toBeNull();
    expect(await page.$('[data-testid="avg"]')).toBeNull();
  });
});
