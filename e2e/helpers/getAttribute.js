global.getAttribute = {
  $: async (page, selector, attribute) => {
    return await page.$eval(selector, (el, attribute) => el.getAttribute(attribute), attribute)
  },
  $$: async (page, selector, attribute) => {
    return await page.$$eval(selector, (els, attribute) => els.map(el => {
      return el.getAttribute(attribute)
    }), attribute)
  }
}
