const { defineConfig } = require("cypress");
// Populate process.env with values from .env file
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://blog-app-gamma-swart.vercel.app",
    env: {
      googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      googleClientId: process.env.REACT_APP_GOOGLE_CLIENTID,
      googleClientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
      googleEmail: process.env.GOOGLE_EMAIL,
      googlePassword: process.env.GOOGLE_PASSWORD,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
