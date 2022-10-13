describe('rooms/shareRoom', () => {
  test('ルームページで、ルームIDを知れること', async () => {
    await page.goto(urls.room1);
    await page.waitForSelector('[data-testid="tableCard"]');
    expect(await page.$eval('[data-testid="roomId"]', (el) => el.innerText)).toBe('room1');
  });

  test('ルームページで、ルームIDを選択したとき、URLをクリップボードにコピーできること', async () => {
    // TODO: https://github.com/puppeteer/puppeteer/issues/8692 に進展あったらやるかもね
    // await browser.defaultBrowserContext().overridePermissions('http://gateway.docker.internal', ['clipboard-read'])
    // expect(await page1.evaluate(() => navigator.clipboard.readText())).toBe('')
    // const page1 = await browser.newPage()
    // await page1.goto(urls.room1)
    // await page1.click('[data-testid="roomId"]')
    // expect(await page1.evaluate(() => navigator.clipboard.readText())).toBe(urls.room1)
    // await page2 = await browser.newPage()
    // await page2.goto(urls.room2)
    // await page2.click('[data-testid="roomIdShareIcon"]')
    // expect(await page2.evaluate(() => navigator.clipboard.readText())).toBe(urls.room2)
  });

  test('シェアされたルームページのURLに直接アクセスしたとき、ルームに入れること', async () => {
    await page.goto(urls.room1);
    await page.waitForSelector('[data-testid="tableCard"]');
    expect(await page.url()).toBe(urls.room1);
    expect(await page.$eval('[data-testid="roomId"]', (el) => el.innerText)).toBe('room1');

    await page.goto(urls.room2);
    await page.waitForSelector('[data-testid="tableCard"]');
    expect(await page.url()).toBe(urls.room2);
    expect(await page.$eval('[data-testid="roomId"]', (el) => el.innerText)).toBe('room2');
  });
});
