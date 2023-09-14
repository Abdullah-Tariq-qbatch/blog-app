const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://blog-app-gamma-swart.vercel.app',
    setupNodeEvents(on, config) {
    },
  },
});
