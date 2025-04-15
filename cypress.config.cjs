/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
// cypress.config.cjs
const { defineConfig } = require('cypress');

const baseUrl = 'http://localhost:5173'

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
    baseUrl: process.env.CYPRESS_BASE_URL || baseUrl,
  },
});