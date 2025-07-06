import { eslintConfig, getProjectRoot } from '@peaks/config-eslint'

export default eslintConfig({
  projectRoot: getProjectRoot(import.meta.url),
}).append({
  name: 'peaks/core/rules',
  // add project rules
})
