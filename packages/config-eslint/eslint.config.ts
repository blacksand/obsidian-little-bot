import { eslintConfig, getProjectRoot } from './src'

export default eslintConfig({
  type: 'lib',
  projectRoot: getProjectRoot(import.meta.url),
})
