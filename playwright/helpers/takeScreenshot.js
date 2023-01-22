global.takeScreenshot = async (fileName) => {
  await page.screenshot({
    path: `screenshots/${fileName}.png`,
    fullPage: true,
  });
};
