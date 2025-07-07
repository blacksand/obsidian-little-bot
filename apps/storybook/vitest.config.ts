import storybookTest from '@storybook/addon-vitest/vitest-plugin'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

import { mergeConfig, testingConfig } from '@peaks/config-testing/browser'

const projectRoot = path.dirname(fileURLToPath(import.meta.url))

const { test: { include, ...baseTest } = {}, ...baseConfig } = testingConfig(import.meta.url)

export default mergeConfig(
  { ...baseConfig, test: baseTest },
  defineConfig({
    plugins: [
      storybookTest({
        configDir: path.join(projectRoot, '.storybook'),
        storybookScript: 'pnpm exec storybook --ci',
      }),
    ],
    test: {
      name: 'storybook',
      setupFiles: ['./.storybook/vitest.setup.ts'],
    },
  }),
)
