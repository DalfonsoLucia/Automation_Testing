// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const { config } = require('process');

module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  //fullyParallel: true,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName: 'chromium', //webkit per Safari e firefox per Firefox
    headless : false,
    screenshot : 'on', //le opzioni possibili sono: on, off, only-on-failure
    trace: 'on',
    //Grandezza schermo pc aziendale 1265 x 580
    viewport: {width:1260, height:580},
  },
});

