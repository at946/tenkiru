describe('header/logo', () => {
  test('トップページで、ヘッダーのサービス名を選択したとき、どこにも遷移しないこと', async () => {
    await page.goto(urls.top);
    expect(page.url()).toBe(urls.top);
    await page.click('[data-testid="logo"]');
    await page.waitForTimeout(1000);
    expect(page.url()).toBe(urls.top);
  });

  test('ルームページで、ヘッダーのサービス名を選択したとき、トップページへ遷移すること', async () => {
    const roomUrl = urls.room()
    await page.goto(roomUrl);
    expect(page.url()).toBe(roomUrl);
    await page.click('[data-testid="logo"]');
    await page.waitForNavigation();
    expect(page.url()).toBe(urls.top);
  });
});
