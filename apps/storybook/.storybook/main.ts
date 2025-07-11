import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import type { StorybookConfig } from '@storybook/react-vite'
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
  typescript: {
    // Overrides the default Typescript configuration to allow multi-package components to be documented via Autodocs.
    check: false,
    reactDocgen: 'react-docgen',
  },

  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-themes',
    '@storybook/addon-vitest',
  ],

  viteFinal: async (viteConfig) => {
    const { default: tailwindcss } = await import('@tailwindcss/vite')

    return mergeConfig(viteConfig, {
      plugins: [tailwindcss(), react(), nxViteTsPaths()],
    })
  },
}

export default config
