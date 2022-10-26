describe('rooms/customDeck', () => {
  let roomUrl;

  beforeEach(() => {
    roomUrl = urls.room();
  });

  test('ルームページで、デッキとしてカスタムデッキを選択したとき、デフォルトで「1, 2, 3」のカードが表示されること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');

    expect(await page.$eval('[data-testid="deckSelect"]', (el) => el.value)).toBe('fibonacci');

    await page.select('[data-testid="deckSelect"]', 'custom');
    await page.waitForTimeout(100);

    const tefudaCardValues = await page.$$eval('[data-testid="tefudaCard"]', (els) =>
      els.map((el) => el.innerText),
    );
    expect(await page.$eval('[data-testid="deckSelect"]', (el) => el.value)).toBe('custom');
    expect(tefudaCardValues.length).toBe(3);
    expect(tefudaCardValues[0]).toBe('1');
    expect(tefudaCardValues[1]).toBe('2');
    expect(tefudaCardValues[2]).toBe('3');
  });

  test('ルームページで、カスタムデッキ以外を選択しているとき、カスタムデッキの設定アイコンが表示されないこと', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');

    expect(await page.$eval('[data-testid="deckSelect"]', (el) => el.value)).toBe('fibonacci');
    expect(await page.$('[data-testid="customDeckSettingIcon"]')).toBeNull();

    await page.select('[data-testid="deckSelect"]', 'sequential');
    await page.waitForTimeout(100);

    expect(await page.$eval('[data-testid="deckSelect"]', (el) => el.value)).toBe('sequential');
    expect(await page.$('[data-testid="customDeckSettingIcon"]')).toBeNull();

    await page.select('[data-testid="deckSelect"]', 'tShirtSize');
    await page.waitForTimeout(100);

    expect(await page.$eval('[data-testid="deckSelect"]', (el) => el.value)).toBe('tShirtSize');
    expect(await page.$('[data-testid="customDeckSettingIcon"]')).toBeNull();
  });

  test('ルームページで、カスタムデッキを選択している状態で、カスタムデッキの設定アイコンを選択したとき、カスタムデッキ設定モーダルが表示されること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    await page.select('[data-testid="deckSelect"]', 'custom');
    await page.waitForSelector('[data-testid="customDeckSettingIcon"]');

    expect(await page.$('[data-testid="customDeckSettingIcon"]')).not.toBeNull();
    expect(await page.$('[data-testid="customDeckSettingModal"]')).toBeNull();

    await page.click('[data-testid="customDeckSettingIcon"]');

    expect(await page.$('[data-testid="customDeckSettingModal"]')).not.toBeNull();
  });

  test('ルームページで、カスタムデッキ設定モーダルで、カスタムデッキ設定のテキストエリアに文字を入力できること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    await page.select('[data-testid="deckSelect"]', 'custom');
    await page.waitForSelector('[data-testid="customDeckSettingIcon"]');
    await page.click('[data-testid="customDeckSettingIcon"]');

    expect(
      await page.$eval('[data-testid="customDeckSettingModalTextarea"]', (el) => el.value),
    ).toBe('1\n2\n3');

    await page.$eval('[data-testid="customDeckSettingModalTextarea"]', (el) => (el.value = ''));
    await page.type('[data-testid="customDeckSettingModalTextarea"]', '1\n3\n5\n7\n9');

    expect(
      await page.$eval('[data-testid="customDeckSettingModalTextarea"]', (el) => el.value),
    ).toBe('1\n3\n5\n7\n9');
  });

  test('ルームページで、カスタムデッキ設定モーダルで、閉じるアイコンを選択したとき、カスタムデッキは変更されずカスタムデッキ設定モーダルが閉じること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    await page.select('[data-testid="deckSelect"]', 'custom');
    await page.waitForSelector('[data-testid="customDeckSettingIcon"]');
    await page.click('[data-testid="customDeckSettingIcon"]');

    let tefudaCardValues = await page.$$eval('[data-testid="tefudaCard"]', (els) =>
      els.map((el) => el.innerText),
    );
    expect(await page.$eval('[data-testid="deckSelect"]', (el) => el.value)).toBe('custom');
    expect(tefudaCardValues.length).toBe(3);
    expect(tefudaCardValues[0]).toBe('1');
    expect(tefudaCardValues[1]).toBe('2');
    expect(tefudaCardValues[2]).toBe('3');

    await page.$eval('[data-testid="customDeckSettingModalTextarea"]', (el) => (el.value = ''));
    await page.type('[data-testid="customDeckSettingModalTextarea"]', '1\n3\n5\n7\n9');
    await page.click('[data-testid="customDeckSettingModalCloseButton"]');

    tefudaCardValues = await page.$$eval('[data-testid="tefudaCard"]', (els) =>
      els.map((el) => el.innerText),
    );
    expect(await page.$eval('[data-testid="deckSelect"]', (el) => el.value)).toBe('custom');
    expect(tefudaCardValues.length).toBe(3);
    expect(tefudaCardValues[0]).toBe('1');
    expect(tefudaCardValues[1]).toBe('2');
    expect(tefudaCardValues[2]).toBe('3');

    await page.click('[data-testid="customDeckSettingIcon"]');

    expect(
      await page.$eval('[data-testid="customDeckSettingModalTextarea"]', (el) => el.value),
    ).toBe('1\n2\n3');
  });

  test('ルームページで、カスタムデッキ設定モーダルで、モーダル外を選択したとき、カスタムデッキは変更されずカスタムデッキ設定モーダルが閉じること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    await page.select('[data-testid="deckSelect"]', 'custom');
    await page.waitForSelector('[data-testid="customDeckSettingIcon"]');
    await page.click('[data-testid="customDeckSettingIcon"]');

    let tefudaCardValues = await page.$$eval('[data-testid="tefudaCard"]', (els) =>
      els.map((el) => el.innerText),
    );
    expect(await page.$eval('[data-testid="deckSelect"]', (el) => el.value)).toBe('custom');
    expect(tefudaCardValues.length).toBe(3);
    expect(tefudaCardValues[0]).toBe('1');
    expect(tefudaCardValues[1]).toBe('2');
    expect(tefudaCardValues[2]).toBe('3');

    await page.$eval('[data-testid="customDeckSettingModalTextarea"]', (el) => (el.value = ''));
    await page.type('[data-testid="customDeckSettingModalTextarea"]', '1\n3\n5\n7\n9');
    await page.mouse.click(100, 100);

    tefudaCardValues = await page.$$eval('[data-testid="tefudaCard"]', (els) =>
      els.map((el) => el.innerText),
    );
    expect(await page.$eval('[data-testid="deckSelect"]', (el) => el.value)).toBe('custom');
    expect(tefudaCardValues.length).toBe(3);
    expect(tefudaCardValues[0]).toBe('1');
    expect(tefudaCardValues[1]).toBe('2');
    expect(tefudaCardValues[2]).toBe('3');

    await page.click('[data-testid="customDeckSettingIcon"]');

    expect(
      await page.$eval('[data-testid="customDeckSettingModalTextarea"]', (el) => el.value),
    ).toBe('1\n2\n3');
  });

  test('ルームページで、カスタムデッキ設定モーダルで、カスタムデッキ設定テキストエリアが未入力のとき、「Save」ボタンを選択できないこと', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    await page.select('[data-testid="deckSelect"]', 'custom');
    await page.waitForSelector('[data-testid="customDeckSettingIcon"]');
    await page.click('[data-testid="customDeckSettingIcon"]');
    await page.click('[data-testid="customDeckSettingModalTextarea"]');
    await page.keyboard.down('ControlLeft');
    await page.keyboard.press('KeyA');
    await page.keyboard.up('ControlLeft');
    await page.keyboard.press('Backspace');

    expect(
      await page.$eval('[data-testid="customDeckSettingModalSaveButton"]', (el) => el.disabled),
    ).toBeTruthy();
  });

  test('ルームページで、カスタムデッキ設定モーダルで、カスタムデッキ設定テキストエリアが空白行のみのとき、「Save」ボタンを選択できないこと', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    await page.select('[data-testid="deckSelect"]', 'custom');
    await page.waitForSelector('[data-testid="customDeckSettingIcon"]');
    await page.click('[data-testid="customDeckSettingIcon"]');
    await page.$eval('[data-testid="customDeckSettingModalTextarea"]', (el) => (el.value = ''));
    await page.type('[data-testid="customDeckSettingModalTextarea"]', '\n \n　\n\t\n');

    expect(
      await page.$eval('[data-testid="customDeckSettingModalSaveButton"]', (el) => el.disabled),
    ).toBeTruthy();
  });

  test('ルームページで、カスタムデッキ設定モーダルで、「Save」ボタンを選択したとき、カスタムデッキ設定のテキストエリアの改行区切りでデッキに反映されること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    await page.select('[data-testid="deckSelect"]', 'custom');
    await page.waitForSelector('[data-testid="customDeckSettingIcon"]');
    await page.click('[data-testid="customDeckSettingIcon"]');
    await page.$eval('[data-testid="customDeckSettingModalTextarea"]', (el) => (el.value = ''));
    await page.type('[data-testid="customDeckSettingModalTextarea"]', '1\n50\n100\n?');
    await page.click('[data-testid="customDeckSettingModalSaveButton"]');

    const tefudaCardsValue = await page.$$eval('[data-testid="tefudaCard"]', (els) =>
      els.map((el) => el.innerText),
    );
    await takeScreenshot(1);
    expect(await page.$('[data-testid="customDeckSettingModal"]')).toBeNull();
    expect(tefudaCardsValue.length).toBe(4);
    expect(tefudaCardsValue[0]).toBe('1');
    expect(tefudaCardsValue[1]).toBe('50');
    expect(tefudaCardsValue[2]).toBe('100');
    expect(tefudaCardsValue[3]).toBe('?');
  });

  test('ルームページで、カスタムデッキ設定モーダルで、カスタムデッキ設定テキストエリアに空白行がある状態で、「Save」ボタンを選択したとき、空白行は無視されてデッキに反映されること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    await page.select('[data-testid="deckSelect"]', 'custom');
    await page.waitForSelector('[data-testid="customDeckSettingIcon"]');
    await page.click('[data-testid="customDeckSettingIcon"]');
    await page.$eval('[data-testid="customDeckSettingModalTextarea"]', (el) => (el.value = ''));
    await page.type('[data-testid="customDeckSettingModalTextarea"]', '1\n \n50\n　\n100\n\n?');
    await page.click('[data-testid="customDeckSettingModalSaveButton"]');

    const tefudaCardsValue = await page.$$eval('[data-testid="tefudaCard"]', (els) =>
      els.map((el) => el.innerText),
    );
    expect(await page.$('[data-testid="customDeckSettingModal"]')).toBeNull();
    expect(tefudaCardsValue.length).toBe(4);
    expect(tefudaCardsValue[0]).toBe('1');
    expect(tefudaCardsValue[1]).toBe('50');
    expect(tefudaCardsValue[2]).toBe('100');
    expect(tefudaCardsValue[3]).toBe('?');
  });

  test('ルームページで、カスタムデッキの内容を更新したとき、他のメンバーのデッキの内容も更新されること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    const page2 = await browser.newPage();
    await page2.goto(roomUrl);
    await page2.waitForSelector('[data-testid="tableCard"]');

    await page2.select('[data-testid="deckSelect"]', 'custom');
    await page2.waitForSelector('[data-testid="customDeckSettingIcon"]');
    await page2.click('[data-testid="customDeckSettingIcon"]');
    await page2.$eval('[data-testid="customDeckSettingModalTextarea"]', (el) => (el.value = ''));
    await page2.type('[data-testid="customDeckSettingModalTextarea"]', '1\n \n50\n　\n100\n\n?');
    await page2.click('[data-testid="customDeckSettingModalSaveButton"]');

    const tefudaCardsValue = await page.$$eval('[data-testid="tefudaCard"]', (els) =>
      els.map((el) => el.innerText),
    );
    expect(await page.$eval('[data-testid="deckSelect"]', (el) => el.value)).toBe('custom');
    expect(await page.$('[data-testid="customDeckSettingModal"]')).toBeNull();
    expect(tefudaCardsValue.length).toBe(4);
    expect(tefudaCardsValue[0]).toBe('1');
    expect(tefudaCardsValue[1]).toBe('50');
    expect(tefudaCardsValue[2]).toBe('100');
    expect(tefudaCardsValue[3]).toBe('?');

    await page2.close();
  });

  test('ルームページで、カスタムデッキを選択している状態で、カードを選択しオープンすることができること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    await page.select('[data-testid="deckSelect"]', 'custom');

    let tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class');
    expect(tableCardsClassName.length).toBe(1);
    expect(tableCardsClassName[0]).toContain('tableCard_blank');

    const tefudaCards = await page.$$('[data-testid="tefudaCard"]');
    await tefudaCards[0].click();
    await page.click('[data-testid="openButton"]');
    await page.waitForSelector('[data-testid="replayButton"]');

    tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class');
    tableCardsValue = await page.$$eval('[data-testid="tableCard"]', (els) =>
      els.map((el) => el.innerText),
    );
    expect(tableCardsClassName.length).toBe(1);
    expect(tableCardsClassName[0]).toContain('tableCard_open');
    expect(tableCardsValue[0]).toBe('1');
  });

  test('ルームページで、カスタムデッキを選択しておりカードがオープンしている状態で、場に数字のカードがあるとき、Max/Min/Avgのサマリが正しく計算されて表示されること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    const page2 = await browser.newPage();
    await page2.goto(roomUrl);
    await page2.waitForSelector('[data-testid="tableCard"]');

    await page2.select('[data-testid="deckSelect"]', 'custom');
    await page2.waitForSelector('[data-testid="customDeckSettingIcon"]');
    await page2.click('[data-testid="customDeckSettingIcon"]');
    await page2.$eval('[data-testid="customDeckSettingModalTextarea"]', (el) => (el.value = ''));
    await page2.type('[data-testid="customDeckSettingModalTextarea"]', '1\n50\n100\n?');
    await page2.click('[data-testid="customDeckSettingModalSaveButton"]');

    await (await page2.$$('[data-testid="tefudaCard"]'))[1].click();
    await (await page.$$('[data-testid="tefudaCard"]'))[2].click();
    await page.click('[data-testid="openButton"]');
    await page.waitForSelector('[data-testid="replayButton"]');

    expect(await page.$eval('[data-testid="max"]', (el) => el.innerText)).toBe('Max\n100');
    expect(await page.$eval('[data-testid="min"]', (el) => el.innerText)).toBe('Min\n50');
    expect(await page.$eval('[data-testid="avg"]', (el) => el.innerText)).toBe('Avg\n75');

    await page2.close();
  });

  test('ルームページで、カスタムデッキを選択しておりカードがオープンしている状態で、場に数字のカードがないとき、Max/Min/Avgのサマリが正しく計算されて表示されること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    const page2 = await browser.newPage();
    await page2.goto(roomUrl);
    await page2.waitForSelector('[data-testid="tableCard"]');

    await page2.select('[data-testid="deckSelect"]', 'custom');
    await page2.waitForSelector('[data-testid="customDeckSettingIcon"]');
    await page2.click('[data-testid="customDeckSettingIcon"]');
    await page2.$eval('[data-testid="customDeckSettingModalTextarea"]', (el) => (el.value = ''));
    await page2.type('[data-testid="customDeckSettingModalTextarea"]', 'One\nTwo\nThree\n?');
    await page2.click('[data-testid="customDeckSettingModalSaveButton"]');

    await (await page2.$$('[data-testid="tefudaCard"]'))[1].click();
    await (await page.$$('[data-testid="tefudaCard"]'))[2].click();
    await page.click('[data-testid="openButton"]');
    await page.waitForSelector('[data-testid="replayButton"]');

    expect(await page.$('[data-testid="max"]')).toBeNull();
    expect(await page.$('[data-testid="min"]')).toBeNull();
    expect(await page.$('[data-testid="avg"]')).toBeNull();

    await page2.close();
  });
  // ルームページで、カスタムデッキを選択している状態で、新しいメンバーが入室してきたとき、そのメンバーのデッキも他のメンバーと同じカスタムデッキが表示されること
  // ルームページで、一度カスタムデッキを設定し、別のデッキを選択し直したあと、もう一度カスタムデッキを選択したとき、前回設定したカスタムデッキが手札に表示されること
  // ルームページで、カスタムデッキを設定したあと、別のルームに入室し直したとき、前のルームのカスタムデッキの設定は引き継がれないこと
});
