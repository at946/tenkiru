describe('rooms/selectMemberType', () => {
  let roomUrl;

  beforeEach(() => {
    roomUrl = urls.room();
  });

  test('ルームページで、デフォルトで「Player」が選択されていること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');

    expect(await page.$eval('[data-testid="memberTypePlayer"]', (el) => el.innerText)).toBe(
      'Player',
    );
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).toContain(
      'is-active',
    );
    expect(await page.$eval('[data-testid="memberTypeAudience"]', (el) => el.innerText)).toBe(
      'Audience',
    );
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).not.toContain(
      'is-active',
    );
  });

  test('ルームページで、「Player」選択中かつカード未選択かつカード未オープンの状態で、「Audience」を選択したとき、自分のテーブルカードが消え、手札カードを選べなくなること', async () => {
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
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).toContain(
      'is-active',
    );
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).not.toContain(
      'is-active',
    );

    await page.click('[data-testid="memberTypeAudience"]');
    await page.waitForTimeout(100);

    tableCards = await page.$$('[data-testid="tableCard"]');
    tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class');
    expect(tableCards.length).toBe(1);
    expect(tableCardsClassName[0]).toContain('tableCard_blank');
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).not.toContain(
      'is-active',
    );
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).toContain(
      'is-active',
    );

    const tefudaCards = await page.$$('[data-testid="tefudaCard"]');
    await tefudaCards[0].click();

    let tefudaCardsClassName = await getAttribute.$$(page, '[data-testid="tefudaCard"]', 'class');
    expect(tefudaCardsClassName[0]).not.toContain('tefudaCard_selected');

    await page2.close();
  });

  test('ルームページで、「Player」選択中かつカード選択済みかつカード未オープンの状態で、「Audience」を選択したとき、自分のテーブルカードが消え、手札カードの選択が解除され、手札カードを選べなくなること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    const page2 = await browser.newPage();
    await page2.goto(roomUrl);
    await page2.waitForSelector('[data-testid="tableCard"]');

    const tefudaCards = await page.$$('[data-testid="tefudaCard"]');
    await tefudaCards[0].click();

    let tableCards = await page.$$('[data-testid="tableCard"]');
    let tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class');
    expect(tableCards.length).toBe(2);
    expect(tableCardsClassName[0]).toContain('tableCard_close');
    expect(tableCardsClassName[1]).toContain('tableCard_blank');
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).toContain(
      'is-active',
    );
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).not.toContain(
      'is-active',
    );

    await page.click('[data-testid="memberTypeAudience"]');
    await page.waitForTimeout(100);

    tableCards = await page.$$('[data-testid="tableCard"]');
    tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class');
    expect(tableCards.length).toBe(1);
    expect(tableCardsClassName[0]).toContain('tableCard_blank');
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).not.toContain(
      'is-active',
    );
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).toContain(
      'is-active',
    );

    await tefudaCards[1].click();

    let tefudaCardsClassName = await getAttribute.$$(page, '[data-testid="tefudaCard"]', 'class');
    expect(tefudaCardsClassName[1]).not.toContain('tefudaCard_selected');

    await page2.close();
  });

  test('ルームページで、「Player」選択中かつカード未選択かつカードオープン済みの状態で、「Audience」を選択したとき、自分のテーブルカードが消え、手札カードを選べなくなること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    const page2 = await browser.newPage();
    await page2.goto(roomUrl);
    await page2.waitForSelector('[data-testid="tableCard"]');

    const tefudaCards = await page2.$$('[data-testid="tefudaCard"]');
    await tefudaCards[1].click();

    await page.click('[data-testid="openButton"]');

    let tableCards = await page.$$('[data-testid="tableCard"]');
    let tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class');
    expect(tableCards.length).toBe(2);
    expect(tableCardsClassName[0]).toContain('tableCard_open');
    expect(tableCardsClassName[1]).toContain('tableCard_blank');
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).toContain(
      'is-active',
    );
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).not.toContain(
      'is-active',
    );

    await page.click('[data-testid="memberTypeAudience"]');
    await page.waitForTimeout(100);

    tableCards = await page.$$('[data-testid="tableCard"]');
    tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class');
    expect(tableCards.length).toBe(1);
    expect(tableCardsClassName[0]).toContain('tableCard_open');
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).not.toContain(
      'is-active',
    );
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).toContain(
      'is-active',
    );

    await tefudaCards[0].click();

    let tefudaCardsClassName = await getAttribute.$$(page, '[data-testid="tefudaCard"]', 'class');
    expect(tefudaCardsClassName[0]).not.toContain('tefudaCard_selected');

    await page2.close();
  });

  test('ルームページで、「Player」選択中かつカード選択済みかつカードオープン済みの状態で、「Audience」を選択したとき、自分のテーブルカードが消え、手札カードの選択が解除され、手札カードを選べなくなること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    const page2 = await browser.newPage();
    await page2.goto(roomUrl);
    await page2.waitForSelector('[data-testid="tableCard"]');

    const tefudaCards = await page.$$('[data-testid="tefudaCard"]');
    await tefudaCards[2].click();

    await page.click('[data-testid="openButton"]');

    let tableCards = await page.$$('[data-testid="tableCard"]');
    let tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class');
    expect(tableCards.length).toBe(2);
    expect(tableCardsClassName[0]).toContain('tableCard_open');
    expect(tableCardsClassName[1]).toContain('tableCard_blank');
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).toContain(
      'is-active',
    );
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).not.toContain(
      'is-active',
    );

    await page.click('[data-testid="memberTypeAudience"]');
    await page.waitForTimeout(100);

    tableCards = await page.$$('[data-testid="tableCard"]');
    tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class');
    expect(tableCards.length).toBe(1);
    expect(tableCardsClassName[0]).toContain('tableCard_blank');
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).not.toContain(
      'is-active',
    );
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).toContain(
      'is-active',
    );

    await tefudaCards[1].click();

    let tefudaCardsClassName = await getAttribute.$$(page, '[data-testid="tefudaCard"]', 'class');
    expect(tefudaCardsClassName[1]).not.toContain('tefudaCard_selected');

    await page2.close();
  });

  test('ルームページで、「Audience」選択中かつカード未選択かつカード未オープンの状態で、「Player」を選択したとき、自分のテーブルカードが現れ、手札カードを選べるようになること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    const page2 = await browser.newPage();
    await page2.goto(roomUrl);
    await page2.waitForSelector('[data-testid="tableCard"]');

    await page.click('[data-testid="memberTypeAudience"]');

    let tableCards = await page.$$('[data-testid="tableCard"]');
    let tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class');
    expect(tableCards.length).toBe(1);
    expect(tableCardsClassName[0]).toContain('tableCard_blank');
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).not.toContain(
      'is-active',
    );
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).toContain(
      'is-active',
    );

    await page.click('[data-testid="memberTypePlayer"]');
    await page.waitForTimeout(100);

    tableCards = await page.$$('[data-testid="tableCard"]');
    tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class');
    expect(tableCards.length).toBe(2);
    expect(tableCardsClassName[0]).toContain('tableCard_blank');
    expect(tableCardsClassName[1]).toContain('tableCard_blank');
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).toContain(
      'is-active',
    );
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).not.toContain(
      'is-active',
    );

    const tefudaCards = await page.$$('[data-testid="tefudaCard"]');
    await tefudaCards[0].click();

    let tefudaCardsClassName = await getAttribute.$$(page, '[data-testid="tefudaCard"]', 'class');
    expect(tefudaCardsClassName[0]).toContain('tefudaCard_selected');

    await page2.close();
  });

  test('ルームページで、「Audience」選択中かつカード選択済みかつカード未オープンの状態で、「Player」を選択したとき、自分のテーブルカードが現れ、手札カードを選べるようになること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    const page2 = await browser.newPage();
    await page2.goto(roomUrl);
    await page2.waitForSelector('[data-testid="tableCard"]');

    const tefudaCards = await page.$$('[data-testid="tefudaCard"]');
    await tefudaCards[0].click();

    let tefudaCardsClassName = await getAttribute.$$(page, '[data-testid="tefudaCard"]', 'class');
    expect(tefudaCardsClassName[0]).toContain('tefudaCard_selected');

    await page.click('[data-testid="memberTypeAudience"]');
    await page.waitForTimeout(100);

    let tableCards = await page.$$('[data-testid="tableCard"]');
    let tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class');
    tefudaCardsClassName = await getAttribute.$$(page, '[data-testid="tefudaCard"]', 'class');
    expect(tableCards.length).toBe(1);
    expect(tableCardsClassName[0]).toContain('tableCard_blank');
    expect(tefudaCardsClassName[0]).not.toContain('tefudaCard_selected');
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).not.toContain(
      'is-active',
    );
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).toContain(
      'is-active',
    );

    await page.click('[data-testid="memberTypePlayer"]');
    await page.waitForTimeout(100);

    tableCards = await page.$$('[data-testid="tableCard"]');
    tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class');
    expect(tableCards.length).toBe(2);
    expect(tableCardsClassName[0]).toContain('tableCard_blank');
    expect(tableCardsClassName[1]).toContain('tableCard_blank');
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).toContain(
      'is-active',
    );
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).not.toContain(
      'is-active',
    );

    await tefudaCards[1].click();

    tefudaCardsClassName = await getAttribute.$$(page, '[data-testid="tefudaCard"]', 'class');
    expect(tefudaCardsClassName[1]).toContain('tefudaCard_selected');

    await page2.close();
  });

  test('ルームページで、「Audience」選択中かつカード未選択かつカードオープン済みの状態で、「Player」を選択したとき、自分のテーブルカードが現れること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    const page2 = await browser.newPage();
    await page2.goto(roomUrl);
    await page2.waitForSelector('[data-testid="tableCard"]');

    await page.click('[data-testid="memberTypeAudience"]');

    const tefudaCards = await page2.$$('[data-testid="tefudaCard"]');
    await tefudaCards[0].click();

    await page.click('[data-testid="openButton"]');

    let tableCards = await page.$$('[data-testid="tableCard"]');
    let tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class');
    expect(tableCards.length).toBe(1);
    expect(tableCardsClassName[0]).toContain('tableCard_open');
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).not.toContain(
      'is-active',
    );
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).toContain(
      'is-active',
    );

    await page.click('[data-testid="memberTypePlayer"]');
    await page.waitForTimeout(100);

    tableCards = await page.$$('[data-testid="tableCard"]');
    tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class');
    expect(tableCards.length).toBe(2);
    expect(tableCardsClassName[0]).toContain('tableCard_open');
    expect(tableCardsClassName[1]).toContain('tableCard_blank');
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).toContain(
      'is-active',
    );
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).not.toContain(
      'is-active',
    );

    await tefudaCards[0].click();

    let tefudaCardsClassName = await getAttribute.$$(page, '[data-testid="tefudaCard"]', 'class');
    expect(tefudaCardsClassName[0]).not.toContain('tefudaCard_selected');

    await page2.close();
  });

  test('ルームページで、「Audience」選択中かつカード選択済みかつカードオープン済みの状態で、「Player」を選択したとき、自分のテーブルカードが現れること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    const page2 = await browser.newPage();
    await page2.goto(roomUrl);
    await page2.waitForSelector('[data-testid="tableCard"]');

    const tefudaCards = await page.$$('[data-testid="tefudaCard"]');
    await tefudaCards[0].click();
    const tefudaCards2 = await page2.$$('[data-testid="tefudaCard"]');
    await tefudaCards2[1].click();
    await page.click('[data-testid="openButton"]');
    await page.click('[data-testid="memberTypeAudience"]');

    let tableCards = await page.$$('[data-testid="tableCard"]');
    let tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class');
    expect(tableCards.length).toBe(1);
    expect(tableCardsClassName[0]).toContain('tableCard_open');
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).not.toContain(
      'is-active',
    );
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).toContain(
      'is-active',
    );

    await page.click('[data-testid="memberTypePlayer"]');

    tableCards = await page.$$('[data-testid="tableCard"]');
    tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class');
    expect(tableCards.length).toBe(2);
    expect(tableCardsClassName[0]).toContain('tableCard_open');
    expect(tableCardsClassName[1]).toContain('tableCard_blank');
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).toContain(
      'is-active',
    );
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).not.toContain(
      'is-active',
    );

    await tefudaCards[1].click();

    let tefudaCardsClassName = await getAttribute.$$(page, '[data-testid="tefudaCard"]', 'class');
    expect(tefudaCardsClassName[1]).not.toContain('tefudaCard_selected');

    await page2.close();
  });

  test('ルームページで、メンバーが自分ひとりのときに「Audience」を選択しても問題ないこと', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');

    await page.click('[data-testid="memberTypeAudience"]');
    await page.waitForSelector('[data-testid="tableCard"]', { hidden: true });
    expect((await page.$$('[data-testid="tableCard"]')).length).toBe(0);

    await page.click('[data-testid="openButton"]');
    expect(await page.$('[data-testid="openButton"]')).not.toBeNull();
    expect(await page.$('[data-testid="replayButton"]')).toBeNull();

    await page.click('[data-testid="memberTypePlayer"]');

    const tefudaCards = await page.$$('[data-testid="tefudaCard"]');
    await tefudaCards[2].click();
    await page.click('[data-testid="openButton"]');
    await page.click('[data-testid="memberTypeAudience"]');
    await page.waitForTimeout(100);

    expect((await page.$$('[data-testid="tableCard"]')).length).toBe(0);
    expect(await page.$('[data-testid="replayButton"]')).not.toBeNull();
    expect(await page.$('[data-testid="openButton"]')).toBeNull();

    await page.click('[data-testid="replayButton"]');

    expect(await page.$('[data-testid="replayButton"]')).toBeNull();
    expect(await page.$('[data-testid="openButton"]')).not.toBeNull();

    await page.click('[data-testid="memberTypePlayer"]');
  });
});
