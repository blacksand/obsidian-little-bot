import type { BackendModule, MultiReadCallback, ReadCallback, Resource, Services } from 'i18next'
import { mergeDeep } from 'remeda'

import type { ObsidianApi } from '@peaks/core'
import { isObject } from '@peaks/utils'
import type { Logger } from '@peaks/utils/logging'

export interface ObsidianI18nBackendOptions {
  addPath?: string // 相对于插件目录，默认为 'locals/{{lng}}/{{ns}}.missing.json'
  loadPath?: string // 相对于插件目录，默认为 'locals/{{lng}}/{{ns}}.json'
}

const defaultOptions = {
  addPath: 'locals/{{lng}}/{{ns}}.missing.json',
  loadPath: 'locals/{{lng}}/{{ns}}.json',
} satisfies ObsidianI18nBackendOptions

export class ObsidianI18nBackend implements BackendModule<ObsidianI18nBackendOptions> {
  readonly type = 'backend'

  private readonly basePath: string
  private options: Required<ObsidianI18nBackendOptions>

  constructor(readonly obsidian: ObsidianApi, readonly logger?: Logger) {
    this.options = { ...defaultOptions }
    this.basePath = obsidian.getLittleBotPath()
  }

  init(_: Services, backendOptions: ObsidianI18nBackendOptions): void {
    this.options = { ...defaultOptions, ...backendOptions }
  }

  // eslint-disable-next-line ts/no-misused-promises
  async read(language: string, namespace: string, callback: ReadCallback) {
    if (!this.basePath) {
      return callback(new Error('Base path is required'), null)
    }

    const { loadPath } = this.options
    const localePath = loadPath.replaceAll('{{lng}}', language).replaceAll('{{ns}}', namespace)
    const fullPath = `${this.basePath}/${localePath}`

    try {
      const data = await this.obsidian.adapterRead(fullPath)
      const json: unknown = JSON.parse(data)
      callback(null, isObject(json) ? json : null)
    }
    catch (reason) {
      this.logger?.error(reason)
      callback(new Error(`Failed to parse ${fullPath}`), null)
    }
  }

  readMulti(languages: readonly string[], namespaces: readonly string[], callback: MultiReadCallback): void {
    if (!this.basePath) {
      return callback(new Error('Base path is required'), null)
    }

    const { loadPath } = this.options
    const promises = languages.flatMap((language) =>
      namespaces.map(async (namespace) => {
        const localePath = loadPath.replaceAll('{{lng}}', language).replaceAll('{{ns}}', namespace)
        const fullPath = `${this.basePath}/${localePath}`

        try {
          const data = await this.obsidian.adapterRead(fullPath)
          const json: unknown = JSON.parse(data)

          return isObject(json) ? { [language]: { [namespace]: json } } : null
        }
        catch (reason) {
          this.logger?.error(`Failed to parse ${fullPath}`, reason)
          return null
        }
      }),
    )

    Promise.all(promises)
      // eslint-disable-next-line promise/prefer-await-to-then
      .then((resources) => {
        const result: Resource = resources.reduce<Resource>(
          (merged, resource) => resource ? mergeDeep(merged, resource) : merged,
          {},
        )

        callback(null, result)
      })
      // eslint-disable-next-line promise/prefer-await-to-then
      .catch((reason: Error) => {
        callback(reason, null)
      })
  }

  // create(languages: readonly string[], namespace: string, key: string, fallbackValue: string): void {}

  // save(language: string, namespace: string, data: ResourceLanguage): void {}
}
