describe('rooms/openCards', () => {
  test('ルームページで、誰もカードを場に出していないとき、カードをオープンできないこと', async () => {
    await page.goto(urls.room1);
    await page.waitForSelector('[data-testid="tableCard"]');

    let tableCardClassName = await getAttribute.$(page, '[data-testid="tableCard"]', 'class');
    expect(tableCardClassName).toContain('tableCard_blank');

    await page.click('[data-testid="openButton"]');
    await page.waitForTimeout(200);

    tableCardClassName = await getAttribute.$(page, '[data-testid="tableCard"]', 'class');
    expect(tableCardClassName).toContain('tableCard_blank');
  });

  test('ルームページで、誰かがカードを場に出している状態で、オープンボタンを選択したとき、場に出たカードがオープンすること', async () => {
    await page.goto(urls.room1);
    await page.waitForSelector('[data-testid="tableCard"]');
    const page2 = await browser.newPage();
    await page2.goto(urls.room1);
    await page2.waitForSelector('[data-testid="tableCard"]')

    let tableCardsValue = await page.$$eval('[data-testid="tableCard"]', (els) =>
      els.map((el) => el.innerText),
    );
    let tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class');
    expect(tableCardsValue[0]).toBe('');
    expect(tableCardsClassName[0]).toContain('tableCard_blank');
    expect(tableCardsValue[1]).toBe('');
    expect(tableCardsClassName[1]).toContain('tableCard_blank');

    const tefudaCards = await page.$$('[data-testid="tefudaCard"]');
    await tefudaCards[0].click();

    tableCardsValue = await page.$$eval('[data-testid="tableCard"]', (els) =>
      els.map((el) => el.innerText),
    );
    tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class');
    expect(tableCardsValue[0]).toBe('');
    expect(tableCardsClassName[0]).toContain('tableCard_close');
    expect(tableCardsValue[1]).toBe('');
    expect(tableCardsClassName[1]).toContain('tableCard_blank');

    await page.click('[data-testid="openButton"]');

    tableCardsValue = await page.$$eval('[data-testid="tableCard"]', (els) =>
      els.map((el) => el.innerText),
    );
    tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class');
    expect(tableCardsValue[0]).toBe('1');
    expect(tableCardsClassName[0]).toContain('tableCard_open');
    expect(tableCardsValue[1]).toBe('');
    expect(tableCardsClassName[1]).toContain('tableCard_blank');
    page2.close();
  });

  test('ルームページで、誰かがカードを場にでしている状態で、他のメンバーがカードをオープンできること', async () => {
    await page.goto(urls.room1);
    await page.waitForSelector('[data-testid="tableCard"]');
    const page2 = await browser.newPage();
    await page2.goto(urls.room1);
    await page2.waitForSelector('[data-testid="tableCard"]')

    let tableCardsValue = await page2.$$eval('[data-testid="tableCard"]', (els) =>
      els.map((el) => el.innerText),
    );
    let tableCardsClassName = await getAttribute.$$(page2, '[data-testid="tableCard"]', 'class');
    expect(tableCardsValue[0]).toBe('');
    expect(tableCardsClassName[0]).toContain('tableCard_blank');
    expect(tableCardsValue[1]).toBe('');
    expect(tableCardsClassName[1]).toContain('tableCard_blank');

    const tefudaCards = await page.$$('[data-testid="tefudaCard"]');
    await tefudaCards[1].click();

    tableCardsValue = await page2.$$eval('[data-testid="tableCard"]', (els) =>
      els.map((el) => el.innerText),
    );
    tableCardsClassName = await getAttribute.$$(page2, '[data-testid="tableCard"]', 'class');
    expect(tableCardsValue[0]).toBe('');
    expect(tableCardsClassName[0]).toContain('tableCard_close');
    expect(tableCardsValue[1]).toBe('');
    expect(tableCardsClassName[1]).toContain('tableCard_blank');

    await page.click('[data-testid="openButton"]');

    tableCardsValue = await page2.$$eval('[data-testid="tableCard"]', (els) =>
      els.map((el) => el.innerText),
    );
    tableCardsClassName = await getAttribute.$$(page2, '[data-testid="tableCard"]', 'class');
    expect(tableCardsValue[0]).toBe('2');
    expect(tableCardsClassName[0]).toContain('tableCard_open');
    expect(tableCardsValue[1]).toBe('');
    expect(tableCardsClassName[1]).toContain('tableCard_blank');

    page2.close();
  });

  test('ルームページで、カードをオープンした後、カードの選択を変更できないこと', async () => {
    await page.goto(urls.room1);
    await page.waitForSelector('[data-testid="tableCard"]');

    const tefudaCards = await page.$$('[data-testid="tefudaCard"]');

    await tefudaCards[0].click();

    let tableCardValue = await page.$eval('[data-testid="tableCard"]', (el) => el.innerText);
    let tefudaCardsClassName = await getAttribute.$$(page, '[data-testid="tefudaCard"]', 'class');
    expect(tableCardValue).toBe('');
    expect(tefudaCardsClassName[0]).toContain('tefudaCard_selected');
    expect(tefudaCardsClassName[1]).not.toContain('tefudaCard_selected');

    await tefudaCards[1].click();

    tableCardValue = await page.$eval('[data-testid="tableCard"]', (el) => el.innerText);
    tefudaCardsClassName = await getAttribute.$$(page, '[data-testid="tefudaCard"]', 'class');
    expect(tableCardValue).toBe('');
    expect(tefudaCardsClassName[0]).not.toContain('tefudaCard_selected');
    expect(tefudaCardsClassName[1]).toContain('tefudaCard_selected');

    await page.click('[data-testid="openButton"]');

    tableCardValue = await page.$eval('[data-testid="tableCard"]', (el) => el.innerText);
    tefudaCardsClassName = await getAttribute.$$(page, '[data-testid="tefudaCard"]', 'class');
    expect(tableCardValue).toBe('2');
    expect(tefudaCardsClassName[0]).not.toContain('tefudaCard_selected');
    expect(tefudaCardsClassName[1]).toContain('tefudaCard_selected');

    await tefudaCards[0].click();

    tableCardValue = await page.$eval('[data-testid="tableCard"]', (el) => el.innerText);
    tefudaCardsClassName = await getAttribute.$$(page, '[data-testid="tefudaCard"]', 'class');
    expect(tableCardValue).toBe('2');
    expect(tefudaCardsClassName[0]).not.toContain('tefudaCard_selected');
    expect(tefudaCardsClassName[1]).toContain('tefudaCard_selected');
  });

  test('ルームページで、カードをオープンした後、オープンボタンが表示されないこと', async () => {
    await page.goto(urls.room1);
    await page.waitForSelector('[data-testid="tableCard"]');

    const tefudaCards = await page.$$('[data-testid="tefudaCard"]');
    await tefudaCards[0].click();
    await page.click('[data-testid="openButton"]');

    expect(await page.$('[data-testid="openButton"]')).toBeNull();
  });
});
