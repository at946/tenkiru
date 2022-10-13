describe('metatag/ogp', () => {
  const title = 'Tenkir'
  const description = 'Tenkir（テンキル）はオンラインプランニングポーカーツールです。チームメンバーでわいわい使ってね。'

  test('トップページで、descriptionが正しいこと', async () => {
    await page.goto(urls.top)
    expect(await page.$eval('meta[property="og:site_name"]', el => el.content)).toBe(title)
    expect(await page.$eval('meta[property="og:type"]', el => el.content)).toBe('website')
    expect(await page.$eval('meta[property="og:url"]', el => el.content)).toBe('http://localhost:3000')
    expect(await page.$eval('meta[property="og:title"]', el => el.content)).toBe(title)
    expect(await page.$eval('meta[property="og:description"]', el => el.content)).toBe(description)
    expect(await page.$eval('meta[property="og:image"]', el => el.content)).toBe('http://localhost:3000/ogp.jpg')
    expect(await page.$eval('meta[property="twitter:card"]', el => el.content)).toBe('summary')
  })

  test('ルームページで、descriptionが正しいこと', async () => {
    await page.goto(urls.room1)
    expect(await page.$eval('meta[property="og:site_name"]', el => el.content)).toBe(title)
    expect(await page.$eval('meta[property="og:type"]', el => el.content)).toBe('website')
    expect(await page.$eval('meta[property="og:url"]', el => el.content)).toBe('http://localhost:3000')
    expect(await page.$eval('meta[property="og:title"]', el => el.content)).toBe(title)
    expect(await page.$eval('meta[property="og:description"]', el => el.content)).toBe(description)
    expect(await page.$eval('meta[property="og:image"]', el => el.content)).toBe('http://localhost:3000/ogp.jpg')
    expect(await page.$eval('meta[property="twitter:card"]', el => el.content)).toBe('summary')
  })
})