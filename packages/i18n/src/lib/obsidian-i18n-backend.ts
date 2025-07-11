import { Effect } from 'effect'
import type { BackendModule, MultiReadCallback, ReadCallback, Resource, ResourceLanguage, Services } from 'i18next'
import { mergeDeep } from 'remeda'

import type { ObsidianApi } from '@peaks/core'
import { isObject } from '@peaks/utils'
import type { Undefinable } from '@peaks/utils'

export interface ObsidianI18nBackendOptions {
  addPath?: string // 相对于插件目录，默认为 'locales/{{lng}}/{{ns}}.missing.json'
  loadPath?: string // 相对于插件目录，默认为 'locales/{{lng}}/{{ns}}.json'
}

const defaultOptions = {
  addPath: 'locales/{{lng}}/{{ns}}.missing.json',
  loadPath: 'locales/{{lng}}/{{ns}}.json',
} satisfies ObsidianI18nBackendOptions

/* eslint-disable promise/prefer-await-to-then */

export class ObsidianI18nBackend implements BackendModule<ObsidianI18nBackendOptions> {
  readonly type = 'backend'

  // private logger: Logger

  private options: Required<ObsidianI18nBackendOptions>

  constructor(readonly obsidian: typeof ObsidianApi.Service) {
    this.options = { ...defaultOptions }
  }

  init(_: Services, backendOptions: ObsidianI18nBackendOptions): void {
    this.options = { ...defaultOptions, ...backendOptions }
  }

  read(language: string, namespace: string, callback: ReadCallback) {
    this.loadJsonFile(language, namespace).then((json) => {
      callback(null, json)
    }).catch((reason: unknown) => {
      const error = reason instanceof Error ? reason : new Error(String(reason))
      callback(error, null)
    })
  }

  readMulti(languages: readonly string[], namespaces: readonly string[], callback: MultiReadCallback): void {
    const promises = languages.flatMap((language) => namespaces.map(async (namespace) => {
      const json = await this.loadJsonFile(language, namespace).catch(() => undefined)
      return isObject(json) ? { [language]: { [namespace]: json } } : null
    }))

    Promise
      .all(promises)
      .then((resources) => {
        const result: Resource = resources.reduce<Resource>(
          (merged, resource) => resource ? mergeDeep(merged, resource) : merged,
          {},
        )

        callback(null, result)
      })
      .catch((reason: Error) => {
        callback(reason, null)
      })
  }

  // create(languages: readonly string[], namespace: string, key: string, fallbackValue: string): void {}

  // save(language: string, namespace: string, data: ResourceLanguage): void {}

  private normalizePath(language: string, namespace: string): Effect.Effect<string> {
    return Effect.succeed(this.options.loadPath).pipe(
      Effect.map((loadPath) => loadPath.replaceAll('{{lng}}', language).replaceAll('{{ns}}', namespace)),
      Effect.zip(this.obsidian.getLittleBotPath()),
      Effect.flatMap(([loadPath, basePath]) => this.obsidian.normalizePath(`${basePath}/${loadPath}`)),
    )
  }

  private async loadJsonFile(language: string, namespace: string): Promise<Undefinable<ResourceLanguage>> {
    const runnable = this.normalizePath(language, namespace).pipe(
      Effect.flatMap((filePath) => this.obsidian.adapterRead(filePath)),
      Effect.map((content) => JSON.parse(content) as unknown),
      Effect.flatMap((json) => Effect.if(isObject(json), {
        onFalse: () => Effect.succeed({}),
        onTrue: () => Effect.succeed(json as ResourceLanguage),
      })),
    )

    return Effect.runPromise(runnable)
  }
}

/* eslint-enable promise/prefer-await-to-then */
