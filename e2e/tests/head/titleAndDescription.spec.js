describe('metatag/title', () => {
  const title = 'Tenkir'
  const description = 'Tenkir（テンキル）はオンラインプランニングポーカーツールです。チームメンバーでわいわい使ってね。'

  test('トップページで、タイトルが「Tenkir」であること', async () => {
    await page.goto(urls.top)
    expect(await page.title()).toBe(title)
    expect(await page.$eval('meta[name="description"]', el => el.content)).toBe(description)
  })

  test('ルームページで、タイトルが「Tenkir」であること', async () => {
    await page.goto(urls.room1)
    expect(await page.title()).toBe(title)
    expect(await page.$eval('meta[name="description"]', el => el.content)).toBe(description)
  })
})