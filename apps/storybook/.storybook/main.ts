import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import type { StorybookConfig } from '@storybook/react-vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { mergeConfig } from 'vite'

// const uiPackageJson = import.meta.resolve('@peaks/ui/package.json')
// const uiLibrary = path.dirname(fileURLToPath(uiPackageJson))

const config: StorybookConfig = {
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: [
    // `${uiLibrary}/src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))`,
    '../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
  ],

  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-themes',
    '@storybook/addon-vitest',
  ],

  viteFinal: async (viteConfig) =>
    mergeConfig(viteConfig, {
      plugins: [
        tailwindcss(),
        react(),
        nxViteTsPaths(),
      ],
    }),

}

export default config
