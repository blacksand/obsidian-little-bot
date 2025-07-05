import { GLOB_TS, GLOB_TSX } from '@antfu/eslint-config'
import nxPlugin from '@nx/eslint-plugin'
import type { ESLint, Linter } from 'eslint'

interface NxOptions {
  allowedGlobalImport?: string[]
}

export function nx({ allowedGlobalImport }: NxOptions = {}): Linter.Config[] {
  return [
    {
      name: 'peaks/nx/rules',
      files: [GLOB_TS, GLOB_TSX],
      plugins: {
        nx: nxPlugin as unknown as ESLint.Plugin,
      },
      rules: {
        'nx/enforce-module-boundaries': [
          'error',
          {
            allow: allowedGlobalImport ?? [],
            depConstraints: [
              {
                sourceTag: 'scope:app',
                onlyDependOnLibsWithTags: ['scope:shared', 'scope:desktop', 'scope:mobile'],
              },
              {
                sourceTag: 'scope:desktop',
                onlyDependOnLibsWithTags: ['scope:shared', 'scope:desktop'],
              },
              {
                sourceTag: 'scope:mobile',
                onlyDependOnLibsWithTags: ['scope:shared', 'scope:mobile'],
              },
              {
                sourceTag: 'scope:shared',
                onlyDependOnLibsWithTags: ['scope:shared'],
              },
              {
                sourceTag: 'type:app',
                onlyDependOnLibsWithTags: ['type:api', 'type:ui', 'type:util'],
              },
              {
                sourceTag: 'type:api',
                onlyDependOnLibsWithTags: ['type:api', 'type:util'],
              },
              {
                sourceTag: 'type:ui',
                onlyDependOnLibsWithTags: ['type:ui', 'type:util'],
              },
              {
                sourceTag: 'type:util',
                onlyDependOnLibsWithTags: ['type:util'],
              },
            ],
            enforceBuildableLibDependency: true,
          },
        ],
      },
    },
  ]
}
