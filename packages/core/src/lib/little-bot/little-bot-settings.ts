import type { Plugin } from 'obsidian'
import { mergeDeep } from 'remeda'
import type { DeepReadonly } from 'ts-essentials'

import { version } from '@peaks/core/package.json'
import { isObject } from '@peaks/utils'
import type { Logger } from '@peaks/utils/logging'
import { getLogger } from '@peaks/utils/logging'

import type { SanitizedSettings } from './types'

const defaultSettings = {
  locale: 'en',
  version,
}

export class LittleBotSettings {
  private logger: Logger
  private resolved = false
  private sanitizedSettings = defaultSettings

  constructor(readonly plugin: Plugin) {
    this.logger = getLogger({ name: '⚙️', scope: 'core' })
  }

  async load(force = false): Promise<DeepReadonly<SanitizedSettings>> {
    if (!this.resolved || force) {
      let settings: unknown

      try {
        this.logger.trace('Loading settings')
        settings = await this.plugin.loadData()
      }
      catch (reason) {
        this.logger.error('Failed to load settings', reason)
      }

      this.resolved = true
      this.sanitizedSettings = this.sanitize(settings)
    }

    return this.sanitizedSettings
  }

  async save() {
    if (!this.resolved) {
      throw new Error('Settings is not loaded')
    }

    await this.plugin.saveData(this.sanitizedSettings)
    this.logger.trace('Settings saved', this.sanitizedSettings)
  }

  private sanitize(input: unknown) {
    this.logger.trace('Sanitizing settings')
    const settings = mergeDeep({}, defaultSettings)

    if (!isObject(input)) {
      return settings
    }

    // TODO: 检查设置文件有效性及版本迁移
    return mergeDeep(settings, input)
  }
}
