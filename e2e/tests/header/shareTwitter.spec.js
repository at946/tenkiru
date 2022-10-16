describe('header/shareTwitter', () => {
  const shareText = encodeURIComponent(`Tenkir\nhttp://localhost:3000`);

  test('トップページで、ヘッダーのTwitterアイコンを選択したとき、Twitterのシェアページへ遷移すること', async () => {
    await page.goto(urls.top);
    expect(await page.$eval('[data-testid="shareTwitter"]', (el) => el.getAttribute('href'))).toBe(
      `https://twitter.com/intent/tweet?text=${shareText}`,
    );
    expect(
      await page.$eval('[data-testid="shareTwitter"]', (el) => el.getAttribute('target')),
    ).toBe('_blank');
  });

  test('ルームページで、ヘッダーのTwitterアイコンを選択したとき、Twitterのシェアページへ遷移すること', async () => {
    await page.goto(urls.room());
    expect(await page.$eval('[data-testid="shareTwitter"]', (el) => el.getAttribute('href'))).toBe(
      `https://twitter.com/intent/tweet?text=${shareText}`,
    );
    expect(
      await page.$eval('[data-testid="shareTwitter"]', (el) => el.getAttribute('target')),
    ).toBe('_blank');
  });
});
