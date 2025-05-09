// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const { config } = require('process');

module.exports = defineConfig({
  testDir: './tests',
  retries: 2,
  workers: 5,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  //reporter: [
   // ['html'], 
   // ["allure-playwright"],
  //],
  projects : [
    {
      name : 'firefox',
      use: {
        browserName: 'firefox', //webkit per Safari e firefox per Firefox
        headless : false,
        screenshot : 'on', //le opzioni possibili sono: on, off, only-on-failure
        trace : 'on', //le opzioni possibili sono: on, off, retain-on-failure
      }
    },
    {
      name : 'chrome',
      use: {
        browserName: 'chromium', //webkit per Safari e firefox per Firefox
        channel: 'chrome',
        executablePath: "C:\Users\LuciaD'Alfonso\AppData\Local\ms-playwright\chromium-1155\chrome-win\chrome.exe",
        headless : false,
        screenshot : 'on', //le opzioni possibili sono: on, off, only-on-failure
        trace : 'on', //le opzioni possibili sono: on, off, retain-on-failure, on-first-retry
        video : 'on', //le opzioni possibili sono: on, off, retain-on-failure, on-first-retry
        //viewport : {width:1900, height:2000},
        //...devices['Galaxy S III']
      }
    }
    
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName: 'firefox', //webkit per Safari e firefox per Firefox
    headless : true,
    screenshot : 'on', //le opzioni possibili sono: on, off, only-on-failure
    trace : 'on', //le opzioni possibili sono: on, off, retain-on-failure
    ignoreHTTPSErrors: true,
    permissions: ['geolocation']
  },

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});


