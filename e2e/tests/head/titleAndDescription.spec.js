describe('metatag/title', () => {
  const title = 'Tenkir';

  test('トップページで、タイトルが「Tenkir」であること', async () => {
    const description =
    'Tenkir（テンキル）はオンラインプランニングポーカーツールです。チームメンバーでわいわい使ってね。';

    await page.goto(urls.top);
    expect(await page.title()).toBe(title);
    expect(await page.$eval('meta[name="description"]', (el) => el.content)).toBe(description);
  });

  test('ルームページで、タイトルが「Tenkir」であること', async () => {
    const description ='プランニングポーカーやろ〜。Tenkirに集合〜🙌';

    await page.goto(urls.room());
    expect(await page.title()).toBe(title);
    expect(await page.$eval('meta[name="description"]', (el) => el.content)).toBe(description);
  });
});
