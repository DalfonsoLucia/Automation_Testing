import { defineConfig } from 'cypress'

export default defineConfig({

  viewportWidth: 1920,
  viewportHeight: 1080,
  reporter: 'cypress-multi-reporters',
    reporterOptions: {
    configFile: 'reporter-config.json',
  },
  env: {
    username: 'dalfonsolucia@live.it',
    password: 'Luckystark90!',
    apiUrl: 'https://api.realworld.io'
  },
  retries: {
    runMode: 2,
    openMode: 0
  },

  e2e: {
    setupNodeEvents(on, config) {
      /* const username = process.env['DB_USERNAME']
      const password = process.env['PASSWORD']

      if(!password){
        throw new Error('missing PASSWORD enviroment variable')
      }
      config.env = {username, password}
      return config */
    },
    baseUrl: 'http://localhost:4200',
    specPattern: 'cypress/e2e/**/*{js,jsx,ts,tsx}',
    excludeSpecPattern: ["**/1-getting-started/*", "**/2-advanced-examples/*"]
  },
})