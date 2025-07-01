import { eslintConfig } from '@peaks/config-eslint'

const config = eslintConfig(
  {
    type: 'app',
    ignores: ['apps/**', 'packages/**', 'tools/**', '.cursor/templates/**'],

    formatters: {
      css: true,
      html: true,
      markdown: 'prettier',
    },
  },
  {
    name: 'peaks/pnpm/rules/disable/root-package-json',
    files: ['package.json'],
    rules: {
      'pnpm/json-enforce-catalog': 'off',
    },
  },
)

export default config
