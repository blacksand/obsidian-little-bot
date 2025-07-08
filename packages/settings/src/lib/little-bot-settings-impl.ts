import { isPlainObject, mergeDeep } from 'remeda'
import type { DeepReadonly, Paths, PathValue } from 'ts-essentials'

import type { LittleBot, LittleBotSettings, Logger, SanitizedSettings } from '@peaks/core'
import { version } from '@peaks/core/package.json'

const defaultSettings = {
  locale: 'en',
  version,
}

export class LittleBotSettingsImpl implements LittleBotSettings {
  private resolved = false
  private sanitizedSettings = defaultSettings
  private readonly logger: Logger

  constructor(readonly littleBot: LittleBot) {
    this.logger = littleBot.getLogger({ name: '⚙️', scope: 'settings' })
  }

  getAllSettings() {
    return this.sanitizedSettings
  }

  getSetting(
    key: Paths<SanitizedSettings>,
    defaultValue?: PathValue<SanitizedSettings, typeof key>,
  ): PathValue<SanitizedSettings, typeof key> | undefined {
    return key in this.sanitizedSettings ? this.sanitizedSettings[key] : defaultValue
  }

  async load(force = false): Promise<DeepReadonly<SanitizedSettings>> {
    if (!this.resolved || force) {
      let settings: unknown

      try {
        this.logger.trace('Loading settings')
        settings = await this.littleBot.loadData()
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

    await this.littleBot.saveData(this.sanitizedSettings)
    this.logger.trace('Settings saved', this.sanitizedSettings)
  }

  private sanitize(input: unknown) {
    this.logger.trace('Sanitizing settings')
    const settings = mergeDeep({}, defaultSettings)

    if (!isPlainObject(input)) {
      return settings
    }

    // TODO: 检查设置文件有效性及版本迁移
    return mergeDeep(settings, input)
  }
}
