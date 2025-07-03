import type { Awaitable, TypedFlatConfigItem } from '@antfu/eslint-config'
import antfu, { GLOB_TS, GLOB_TSX } from '@antfu/eslint-config'
import type { Linter } from 'eslint'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { imports } from './rules/imports.js'
import { node } from './rules/node.js'
import { nx } from './rules/nx.js'
import { perfectionist } from './rules/perfectionist.js'
import { promise } from './rules/promise.js'
import { react } from './rules/react.js'
import { stylistic } from './rules/stylistic.js'
import { tailwind } from './rules/tailwind.js'
import { typeAware } from './rules/type-aware.js'
import { typescript } from './rules/typescript.js'
import { unicorn } from './rules/unicorn.js'
import type { Options } from './types.js'
import { getTsconfigPath } from './utils/get-tsconfig-path.js'

type UserConfig = Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | Linter.Config[]>

const workspacePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..')

export function eslintConfig(
  {
    a11y: enableA11y = false,
    allowDefaultProject,
    appPath = 'apps/web',
    projectRoot,
    tailwindcss: enableTailwind = false,
    ...options
  }: Options = {},
  ...userConfigs: UserConfig[]
) {
  const enableReact = !!options.react
  const enableJsx = options.jsx ?? enableReact

  const tsconfigPath =
    typeof options.typescript === 'object' && 'tsconfigPath' in options.typescript
      ? options.typescript.tsconfigPath
      : getTsconfigPath(projectRoot)

  const config = antfu(
    {
      ...options,
      type: options.type ?? 'lib',
      jsx: enableJsx,
      pnpm: options.pnpm ?? true,
      react: options.react ?? enableReact,
      stylistic: options.stylistic ?? {
        indent: 2,
        jsx: enableJsx,
        quotes: 'single',
        semi: false,
      },
      typescript:
        options.typescript === false
          ? false
          : {
              tsconfigPath,
              ...(typeof options.typescript === 'object' ? options.typescript : {}),
            },
    },
    ...userConfigs,
  )
    .prepend(nx())
    .insertAfter('antfu/node/rules', node())
    .insertAfter('peaks/node/rules', promise())
    .insertAfter('antfu/imports/rules', imports({ projectRoot, workspacePath }))
    .insertAfter('antfu/unicorn/rules', unicorn())
    .insertAfter('antfu/perfectionist/setup', perfectionist({ globInternal: '^@peaks/.+' }))
    .insertAfter('antfu/stylistic/rules', stylistic())
    .insertAfter('antfu/typescript/rules', typescript())

  if (tsconfigPath) {
    void config.insertAfter(
      'antfu/typescript/rules-type-aware',
      typeAware({ allowDefaultProject, tsconfigPath }),
    )
  }

  if (enableReact) {
    void config.insertAfter(
      'antfu/react/rules',
      react({ a11y: enableA11y, typeAware: !!tsconfigPath }),
      // reactQuery(),
    )
  }

  if (enableTailwind) {
    const entryPoint =
      typeof enableTailwind === 'string'
        ? enableTailwind
        : '@peaks/config-tailwind/web.css'
    void config.insertBefore('antfu/jsonc/setup', tailwind({ entryPoint }))
  }

  if (options.unocss) {
    void config.override('antfu/unocss', {
      files: [GLOB_TS, GLOB_TSX],
      settings: {
        unocss: {
          configPath: path.resolve(workspacePath, `${appPath}/uno.config.mjs`),
        },
      },
    })
  }

  return config
}
