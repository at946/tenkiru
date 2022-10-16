describe('header/buymeacoffee', () => {
  test('トップページで、ヘッダーのコーヒーアイコンを選択したとき、buymeacoffeeのページへ遷移すること', async () => {
    await page.goto(urls.top);
    expect(await page.$eval('[data-testid="buymeacoffee"]', (el) => el.getAttribute('href'))).toBe(
      'https://www.buymeacoffee.com/at946',
    );
    expect(
      await page.$eval('[data-testid="buymeacoffee"]', (el) => el.getAttribute('target')),
    ).toBe('_blank');
  });

  test('ルームページで、ヘッダーのコーヒーアイコンを選択したとき、buymeacoffeeのページへ遷移すること', async () => {
    await page.goto(urls.room());
    expect(await page.$eval('[data-testid="buymeacoffee"]', (el) => el.getAttribute('href'))).toBe(
      'https://www.buymeacoffee.com/at946',
    );
    expect(
      await page.$eval('[data-testid="buymeacoffee"]', (el) => el.getAttribute('target')),
    ).toBe('_blank');
  });
});
