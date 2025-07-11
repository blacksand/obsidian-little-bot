import { formatFiles, updateJson } from '@nx/devkit'
import type { Tree } from '@nx/devkit'
import { determineProjectNameAndRootOptions } from '@nx/devkit/src/generators/project-name-and-root-utils'
import { libraryGenerator } from '@nx/react'

import type { TsConfigJson } from '../../types/tsconfig-json'

type LibReactGeneratorSchema = Parameters<typeof libraryGenerator>[1]

interface NormalizedSchema extends LibReactGeneratorSchema {
  projectName: string
  projectRoot: string
}

export async function libReactGenerator(tree: Tree, schema: LibReactGeneratorSchema) {
  const options = await normalizeOptions(tree, schema)
  await libraryGenerator(tree, { ...options, skipFormat: true })

  updatePackageJson(tree, options)

  updateESLintConfig(tree, options)
  updateTsConfig(tree, options)
  updateVitestConfig(tree, options)

  if (!options.skipFormat) {
    await formatFiles(tree)
  }
}

export default libReactGenerator

async function normalizeOptions(
  tree: Tree,
  options: LibReactGeneratorSchema,
): Promise<NormalizedSchema> {
  const { importPath, projectName, projectRoot } = await determineProjectNameAndRootOptions(tree, {
    name: options.name,
    directory: options.directory,
    importPath: options.importPath,
    projectType: 'library',
  })

  return { ...options, importPath, projectName, projectRoot }
}

function updatePackageJson(tree: Tree, options: NormalizedSchema) {
  if (options.bundler !== 'none') {
    return
  }

  const packageJson = `${options.projectRoot}/package.json`
  if (!tree.exists(packageJson)) {
    tree.write(packageJson, '{}')
  }

  updateJson(tree, packageJson, ({ main, types, ...incomingJson }: Record<string, unknown>) => {
    Object.assign(incomingJson, {
      name: options.importPath,
      type: 'module',
      private: true,
      sideEffects: ['./src/**/*.css'],
      version: '0.0.1',

      exports: {
        '.': './src/index.ts',
        './package.json': './package.json',
      },

      dependencies: {},
      peerDependencies: {},
    })

    return incomingJson
  })
}

function updateTsConfig(tree: Tree, options: NormalizedSchema) {
  for (const file of [
    `${options.projectRoot}/tsconfig.lib.json`,
    `${options.projectRoot}/tsconfig.spec.json`,
  ]) {
    if (tree.exists(file)) {
      updateJson(tree, file, ({ compilerOptions, ...json }: TsConfigJson) => {
        return {
          ...json,
          compilerOptions: {
            ...compilerOptions,
            module: 'esnext',
            moduleResolution: 'bundler',
          },
        }
      })
    }
  }
}

function updateESLintConfig(tree: Tree, options: NormalizedSchema) {
  const eslintConfig = `${options.projectRoot}/eslint.config.mjs`

  if (tree.exists(eslintConfig)) {
    tree.delete(eslintConfig)
  }

  tree.write(
    `${options.projectRoot}/eslint.config.ts`,
    `
import { eslintConfig, getProjectRoot } from '@peaks/config-eslint'

const config = eslintConfig({
  react: true,
  projectRoot: getProjectRoot(import.meta.url),
}).append({
  name: 'peaks/${options.projectName}/rules',
})

export default config
`,
  )
}

const vitestConfigContent = `
import { testingConfig } from '@peaks/config-testing/browser'

const config = testingConfig(import.meta.url)

export default config
`

function updateVitestConfig(tree: Tree, options: NormalizedSchema) {
  const viteConfig = `${options.projectRoot}/vite.config.ts`
  const vitestConfig = `${options.projectRoot}/vitest.config.ts`

  if (tree.exists(viteConfig)) {
    tree.rename(viteConfig, vitestConfig)
    tree.write(vitestConfig, vitestConfigContent)
  }
}
