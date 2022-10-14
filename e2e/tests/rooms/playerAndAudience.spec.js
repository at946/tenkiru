describe('rooms/playerAndAudience', () => {
  test('ルームページで、デフォルトで「Player」が選択されていること', async () => {
    await page.goto(urls.room1)
    await page.waitForSelector('[data-testid="tableCard"]')

    expect(await page.$eval('[data-testid="memberTypePlayer"]', el => el.innerText)).toBe('Player')
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).toContain('is-active')
    expect(await page.$eval('[data-testid="memberTypeAudience"]', el => el.innerText)).toBe('Audience')
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).not.toContain('is-active')
  })

  test('ルームページで、「Player」選択中かつカード未選択かつカード未オープンの状態で、「Audience」を選択したとき、自分のテーブルカードが消え、手札カードを選べなくなること', async () => {
    await page.goto(urls.room1)
    await page.waitForSelector('[data-testid="tableCard"]')
    const page2 = await browser.newPage()
    await page2.goto(urls.room1)
    await page2.waitForSelector('[data-testid="tableCard"]')
    
    let tableCards = await page.$$('[data-testid="tableCard"]')
    let tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class')
    expect(tableCards.length).toBe(2)
    expect(tableCardsClassName[0]).toContain('tableCard_blank')
    expect(tableCardsClassName[1]).toContain('tableCard_blank')
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).toContain('is-active')
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).not.toContain('is-active')

    await page.click('[data-testid="memberTypeAudience"]')

    tableCards = await page.$$('[data-testid="tableCard"]')
    tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class')
    expect(tableCards.length).toBe(1)
    expect(tableCardsClassName[0]).toContain('tableCard_blank')
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).not.toContain('is-active')
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).toContain('is-active')

    await page2.close()
  })

  test('ルームページで、「Player」選択中かつカード選択済みかつカード未オープンの状態で、「Audience」を選択したとき、自分のテーブルカードが消え、手札カードの選択が解除され、手札カードを選べなくなること', async () => {
    await page.goto(urls.room1)
    await page.waitForSelector('[data-testid="tableCard"]')
    const page2 = await browser.newPage()
    await page2.goto(urls.room1)
    await page2.waitForSelector('[data-testid="tableCard"]')

    const tefudaCards = await page.$$('[data-testid="tefudaCard"]')
    await tefudaCards[0].click()
    
    let tableCards = await page.$$('[data-testid="tableCard"]')
    let tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class')
    expect(tableCards.length).toBe(2)
    expect(tableCardsClassName[0]).toContain('tableCard_close')
    expect(tableCardsClassName[1]).toContain('tableCard_blank')
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).toContain('is-active')
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).not.toContain('is-active')

    await page.click('[data-testid="memberTypeAudience"]')

    tableCards = await page.$$('[data-testid="tableCard"]')
    tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class')
    expect(tableCards.length).toBe(1)
    expect(tableCardsClassName[0]).toContain('tableCard_blank')
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).not.toContain('is-active')
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).toContain('is-active')

    await page2.close()
  })

  test('ルームページで、「Player」選択中かつカード未選択かつカードオープン済みの状態で、「Audience」を選択したとき、自分のテーブルカードが消え、手札カードを選べなくなること', async () => {
    await page.goto(urls.room1)
    await page.waitForSelector('[data-testid="tableCard"]')
    const page2 = await browser.newPage()
    await page2.goto(urls.room1)
    await page2.waitForSelector('[data-testid="tableCard"]')

    const tefudaCards = await page2.$$('[data-testid="tefudaCard"]')
    await tefudaCards[1].click()
    
    await page.click('[data-testid="openButton"]')
    
    let tableCards = await page.$$('[data-testid="tableCard"]')
    let tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class')
    expect(tableCards.length).toBe(2)
    expect(tableCardsClassName[0]).toContain('tableCard_open')
    expect(tableCardsClassName[1]).toContain('tableCard_blank')
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).toContain('is-active')
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).not.toContain('is-active')

    await page.click('[data-testid="memberTypeAudience"]')

    tableCards = await page.$$('[data-testid="tableCard"]')
    tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class')
    expect(tableCards.length).toBe(1)
    expect(tableCardsClassName[0]).toContain('tableCard_open')
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).not.toContain('is-active')
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).toContain('is-active')

    await page2.close()
  })

  test('ルームページで、「Player」選択中かつカード選択済みかつカードオープン済みの状態で、「Audience」を選択したとき、自分のテーブルカードが消え、手札カードの選択が解除され、手札カードを選べなくなること', async () => {
    await page.goto(urls.room1)
    await page.waitForSelector('[data-testid="tableCard"]')
    const page2 = await browser.newPage()
    await page2.goto(urls.room1)
    await page2.waitForSelector('[data-testid="tableCard"]')

    const tefudaCards = await page.$$('[data-testid="tefudaCard"]')
    await tefudaCards[2].click()
    
    await page.click('[data-testid="openButton"]')
    
    let tableCards = await page.$$('[data-testid="tableCard"]')
    let tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class')
    expect(tableCards.length).toBe(2)
    expect(tableCardsClassName[0]).toContain('tableCard_open')
    expect(tableCardsClassName[1]).toContain('tableCard_blank')
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).toContain('is-active')
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).not.toContain('is-active')

    await page.click('[data-testid="memberTypeAudience"]')

    tableCards = await page.$$('[data-testid="tableCard"]')
    tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class')
    expect(tableCards.length).toBe(1)
    expect(tableCardsClassName[0]).toContain('tableCard_blank')
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).not.toContain('is-active')
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).toContain('is-active')

    await page2.close()
  })

  test('ルームページで、「Audience」選択中かつカード未選択かつカード未オープンの状態で、「Player」を選択したとき、自分のテーブルカードが現れ、手札カードを選べるようになること', async () => {
    await page.goto(urls.room1)
    await page.waitForSelector('[data-testid="tableCard"]')
    const page2 = await browser.newPage()
    await page2.goto(urls.room1)
    await page2.waitForSelector('[data-testid="tableCard"]')

    await page.click('[data-testid="memberTypeAudience"]')
    
    let tableCards = await page.$$('[data-testid="tableCard"]')
    let tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class')
    expect(tableCards.length).toBe(1)
    expect(tableCardsClassName[0]).toContain('tableCard_blank')
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).not.toContain('is-active')
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).toContain('is-active')

    await page.click('[data-testid="memberTypePlayer"]')

    tableCards = await page.$$('[data-testid="tableCard"]')
    tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class')
    expect(tableCards.length).toBe(2)
    expect(tableCardsClassName[0]).toContain('tableCard_blank')
    expect(tableCardsClassName[1]).toContain('tableCard_blank')
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).toContain('is-active')
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).not.toContain('is-active')

    await page2.close()
  })

  test('ルームページで、「Audience」選択中かつカード選択済みかつカード未オープンの状態で、「Player」を選択したとき、自分のテーブルカードが現れ、手札カードを選べるようになること', async () => {
    await page.goto(urls.room1)
    await page.waitForSelector('[data-testid="tableCard"]')
    const page2 = await browser.newPage()
    await page2.goto(urls.room1)
    await page2.waitForSelector('[data-testid="tableCard"]')

    const tefudaCards = await page.$$('[data-testid="tefudaCard"]')
    await tefudaCards[0].click()

    let tefudaCardsClassName = await getAttribute.$$(page, '[data-testid="tefudaCard"]', 'class')
    expect(tefudaCardsClassName[0]).toContain('tefudaCard_selected')

    await page.click('[data-testid="memberTypeAudience"]')
    
    let tableCards = await page.$$('[data-testid="tableCard"]')
    let tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class')
    tefudaCardsClassName = await getAttribute.$$(page, '[data-testid="tefudaCard"]', 'class')
    expect(tableCards.length).toBe(1)
    expect(tableCardsClassName[0]).toContain('tableCard_blank')
    expect(tefudaCardsClassName[0]).not.toContain('tefudaCard_selected')
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).not.toContain('is-active')
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).toContain('is-active')

    await page.click('[data-testid="memberTypePlayer"]')

    tableCards = await page.$$('[data-testid="tableCard"]')
    tableCardsClassName = await getAttribute.$$(page, '[data-testid="tableCard"]', 'class')
    expect(tableCards.length).toBe(2)
    expect(tableCardsClassName[0]).toContain('tableCard_blank')
    expect(tableCardsClassName[1]).toContain('tableCard_blank')
    expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).toContain('is-active')
    expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).not.toContain('is-active')

    await page2.close()
  })
// ルームページで、「Audience」選択中かつカード未選択かつカードオープン済みの状態で、「Player」を選択したとき、自分のテーブルカードが現れ、手札カードを選べるようになること
// ルームページで、「Audience」選択中かつカード選択済みかつカードオープン済みの状態で、「Player」を選択したとき、自分のテーブルカードが現れ、手札カードを選べるようになること
// ルームページで、メンバーが自分ひとりのときに「Audience」を選択しても問題ないこと
})
