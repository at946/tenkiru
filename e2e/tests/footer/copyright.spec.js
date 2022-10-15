describe('footer/copyright', () => {
  test('トップページで、フッターのコピーライトを選択したとき、開発者のTwitterプロフィールページへ遷移すること', async () => {
    await page.goto(urls.top);
    expect(await page.$eval('[data-testid="copyright"]', (el) => el.innerText)).toBe('@asato');
    expect(await page.$eval('[data-testid="copyright"]', (el) => el.getAttribute('href'))).toBe(
      'https://twitter.com/at_946',
    );
    expect(await page.$eval('[data-testid="copyright"]', (el) => el.getAttribute('target'))).toBe(
      '_blank',
    );
  });

  test('ルームページで、フッターのコピーライトを選択したとき、開発者のTwitterプロフィールページへ遷移すること', async () => {
    await page.goto(urls.room());
    expect(await page.$eval('[data-testid="copyright"]', (el) => el.innerText)).toBe('@asato');
    expect(await page.$eval('[data-testid="copyright"]', (el) => el.getAttribute('href'))).toBe(
      'https://twitter.com/at_946',
    );
    expect(await page.$eval('[data-testid="copyright"]', (el) => el.getAttribute('target'))).toBe(
      '_blank',
    );
  });
});
