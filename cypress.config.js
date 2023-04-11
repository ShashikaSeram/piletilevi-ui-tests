const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
    },
    chromeWebSecurity: false,
    // defaultCommandTimeout: 8000
    env: {
      piletilevi_url: 'https://www.piletilevi.ee/eng'
    }
  },
});
