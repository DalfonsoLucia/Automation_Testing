// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const { config } = require('process');

module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  //fullyParallel: true,
  timeout: 60 * 1000,
  expect: {
    timeout: 10000,
  },
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName: 'chromium', //webkit per Safari e firefox per Firefox
    headless : true,
    screenshot : 'only-on-failure', //le opzioni possibili sono: on, off, only-on-failure
    trace: 'retain-on-failure',
    //Grandezza schermo pc aziendale 1265 x 580
    viewport: {width:1260, height:580},
  },
  // ⬇️ QUI aggiungi i progetti per isolare i test concorrenti
  projects: [
    {
      name: 'wishlist',
      testMatch: [
        /.*insert-product-in-wishlist\.spec\.js/,
        /.*search-product-save-it-in-wishlist\.spec\.js/,
      ],
    workers: 1
    },
    {
      name: 'others',
      testIgnore: [
      /.*insert-product-in-wishlist\.spec\.js/,
      /.*search-product-save-it-in-wishlist\.spec\.js/,
      ],
      workers: 4,
    },
  ],
});

