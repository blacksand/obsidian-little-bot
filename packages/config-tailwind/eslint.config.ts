import { eslintConfig, getProjectRoot } from '@peaks/config-eslint'

export default eslintConfig({
  type: 'lib',
  projectRoot: getProjectRoot(import.meta.url),

  formatters: {
    css: true,
  },
})
