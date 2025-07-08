import { GLOB_MARKDOWN_CODE, GLOB_SRC_EXT, GLOB_TS, GLOB_TSX } from '@antfu/eslint-config'
import type { Linter } from 'eslint'

export function typescript(): Linter.Config[] {
  return [
    {
      name: 'peaks/typescript/rules',
      files: [GLOB_TS, GLOB_TSX],
      rules: {
        'ts/adjacent-overload-signatures': 'error',
        'ts/array-type': ['error', { default: 'array-simple' }],
        'ts/consistent-generic-constructors': 'error',
        'ts/consistent-indexed-object-style': 'error',
        'ts/consistent-type-assertions': 'error',
        'ts/explicit-function-return-type': [
          'error',
          {
            allowExpressions: true,
            allowFunctionsWithoutTypeParameters: true,
            allowHigherOrderFunctions: true,
            allowIIFEs: true,
            allowTypedFunctionExpressions: true,
          },
        ],
        'ts/no-confusing-non-null-assertion': 'error',
        'ts/no-explicit-any': 'error',
        'ts/no-inferrable-types': 'error',
        'ts/no-magic-numbers': [
          'error',
          {
            ignore: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 24, 30, 50, 60, 90, 100, 500, 1000],
            ignoreArrayIndexes: true,
            ignoreDefaultValues: true,
            ignoreEnums: true,
            ignoreNumericLiteralTypes: true,
            ignoreReadonlyClassProperties: true,
            ignoreTypeIndexes: true,
          },
        ],
        'ts/no-shadow': 'error',
        'ts/no-unused-vars': [
          'error',
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            ignoreRestSiblings: true,
            varsIgnorePattern: '^_',
          },
        ],
        'ts/prefer-function-type': 'error',
        'ts/unified-signatures': 'error',

        // 关闭重复规则
        'no-shadow': 'off',
        'unused-imports/no-unused-vars': 'off',
      },
    },
    {
      name: 'peaks/typescript/disables/test',
      files: ['**/*.{spec,test}.ts?(x)', GLOB_MARKDOWN_CODE],
      rules: {
        'eslint-comments/no-unlimited-disable': 'off',
        // 'import/no-extraneous-dependencies': 'off',
        // 'import/no-unassigned-import': 'off',
        'ts/no-explicit-any': 'off',
        'ts/no-magic-numbers': 'off',
        'ts/no-unused-vars': 'off',
      },
    },
    {
      name: 'peaks/typescript/disables/tsx',
      files: [`**/*.${GLOB_TSX}`],
      rules: {
        'ts/explicit-function-return-type': 'off',
      },
    },
    {
      name: 'peaks/typescript/disables/dts',
      files: ['**/*.d.?({c,m})ts?(x)'],
      rules: {
        'ts/no-explicit-any': 'off',
        'ts/no-unused-vars': 'off',
      },
    },
    {
      name: 'peaks/nx/disables/jest-config',
      files: ['jest.config.ts', '**/jest.config.ts'],
      rules: {
        'eslint-comments/no-unlimited-disable': 'off',
      },
    },
    {
      name: 'peaks/typescript/disables/generated-files',
      files: [`**/*.generated.${GLOB_SRC_EXT}`],
      rules: {
        'antfu/top-level-function': 'off',
        'eslint-comments/no-unlimited-disable': 'off',

        'perfectionist/sort-imports': 'off',
        'perfectionist/sort-interfaces': 'off',
        'perfectionist/sort-jsx-props': 'off',
        'perfectionist/sort-named-imports': 'off',
        'perfectionist/sort-object-types': 'off',
        'perfectionist/sort-objects': 'off',

        'ts/ban-tslint-comment': 'off',
        'ts/explicit-function-return-type': 'off',
        'ts/naming-convention': 'off',
        'ts/no-unsafe-argument': 'off',
        'ts/no-unsafe-assignment': 'off',
        'ts/no-unsafe-member-access': 'off',
        'ts/no-unsafe-return': 'off',
        'ts/prefer-nullish-coalescing': 'off',

        'unicorn/no-abusive-eslint-disable': 'off',
        'unicorn/prevent-abbreviations': 'off',
      },
    },
  ]
}
