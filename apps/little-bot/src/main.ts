import type { App, PluginManifest } from 'obsidian'
import { Plugin } from 'obsidian'

import { LittleBotSettings, ObsidianApi } from '@peaks/core'
import type { LittleBot } from '@peaks/core'
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

    this.obsidianApi = new ObsidianApi(app)
    this.settings = new LittleBotSettings(this)
  }

  override async onload() {
    this.logger.trace('Loading LittleBot')

    // 读取插件设置
    await this.settings.load()

    // 添加一条命令
    this.addCommand({
      id: 'little-bot-command',
      name: 'Ask Little Bot ...',
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
