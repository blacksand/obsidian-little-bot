import { GLOB_MARKDOWN_CODE, GLOB_TS, GLOB_TSX } from '@antfu/eslint-config'
import type { Linter } from 'eslint'
import globals from 'globals'
import path from 'node:path'

interface TypescriptOptions {
  allowDefaultProject?: string[]
  tsconfigPath: string
}

export function typeAware(options: TypescriptOptions): Linter.Config[] {
  const { allowDefaultProject = ['./*.js', 'eslint.config.ts'], tsconfigPath } = options

  return [
    {
      name: 'peaks/typescript/rules-type-aware',
      files: [GLOB_TS, GLOB_TSX],
      ignores: [GLOB_MARKDOWN_CODE],
      languageOptions: {
        globals: {
          ...globals.node,
          ...globals.browser,
        },
        parserOptions: {
          projectService: {
            allowDefaultProject,
            defaultProject: path.basename(tsconfigPath),
          },
          tsconfigRootDir: path.dirname(tsconfigPath),
        },
      },
      rules: {
        'ts/consistent-type-exports': [
          'error',
          {
            fixMixedExportsWithInlineTypeSpecifier: true,
          },
        ],
        // 'ts/naming-convention': [
        //   'error',
        //   {
        //     selector: 'variable',
        //     format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        //   },
        //   {
        //     selector: 'function',
        //     format: ['camelCase', 'PascalCase'],
        //   },
        //   {
        //     selector: 'typeLike',
        //     format: ['PascalCase'],
        //   },
        // ],
        // 'ts/no-base-to-string': 'error',
        // 不能使用箭头函数简写语法
        // 'ts/no-confusing-void-expression': 'error',
        // 'ts/no-duplicate-type-constituents': 'error',
        // 'ts/no-meaningless-void-operator': 'error',
        // 'ts/no-redundant-type-constituents': 'error',
        // 'ts/no-unnecessary-boolean-literal-compare': 'error',
        // 'ts/no-unnecessary-condition': 'error',
        // 'ts/no-unnecessary-template-expression': 'error',
        // 'ts/no-unnecessary-type-arguments': 'error',
        // 'ts/no-unnecessary-type-parameters': 'error',
        // 'ts/no-unsafe-unary-minus': 'error',
        'ts/non-nullable-type-assertion-style': ['error'],
        // 'ts/only-throw-error': 'error',
        // 'ts/prefer-find': 'error',
        'ts/prefer-for-of': 'error',
        'ts/prefer-includes': 'error',
        'ts/prefer-nullish-coalescing': ['error', { ignorePrimitives: { string: true } }],
        'ts/prefer-optional-chain': 'error',
        'ts/prefer-promise-reject-errors': 'error',
        // 'ts/prefer-readonly': 'error',
        'ts/prefer-reduce-type-parameter': 'error',
        'ts/prefer-regexp-exec': 'error',
        // 'ts/prefer-string-starts-ends-with': 'error',
        // 会误报错误
        'ts/promise-function-async': 'off',

        'require-await': 'off',
        'ts/require-await': 'error',

        // 太严格了
        'ts/strict-boolean-expressions': [
          'off',
          {
            allowNullableBoolean: true,
            allowNullableEnum: true,
            allowNullableNumber: true,
            allowNullableObject: true,
            allowNullableString: true,
            allowNumber: true,
            allowString: true,
          },
        ],

        // 'ts/use-unknown-in-catch-callback-variable': 'error',
      },
    },
  ]
}
