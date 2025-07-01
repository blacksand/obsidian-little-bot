import { GLOB_JSX, GLOB_MARKDOWN_CODE, GLOB_SRC, GLOB_TSX } from '@antfu/eslint-config'
import type { Linter } from 'eslint'

export function perfectionist({ globInternal = '@/**' }: {
  globInternal?: string
}): Linter.Config[] {
  return [
    {
      name: 'peaks/perfectionist/rules',
      files: [GLOB_SRC],
      ignores: [GLOB_MARKDOWN_CODE],
      rules: {
        'import/order': 'off',
        'perfectionist/sort-imports': [
          'warn',
          {
            type: 'alphabetical',
            groups: [
              'instructions',
              ['type', 'builtin', 'external'],
              ['internal-type', 'internal'],
              ['parent-type', 'parent', 'sibling-type', 'sibling', 'index'],
              'object',
              'unknown',
            ],
            internalPattern: [globInternal],
            newlinesBetween: 'always',

            customGroups: {
              value: {
                instructions: ['^client-only$', '^server-only$'],
              },
            },
          },
        ],
        'perfectionist/sort-interfaces': [
          'warn',
          {
            type: 'alphabetical',
            groups: ['identify', 'names', 'labels', 'unknown', 'callback'],
            order: 'asc',
            partitionByNewLine: true,

            customGroups: {
              labels: ['label', 'labels'],
              callback: ['^on.+'],
              identify: ['id?(s)', 'slug', 'selector'],
              names: ['username', 'code', 'type', 'name', 'title'],
            },
          },
        ],
        'perfectionist/sort-named-exports': [
          'warn',
        ],
        'perfectionist/sort-named-imports': [
          'warn',
          {
            type: 'alphabetical',
            groupKind: 'mixed',
            ignoreAlias: false,
            order: 'asc',
          },
        ],
        'perfectionist/sort-object-types': [
          'warn',
          {
            type: 'alphabetical',
            groups: ['identify', 'names', 'labels', 'unknown', 'callback'],
            order: 'asc',
            partitionByNewLine: true,

            customGroups: [
              {
                selector: 'property',
                elementNamePattern: '^(?:name|type|username|filename|title|queryFn)$',
                groupName: 'names',
              },
              {
                selector: 'property',
                elementNamePattern: '^(?:label|labels)$',
                groupName: 'labels',
              },
              {
                selector: 'property',
                elementNamePattern: '^on.+',
                groupName: 'callback',
              },
              {
                selector: 'property',
                elementNamePattern: '^(?:ids?|slug|code|selector|queryKey)$',
                groupName: 'identify',
              },
            ],
          },
        ],
        'perfectionist/sort-objects': [
          'warn',
          {
            type: 'unsorted', // Don't sort objects passed to createSlice
            useConfigurationIf: {
              callingFunctionNamePattern: '^createSlice$',
            },
          },
          {
            type: 'alphabetical',
            groups: ['identify', 'names', 'labels', 'unknown', 'callback'],
            ignorePattern: ['transform'],
            order: 'asc',
            partitionByComment: String.raw`^\s*[\d+-]+.*`,
            partitionByNewLine: true,

            customGroups: [
              {
                selector: 'property',
                elementNamePattern: '^(?:name|type|username|filename|title|queryFn)$',
                groupName: 'names',
              },
              {
                selector: 'property',
                elementNamePattern: '^(?:label|labels)$',
                groupName: 'labels',
              },
              {
                selector: 'property',
                elementNamePattern: '^on[A-Z]*',
                groupName: 'callback',
              },
              {
                selector: 'property',
                elementNamePattern: '^(?:ids?|slug|code|selector|queryKey)$',
                groupName: 'identify',
              },
            ],
          },
        ],
        'sort-imports': 'off',
      },
    },
    {
      name: 'peaks/perfectionist/sort-jsx-props',
      files: [GLOB_JSX, GLOB_TSX],
      ignores: [GLOB_MARKDOWN_CODE],
      rules: {
        'perfectionist/sort-jsx-props': [
          'warn',
          {
            type: 'alphabetical',
            groups: ['builtin', 'identify', 'names', 'unknown', 'callback'],
            order: 'asc',

            customGroups: {
              builtin: ['^key$', '^ref$'],
              callback: '^on.+',
              identify: ['^id$', '^src$'],
              names: ['^className$', '^class$', '^name$', '^title$'],
            },
          },
        ],
      },
    },
  ]
}
