const { defineConfig } = require("cypress");
// Populate process.env with values from .env file
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://localhost:3000",
    env: {
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
      googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      googleClientId: process.env.REACT_APP_GOOGLE_CLIENTID,
      googleClientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
    },
    // defaultCommandTimeout: 20000, // Set a default command timeout of 10 seconds for all commands
    // execTimeout: 20000, // Set a global assertion timeout of 20 seconds
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
