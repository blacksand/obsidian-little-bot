import type { Linter } from 'eslint'

export function stylistic(): Linter.Config[] {
  return [
    {
      name: 'peaks/stylistic/rules',
      rules: {
        'style/arrow-parens': ['warn', 'always'],
        'style/jsx-self-closing-comp': 'warn',
        'style/multiline-ternary': 'off',
        'style/newline-per-chained-call': ['warn', { ignoreChainWithDepth: 3 }],
        // 'no-confusing-arrow': 'warn',
        // 'no-extra-parens': ['functions'],
        'style/no-extra-semi': 'warn',
        'style/object-curly-newline': ['warn', { consistent: true, multiline: true }],
        'style/object-property-newline': ['warn', { allowAllPropertiesOnSameLine: true }],
        'style/operator-linebreak': [
          'warn',
          'after',
          {
            overrides: {
              ':': 'before',
              '?': 'before',
              '|>': 'before',
            },
          },
        ],
        'style/padding-line-between-statements': [
          'warn',
          {
            blankLine: 'always',
            next: ['enum', 'interface', 'function'],
            prev: '*',
          },
          {
            blankLine: 'never',
            next: 'function',
            prev: 'function-overload',
          },
        ],
        // 'spaced-comment': ['always', { exceptions: ['#_'] }],
        'style/switch-colon-spacing': 'warn',
      },
    },
  ]
}
