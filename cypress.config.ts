import { defineConfig } from 'cypress'
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import createBundler from '@bahmutov/cypress-esbuild-preprocessor'
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild'
import 'dotenv/config'

console.log('createBundler:', createBundler)

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
): Promise<Cypress.PluginConfigOptions> {
  await addCucumberPreprocessorPlugin(on, config)

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    }),
  )

  return config
}

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    specPattern: 'cypress/integration/**/*.{feature,features}',
    supportFile: 'cypress/support/index.{js,jsx,ts,tsx}',
    setupNodeEvents,
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
  viewportHeight: 614,
  viewportWidth: 360,
  defaultCommandTimeout: 6000,
  video: false,
})
