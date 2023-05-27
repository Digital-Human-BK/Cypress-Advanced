import { defineConfig } from "cypress";

export default defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    baseUrl: "http://localhost:4200",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    // delete next line to show the default example test files
    excludeSpecPattern: ["**/1-getting-started/*", "**/2-advanced-examples/*"],
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
