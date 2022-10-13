describe('rooms/leaveRoom', () => {
  test('ルームページで、別のページに遷移したとき、ルームから抜け出すこと', async () => {
    await page.goto(urls.room1)
    const page2 = await browser.newPage()
    await page2.goto(urls.room1)
    await page.waitForTimeout(500)

    let tableCards = await page.$$('[data-testid="tableCard"]')
    expect(tableCards.length).toBe(2)

    await page2.goto(urls.top)

    tableCards = await page.$$('[data-testid="tableCard"]')
    expect(tableCards.length).toBe(1)
  })

  test('ルームページで、ブラウザを閉じたとき、ルームから抜け出すこと', async () => {
    await page.goto(urls.room1)
    const page2 = await browser.newPage()
    await page2.goto(urls.room1)
    await page.waitForTimeout(500)

    let tableCards = await page.$$('[data-testid="tableCard"]')
    expect(tableCards.length).toBe(2)

    await page2.close()
    await page.waitForTimeout(100)

    tableCards = await page.$$('[data-testid="tableCard"]')
    expect(tableCards.length).toBe(1)
  })
})