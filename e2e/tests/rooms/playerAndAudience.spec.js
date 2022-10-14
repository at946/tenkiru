describe('rooms/playerAndAudience', () => {
test('ルームページで、デフォルトで「Player」が選択されていること', async () => {
  await page.goto(urls.room1)
  await page.waitForSelector('[data-testid="tableCard"]')

  expect(await page.$eval('[data-testid="memberTypePlayer"]', el => el.innerText)).toBe('Player')
  expect(await getAttribute.$(page, '[data-testid="memberTypePlayer"]', 'class')).toContain('is-active')
  expect(await page.$eval('[data-testid="memberTypeAudience"]', el => el.innerText)).toBe('Audience')
  expect(await getAttribute.$(page, '[data-testid="memberTypeAudience"]', 'class')).not.toContain('is-active')
})

test('ルームページで、「Player」選択中かつカード未選択かつカード未オープンの状態で、「Audience」を選択したとき、自分のテーブルカードが消え、手札カードを選べなくなること', async () => {
  // await page.goto(urls.room1)
  // await page.waitForSelector('[data-testid="tableCard"]')
  // const page2 = await browser.newPage()
  // await page2.goto(urls.room1)
  // await page2.waitForSelector('[data-testid="tableCard"]')
  
  // expect((await page.$$('[data-testid="tableCard"]')).length).toBe(2)
  // expect((await page2.$$('[data-testid="tableCard"]')).length).toBe(2)

  // await page2.click('[data-testid="memberTypeAudience"]')

  // expect((await page.$$('[data-testid="tableCard"]')).length).toBe(1)
  // expect((await page2.$$('[data-testid="tableCard"]')).length).toBe(1)

  // await page2.close()
})
// ルームページで、「Player」選択中かつカード選択済みかつカード未オープンの状態で、「Audience」を選択したとき、自分のテーブルカードが消え、手札カードの選択が解除され、手札カードを選べなくなること
// ルームページで、「Player」選択中かつカード未選択かつカードオープン済みの状態で、「Audience」を選択したとき、自分のテーブルカードが消え、手札カードを選べなくなること
// ルームページで、「Player」選択中かつカード選択済みかつカードオープン済みの状態で、「Audience」を選択したとき、自分のテーブルカードが消え、手札カードの選択が解除され、手札カードを選べなくなること
// ルームページで、「Audience」選択中かつカード未選択かつカード未オープンの状態で、「Player」を選択したとき、自分のテーブルカードが現れ、手札カードを選べるようになること
// ルームページで、「Audience」選択中かつカード選択済みかつカード未オープンの状態で、「Player」を選択したとき、自分のテーブルカードが現れ、手札カードを選べるようになること
// ルームページで、「Audience」選択中かつカード未選択かつカードオープン済みの状態で、「Player」を選択したとき、自分のテーブルカードが現れ、手札カードを選べるようになること
// ルームページで、「Audience」選択中かつカード選択済みかつカードオープン済みの状態で、「Player」を選択したとき、自分のテーブルカードが現れ、手札カードを選べるようになること
// ルームページで、メンバーが自分ひとりのときに「Audience」を選択しても問題ないこと
})
