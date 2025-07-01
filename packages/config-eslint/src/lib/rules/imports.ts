import type { Linter } from 'eslint'

export function imports({
  projectRoot: _projectRoot,
  workspacePath: _workspacePath,
}: {
  projectRoot?: string
  workspacePath?: string
} = {}): Linter.Config[] {
  return [
    // 上游配置已移除此规则
    // {
    //   name: 'peaks/imports/rules',
    //   files: [GLOB_SRC],
    //   ignores: [GLOB_MARKDOWN_CODE, `**/vitest-setup.${GLOB_SRC_EXT}`],
    //   rules: {
    //     'import/no-extraneous-dependencies': [
    //       'error',
    //       {
    //         includeTypes: true,
    //         packageDir: [projectRoot ?? './', workspacePath],
    //       },
    //     ],
    //     'import/no-unassigned-import': [
    //       'error',
    //       {
    //         allow: [
    //           'client-only',
    //           'server-only',
    //           '**/*.css',
    //           '**/*.scss',
    //           '**/*.sass',
    //           '**/*.less',
    //           '**/css',
    //         ],
    //       },
    //     ],
    //     'import/no-useless-path-segments': 'error',
    //   },
    // },
  ]
}
