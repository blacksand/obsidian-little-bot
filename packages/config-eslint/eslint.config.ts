import { eslintConfig, getProjectRoot } from './src/index.js'

export default eslintConfig({
  type: 'lib',
  projectRoot: getProjectRoot(import.meta.url),
})
