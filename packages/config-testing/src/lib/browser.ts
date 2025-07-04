import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export { mergeConfig } from 'vitest/config'

const currentPath = path.dirname(fileURLToPath(import.meta.url))
export const workspaceRoot = path.resolve(currentPath, '../../../..')

/**
 * vitest config with browser support
 */
export function testingConfig(configFileUrl: string) {
  const projectRoot = path.dirname(fileURLToPath(configFileUrl))
  const relativePath = path.relative(workspaceRoot, projectRoot)

  return defineConfig({
    cacheDir: path.join(workspaceRoot, 'tmp', 'vite', relativePath),
    root: projectRoot,

    plugins: [
      react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
    ],

    test: {
      coverage: {
        provider: 'v8',
        reportsDirectory: path.join(workspaceRoot, 'coverage', relativePath),
      },
      environment: 'jsdom',
      globals: true,
      passWithNoTests: true,
      restoreMocks: true,
      root: projectRoot,
      watch: false,

      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      reporters: ['default'],
      server: { deps: { inline: ['@peaks/**'] } },
    },
  })
}
