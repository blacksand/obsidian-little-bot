import { eslintConfig, getProjectRoot } from './src/index.js'

const config = eslintConfig({
  type: 'lib',
  projectRoot: getProjectRoot(import.meta.url),
})

export default config
