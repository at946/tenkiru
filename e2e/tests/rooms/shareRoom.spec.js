describe('rooms/shareRoom', () => {
  let roomUrl, roomId

  const getRoomIdFromRoomUrl = (roomUrl) => {
    return roomUrl.replace(`${urls.top}rooms/`, '')
  }

  beforeEach(() => {
    roomUrl = urls.room()
    roomId = getRoomIdFromRoomUrl(roomUrl)
  })

  test('ルームページで、ルームIDを知れること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    expect(await page.$eval('[data-testid="roomId"]', (el) => el.innerText)).toBe(roomId);
  });

  test('ルームページで、ルームIDを選択したとき、URLをクリップボードにコピーできること', async () => {
    // TODO: https://github.com/puppeteer/puppeteer/issues/8692 に進展あったらやるかもね
    // await browser.defaultBrowserContext().overridePermissions('http://gateway.docker.internal', ['clipboard-read'])
    // expect(await page1.evaluate(() => navigator.clipboard.readText())).toBe('')
    // const page1 = await browser.newPage()
    // await page1.goto(roomUrl)
    // await page1.click('[data-testid="roomId"]')
    // expect(await page1.evaluate(() => navigator.clipboard.readText())).toBe(roomUrl)
    // const otherRoomUrl = urls.room()
    // await page2 = await browser.newPage()
    // await page2.goto(otherRoomUrl)
    // await page2.click('[data-testid="roomIdShareIcon"]')
    // expect(await page2.evaluate(() => navigator.clipboard.readText())).toBe(otherRoomUrl)
  });

  test('シェアされたルームページのURLに直接アクセスしたとき、ルームに入れること', async () => {
    await page.goto(roomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    expect(await page.url()).toBe(roomUrl);
    expect(await page.$eval('[data-testid="roomId"]', (el) => el.innerText)).toBe(roomId);

    const otherRoomUrl = urls.room()
    await page.goto(otherRoomUrl);
    await page.waitForSelector('[data-testid="tableCard"]');
    expect(await page.url()).toBe(otherRoomUrl);
    expect(await page.$eval('[data-testid="roomId"]', (el) => el.innerText)).toBe(getRoomIdFromRoomUrl(otherRoomUrl));
  });
});
