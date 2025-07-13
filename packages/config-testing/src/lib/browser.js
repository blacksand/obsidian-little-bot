import preact from '@preact/preset-vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export { mergeConfig } from 'vitest/config'

const currentPath = path.dirname(fileURLToPath(import.meta.url))
export const workspaceRoot = path.resolve(currentPath, '../../../..')

/**
 * Configures a testing environment based on the provided configuration file URL.
 *
 * @param {string} configFileUrl - The file URL of the configuration file to set up the testing environment.
 * @return {import('vitest/config').UserConfig} The configuration object generated for the testing environment.
 */
export function testingConfig(configFileUrl) {
  const projectRoot = path.dirname(fileURLToPath(configFileUrl))
  const relativePath = path.relative(workspaceRoot, projectRoot)

  return defineConfig({
    cacheDir: path.join(projectRoot, 'out-tsc', 'vitest'),
    root: projectRoot,

    plugins: [
      preact({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
    ],

    test: {
      browser: {
        enabled: true,
        headless: true,
        instances: [{ browser: 'chromium' }],
        provider: 'playwright',
      },
      coverage: {
        provider: 'v8',
        reportsDirectory: path.join(workspaceRoot, 'coverage', relativePath),
      },
      globals: true,
      passWithNoTests: true,
      restoreMocks: true,
      root: projectRoot,
      // watch: false,

      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      reporters: ['default'],
      server: { deps: { inline: ['@peaks/**'] } },
    },
  })
}
