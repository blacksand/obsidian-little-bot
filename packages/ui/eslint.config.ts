import { eslintConfig, getProjectRoot, GLOB_TSX } from '@peaks/config-eslint'

export default eslintConfig({
  projectRoot: getProjectRoot(import.meta.url),
  react: true,
  tailwindcss: '@peaks/config-tailwind/little-bot.css',
}).append({
  name: 'peaks/ui/rules/disables-shadcn',
  files: [`src/lib/components/${GLOB_TSX}`],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      {
        allowConstantExport: true,
        allowExportNames: ['buttonVariants'],
      },
    ],
  },
})
