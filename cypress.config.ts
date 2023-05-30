import { defineConfig } from "cypress";

export default defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: false,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  env: {
    email: "artem.bondar16@gmail.com",
    password: "CypressTest1",
    apiUrl: "https://api.realworld.io",
  },
  e2e: {
    baseUrl: "http://localhost:4200",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
