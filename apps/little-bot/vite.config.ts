import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import preact from '@preact/preset-vite'
import { builtinModules } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'

// eslint-disable-next-line unicorn/prefer-module
const projectRoot = __dirname ?? path.dirname(fileURLToPath(import.meta.url))

const external = [
  'obsidian',
  'electron',
  '@codemirror/autocomplete',
  '@codemirror/collab',
  '@codemirror/commands',
  '@codemirror/language',
  '@codemirror/lint',
  '@codemirror/search',
  '@codemirror/state',
  '@codemirror/view',
  '@lezer/common',
  '@lezer/highlight',
  '@lezer/lr',
  'moment',
  ...builtinModules,
]

export default defineConfig(async ({ command, mode }) => {
  const isDevelopment = command === 'serve' || mode === 'development'
  const { default: tailwindcss } = await import('@tailwindcss/vite')

  return ({
    cacheDir: '../../node_modules/.vite/apps/little-bot',
    publicDir: './src/assets',
    root: projectRoot,

    optimizeDeps: {
      entries: ['./src/main.ts'],
    },

    build: {
      copyPublicDir: true,
      emptyOutDir: false,
      outDir: '../../dist/obsidian-little-bot',
      target: 'es2018',

      // modulePreload: { polyfill: true },

      commonjsOptions: {
        transformMixedEsModules: true,
      },

      cssCodeSplit: false,
      // cssMinify: 'lightningcss',
      minify: !isDevelopment,
      reportCompressedSize: false,
      sourcemap: isDevelopment ? 'inline' : false,

      lib: {
        name: 'obsidian-little-bot',
        cssFileName: 'styles',
        entry: 'src/main.ts',
        fileName: () => 'main.js',
        formats: ['cjs'],
      },

      rollupOptions: {
        external,
        output: {
          globals: {
            moment: 'moment',
          },
        },
      },
    },
    plugins: [
      preact(),
      tailwindcss(),
      nxViteTsPaths(),
      nxCopyAssetsPlugin([
        {
          glob: '**/*.json',
          input: '../../packages/i18n/src/locales',
          output: 'locales',
        },
      ]),
    ],
  } satisfies UserConfig)
})
