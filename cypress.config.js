const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'ct7f96',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    testIsolation: false
  },
});
