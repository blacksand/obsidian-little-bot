import { eslintConfig, getProjectRoot } from '@peaks/config-eslint'

export default eslintConfig({
  projectRoot: getProjectRoot(import.meta.url),
}).append({
  name: 'peaks/i18n/rules',
  // add project rules
})
