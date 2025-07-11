import { Effect } from 'effect'
import type { BackendModule, MultiReadCallback, ReadCallback, Resource, Services } from 'i18next'
import { mergeDeep } from 'remeda'

import type { ObsidianApi } from '@peaks/core'
import { isObject } from '@peaks/utils'

export interface ObsidianI18nBackendOptions {
  addPath?: string // 相对于插件目录，默认为 'locals/{{lng}}/{{ns}}.missing.json'
  loadPath?: string // 相对于插件目录，默认为 'locals/{{lng}}/{{ns}}.json'
}

const defaultOptions = {
  addPath: 'locals/{{lng}}/{{ns}}.missing.json',
  loadPath: 'locals/{{lng}}/{{ns}}.json',
} satisfies ObsidianI18nBackendOptions

/* eslint-disable promise/prefer-await-to-then */

export class ObsidianI18nBackend implements BackendModule<ObsidianI18nBackendOptions> {
  readonly type = 'backend'

  // private logger: Logger

  private options: Required<ObsidianI18nBackendOptions>

  constructor(readonly obsidian: typeof ObsidianApi.Service) {
    this.options = { ...defaultOptions }

    // Effect.runSync(Effect.succeed(obsidian.getLittleBotPath()))
  }

  init(_: Services, backendOptions: ObsidianI18nBackendOptions): void {
    this.options = { ...defaultOptions, ...backendOptions }
  }

  read(language: string, namespace: string, callback: ReadCallback) {
    Effect.runSync(Effect.gen(this, function* () {
      const basePath = yield* this.obsidian.getLittleBotPath()

      const localePath = this.options.loadPath.replaceAll('{{lng}}', language).replaceAll('{{ns}}', namespace)
      const fullPath = `${basePath}/${localePath}`

      const data = yield* this.obsidian.adapterRead(fullPath)

      try {
        const json: unknown = JSON.parse(data)
        callback(null, isObject(json) ? json : null)
      }
      catch {
        // this.logger?.error(reason)
        callback(new Error(`Invalid file ${fullPath}`), null)
      }
    }).pipe(
      Effect.catchAll((reason: Error) => {
        callback(reason, null)
        return Effect.void
      }),
    ))
  }

  readMulti(languages: readonly string[], namespaces: readonly string[], callback: MultiReadCallback): void {
    const { loadPath } = this.options
    const promises = languages.flatMap((language) => namespaces.map((namespace) =>
      Effect.runPromise(Effect.gen(this, function* () {
        const basePath = yield* this.obsidian.getLittleBotPath()

        const localePath = loadPath.replaceAll('{{lng}}', language).replaceAll('{{ns}}', namespace)
        const fullPath = `${basePath}/${localePath}`

        const data = yield* this.obsidian.adapterRead(fullPath)
        const json: unknown = JSON.parse(data)

        return isObject(json) ? { [language]: { [namespace]: json } } : null
      })).catch(() => null),
    ))

    Promise.all(promises).then((resources) => {
      const result: Resource = resources.reduce<Resource>(
        (merged, resource) => resource ? mergeDeep(merged, resource) : merged,
        {},
      )
      callback(null, result)
    }).catch((reason: Error) => {
      callback(reason, null)
    })
  }

  // create(languages: readonly string[], namespace: string, key: string, fallbackValue: string): void {}

  // save(language: string, namespace: string, data: ResourceLanguage): void {}
}

/* eslint-enable promise/prefer-await-to-then */
