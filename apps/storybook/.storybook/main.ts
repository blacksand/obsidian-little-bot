import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import type { StorybookConfig } from '@storybook/react-vite'
import tailwind from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'

const uiPackageJson = import.meta.resolve('@peaks/ui/package.json')
const uiLibrary = path.dirname(fileURLToPath(uiPackageJson))

const config: StorybookConfig = {
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: [
    `${uiLibrary}/src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))`,
    // '../src/lib/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
  ],

  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-themes',
  ],

  viteFinal: async (viteConfig) =>
    mergeConfig(viteConfig, {
      plugins: [
        tailwind(),
        react(),
        nxViteTsPaths(),
      ],
    }),

}

export default config
