import { Plugin } from 'obsidian'
import type { App, PluginManifest } from 'obsidian'

import type { LittleBot, Logger, LoggerSettings } from '@peaks/core'
import { init as initI18n } from '@peaks/i18n'
import { ObsidianApiImpl } from '@peaks/obsidian'
import { LittleBotSettingsImpl } from '@peaks/settings'
import { getLogger } from '@peaks/utils'

export default class LittleBotPlugin extends Plugin implements LittleBot {
  readonly logger: Logger
  readonly obsidian: ObsidianApiImpl
  readonly settings: LittleBotSettingsImpl

  constructor(app: App, manifest: PluginManifest) {
    super(app, manifest)

    this.logger = getLogger({ name: '🤖' })
    this.logger.trace('Initializing LittleBot')

    this.obsidian = new ObsidianApiImpl(this)
    this.settings = new LittleBotSettingsImpl(this)
  }

  override async onload() {
    this.logger.trace('Loading LittleBot')

    const { t } = await initI18n(this)

    // 读取插件设置
    await this.settings.load()

    // 添加一条命令
    this.addCommand({
      id: 'little-bot-command',
      name: t('little-bot-command', 'Ask Little Bot...'),
      callback: () => {
        this.logger.trace('Running Little Bot command')
      },
    })
  }

  override onunload() {
    super.onunload()

    this.logger.trace('Unloading Little Bot')
  }

  override onUserEnable() {
    this.logger.trace('User enabled Little Bot')
  }

  override async onExternalSettingsChange() {
    this.logger.trace('External settings changed')
    await this.settings.load(true)
  }

  getLogger(settings: LoggerSettings): Logger {
    return getLogger(settings)
  }
}
