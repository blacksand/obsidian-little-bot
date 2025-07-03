import { eslintConfig, getProjectRoot } from '@peaks/config-eslint'

export default eslintConfig({
  type: 'app',
  projectRoot: getProjectRoot(import.meta.url),
})
