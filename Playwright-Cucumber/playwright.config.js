// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const { config } = require('process');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName: 'chromium', //webkit per Safari e firefox per Firefox
    headless : false,
    screenshot : 'on', //le opzioni possibili sono: on, off, only-on-failure
    trace : 'on', //le opzioni possibili sono: on, off, retain-on-failure

  },

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});


