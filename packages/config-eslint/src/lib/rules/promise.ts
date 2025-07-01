import { GLOB_SRC } from '@antfu/eslint-config'
import type { Linter } from 'eslint'
import promisePlugin from 'eslint-plugin-promise'

export function promise(): Linter.Config[] {
  return [
    {
      name: 'peaks/promise/rules',
      files: [GLOB_SRC],
      plugins: {
        // eslint-disable-next-line ts/no-unsafe-assignment
        promise: promisePlugin,
      },
      rules: {
        'promise/catch-or-return': 'error',
        'promise/no-new-statics': 'error',
        'promise/no-return-in-finally': 'error',
        'promise/no-return-wrap': [
          'error',
          {
            allowReject: true,
          },
        ],
        'promise/param-names': 'error',
        'promise/prefer-await-to-then': 'error',
        'promise/valid-params': 'error',
      },
    },
  ]
}
