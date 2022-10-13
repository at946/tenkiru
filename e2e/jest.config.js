module.exports = {
  preset: 'jest-puppeteer',
  setupFiles: ['./helpers/urls.js', './helpers/getAttribute.js', './helpers/takeScreenshot.js'],
};
