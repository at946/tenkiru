describe('rooms/customDeck', () => {
  let roomUrl;

  beforeEach(() => {
    roomUrl = urls.room();
  });

  test('ルームページで、デッキとしてカスタムデッキを選択したとき、デフォルトで「1, 2, 3」のカードが表示されること', async () => {
    await page.goto(roomUrl)
    await page.waitForSelector('[data-testid="tableCard"]')

    expect(await page.$eval('[data-testid="deckSelect"]', el => el.value)).toBe('fibonacci')

    await page.select('[data-testid="deckSelect"]', 'custom')

    const tefudaCardValues = await  page.$$eval('[data-testid="tefudaCard"]', els => els.map(el => el.innerText))
    expect(await page.$eval('[data-testid="deckSelect"]', el => el.value)).toBe('custom')
    expect(tefudaCardValues.length).toBe(3)
    expect(tefudaCardValues[0]).toBe('1')
    expect(tefudaCardValues[1]).toBe('2')
    expect(tefudaCardValues[2]).toBe('3')
  })

  test('ルームページで、カスタムデッキ以外を選択しているとき、カスタムデッキの設定アイコンが表示されないこと', async () => {
    await page.goto(roomUrl)
    await page.waitForSelector('[data-testid="tableCard"]')

    expect(await page.$eval('[data-testid="deckSelect"]', el => el.value)).toBe('fibonacci')
    expect(await page.$('[data-testid="customDeckSettingIcon"]')).toBeNull()

    await page.select('[data-testid="deckSelect"]', 'sequential')

    expect(await page.$eval('[data-testid="deckSelect"]', el => el.value)).toBe('sequential')
    expect(await page.$('[data-testid="customDeckSettingIcon"]')).toBeNull()

    await page.select('[data-testid="deckSelect"]', 'tShirtSize')

    expect(await page.$eval('[data-testid="deckSelect"]', el => el.value)).toBe('tShirtSize')
    expect(await page.$('[data-testid="customDeckSettingIcon"]')).toBeNull()
  })

  test('ルームページで、カスタムデッキを選択している状態で、カスタムデッキの設定アイコンを選択したとき、カスタムデッキ設定モーダルが表示されること', async () => {
    await page.goto(roomUrl)
    await page.waitForSelector('[data-testid="tableCard"]')
    await page.select('[data-testid="deckSelect"]', 'custom')

    expect(await page.$('[data-testid="customDeckSettingIcon"]')).not.toBeNull()
  })
  // ルームページで、カスタムデッキ設定モーダルで、カスタムデッキ設定のテキストエリアに文字を入力できること
  // ルームページで、カスタムデッキ設定モーダルで、閉じるアイコンを選択したとき、カスタムデッキは変更されずカスタムデッキ設定モーダルが閉じること
  // ルームページで、カスタムデッキ設定モーダルで、モーダル外を選択したとき、カスタムデッキは変更されずカスタムデッキ設定モーダルが閉じること
  // ルームページで、カスタムデッキ設定モーダルで、カスタムデッキ設定テキストエリアが未入力のとき、「Save」ボタンを選択できないこと
  // ルームページで、カスタムデッキ設定モーダルで、カスタムデッキ設定テキストエリアが空白行のみのとき、「Save」ボタンを選択できないこと
  // ルームページで、カスタムデッキ設定モーダルで、「Save」ボタンを選択したとき、カスタムデッキ設定のテキストエリアの改行区切りでデッキに反映されること
  // ルームページで、カスタムデッキ設定モーダルで、カスタムデッキ設定テキストエリアに空白行がある状態で、「Save」ボタンを選択したとき、空白行は無視されてデッキに反映されること
  // ルームページで、カスタムデッキの内容を更新したとき、他のメンバーのデッキの内容も更新されること
  // ルームページで、カスタムデッキを選択している状態で、カードを選択しオープンすることができること
  // ルームページで、カスタムデッキを選択しておりカードがオープンしている状態で、場に数字のカードがあるとき、Max/Min/Avgのサマリが正しく計算されて表示されること
  // ルームページで、カスタムデッキを選択しておりカードがオープンしている状態で、場に数字のカードがないとき、Max/Min/Avgのサマリが正しく計算されて表示されること
  // ルームページで、カスタムデッキを選択している状態で、新しいメンバーが入室してきたとき、そのメンバーのデッキも他のメンバーと同じカスタムデッキが表示されること
  // ルームページで、一度カスタムデッキを設定し、別のデッキを選択し直したあと、もう一度カスタムデッキを選択したとき、前回設定したカスタムデッキが手札に表示されること
  // ルームページで、カスタムデッキを設定したあと、別のルームに入室し直したとき、前のルームのカスタムデッキの設定は引き継がれないこと
})