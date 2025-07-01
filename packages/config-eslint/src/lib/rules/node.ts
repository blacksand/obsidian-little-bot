import type { Linter } from 'eslint'

export function node(): Linter.Config[] {
  return [
    {
      name: 'peaks/node/rules',
      rules: {
        'node/prefer-global/buffer': ['error', 'always'],
        'node/prefer-global/process': ['error', 'always'],
        'node/prefer-node-protocol': 'error',
      },
    },
  ]
}
