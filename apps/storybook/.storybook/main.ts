import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import preact from '@preact/preset-vite'
import type { StorybookConfig } from '@storybook/preact-vite'
import { mergeConfig } from 'vite'

// const uiPackageJson = import.meta.resolve('@peaks/ui/package.json')
// const uiLibrary = path.dirname(fileURLToPath(uiPackageJson))

const config: StorybookConfig = {
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: '@storybook/preact-vite',
    options: {},
  },
  stories: [
    // `${uiLibrary}/src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))`,
    '../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
  ],
  typescript: {
    check: false,
    // @ts-expect-error docgen
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
      plugins: [
        tailwindcss(),
        preact(),
        nxViteTsPaths(),
      ],
    })
  },
}

export default config
