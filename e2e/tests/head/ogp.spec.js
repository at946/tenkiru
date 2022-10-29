describe('metatag/ogp', () => {
  const title = 'Tenkir';

  test('トップページで、OGが正しいこと', async () => {
    const description =
      'Tenkir（テンキル）はオンラインプランニングポーカーツールです。チームメンバーでわいわい使ってね。';

    await page.goto(urls.top);
    expect(await page.$eval('meta[property="og:site_name"]', (el) => el.content)).toBe(title);
    expect(await page.$eval('meta[property="og:type"]', (el) => el.content)).toBe('website');
    expect(await page.$eval('meta[property="og:url"]', (el) => el.content)).toBe(
      'http://localhost:3000',
    );
    expect(await page.$eval('meta[property="og:title"]', (el) => el.content)).toBe(title);
    expect(await page.$eval('meta[property="og:description"]', (el) => el.content)).toBe(
      description,
    );
    expect(await page.$eval('meta[property="og:image"]', (el) => el.content)).toBe(
      'http://localhost:3000/ogp.jpg',
    );
    expect(await page.$eval('meta[property="twitter:card"]', (el) => el.content)).toBe('summary');
  });

  test('ルームページで、OGが正しいこと', async () => {
    const description = 'プランニングポーカーやろ〜。Tenkirに集合〜🙌';

    await page.goto(urls.room());
    expect(await page.$eval('meta[property="og:site_name"]', (el) => el.content)).toBe(title);
    expect(await page.$eval('meta[property="og:type"]', (el) => el.content)).toBe('website');
    expect(await page.$eval('meta[property="og:url"]', (el) => el.content)).toBe(
      'http://localhost:3000',
    );
    expect(await page.$eval('meta[property="og:title"]', (el) => el.content)).toBe(title);
    expect(await page.$eval('meta[property="og:description"]', (el) => el.content)).toBe(
      description,
    );
    expect(await page.$eval('meta[property="og:image"]', (el) => el.content)).toBe(
      'http://localhost:3000/ogp.jpg',
    );
    expect(await page.$eval('meta[property="twitter:card"]', (el) => el.content)).toBe('summary');
  });
});
