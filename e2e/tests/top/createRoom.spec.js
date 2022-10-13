describe('top/createRoom', () => {
  test('トップページで、「Create a room」ボタンを選択したとき、ランダムのルームページが作成され遷移すること', async () => {
    await page.goto(urls.top)
    await page.click('[data-testid="createRoomButton"]')
    await page.waitForNavigation()
    expect(await page.url()).toMatch(/http:\/\/.*\/rooms\/.*/)
  })
})