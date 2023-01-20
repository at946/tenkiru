describe('footer/links', () => {
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

  test('トップページで、フッターの利用規約を選択したとき、利用規約ページへ遷移すること', async () => {
    await page.goto(urls.top);
    await page.click('[data-testid="link_to_tos"]');
    await page.waitForTimeout(1000);
    expect(page.url()).toBe(urls.tos);
  });

  test('トップページで、フッターのプライバシーポリシーを選択したとき、プライバシーポリシーページへ遷移すること', async () => {
    await page.goto(urls.top);
    await page.click('[data-testid="link_to_pp"]');
    await page.waitForTimeout(1000);
    expect(page.url()).toBe(urls.pp);
  });

  test('トップページで、フッターのお問い合わせを選択したとき、開発者のTwitterプロフィールページへ遷移すること', async () => {
    await page.goto(urls.top);
    expect(
      await page.$eval('[data-testid="link_to_inquiry"]', (el) => el.getAttribute('href')),
    ).toBe('https://twitter.com/at_946');
    expect(
      await page.$eval('[data-testid="link_to_inquiry"]', (el) => el.getAttribute('target')),
    ).toBe('_blank');
  });
});
