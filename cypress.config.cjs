/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
// cypress.config.cjs
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
    baseUrl: 'http://localhost:5173',
  },
});