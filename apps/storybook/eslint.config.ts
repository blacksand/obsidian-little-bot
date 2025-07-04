import { eslintConfig, getProjectRoot } from '@peaks/config-eslint'

export default eslintConfig({
  type: 'app',
  tailwindcss: `${getProjectRoot(import.meta.url)}/src/styles/global.css`,
})
