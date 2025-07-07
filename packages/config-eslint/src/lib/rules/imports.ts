import { GLOB_MARKDOWN_CODE, GLOB_SRC, GLOB_SRC_EXT } from '@antfu/eslint-config'
import type { Linter } from 'eslint'

export function imports(
  _: // { projectRoot, workspacePath }:
  { projectRoot?: string, workspacePath?: string } = {},
): Linter.Config[] {
  return [
    {
      name: 'peaks/imports/rules',
      files: [GLOB_SRC],
      ignores: [GLOB_MARKDOWN_CODE, `**/vitest-setup.${GLOB_SRC_EXT}`],
      rules: {
        'import/no-duplicates': ['warn'],
        // 上游配置已移除此规则
        // 'import/no-extraneous-dependencies': [
        //   'error',
        //   {
        //     includeTypes: true,
        //     packageDir: [projectRoot ?? './', workspacePath],
        //   },
        // ],
        // 'import/no-unassigned-import': [
        //   'error',
        //   {
        //     allow: ['client-only', 'server-only', '**/*.css', '**/*.scss', '**/*.sass', '**/*.less', '**/css'],
        //   },
        // ],
        // 'import/no-useless-path-segments': 'error',
      },
    },
  ]
}
