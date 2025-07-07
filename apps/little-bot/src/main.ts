import type { App, PluginManifest } from 'obsidian'
import { Plugin } from 'obsidian'

import { LittleBotSettings, ObsidianApi } from '@peaks/core'
import type { LittleBot } from '@peaks/core'
import { init as initI18n } from '@peaks/i18n'
import type { Logger } from '@peaks/utils/logging'
import { getLogger } from '@peaks/utils/logging'

export default class LittleBotPlugin extends Plugin implements LittleBot {
  readonly logger: Logger
  readonly settings: LittleBotSettings
  readonly obsidianApi: ObsidianApi

  constructor(app: App, manifest: PluginManifest) {
    super(app, manifest)

    this.logger = getLogger({ name: '🤖' })
    this.logger.trace('Initializing LittleBot')

    this.obsidianApi = new ObsidianApi(this)
    this.settings = new LittleBotSettings(this)
  }

  override async onload() {
    this.logger.trace('Loading LittleBot')

    const { t } = await initI18n(
      this.obsidianApi,
      this.logger.getSubLogger({ name: '🌏' }, { scope: 'i18n' }),
    )

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
}
