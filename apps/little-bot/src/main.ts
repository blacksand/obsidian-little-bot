import type { App, PluginManifest } from 'obsidian'
import { Plugin } from 'obsidian'

import { ObsidianApi } from '@peaks/core'
import type { Logger } from '@peaks/utils'
import { getLogger } from '@peaks/utils'

interface LittleBotSettings {
  version: string
}

const VERSION = '0.0.1'

function ensureSettings(input?: Partial<LittleBotSettings>) {
  const settings = { ...input }
  if (!settings.version) {
    settings.version = VERSION
  }

  return settings as LittleBotSettings
}

export default class LittleBotPlugin extends Plugin {
  readonly logger: Logger
  readonly obsidianApi: ObsidianApi

  constructor(app: App, manifest: PluginManifest) {
    super(app, manifest)

    this.obsidianApi = new ObsidianApi(app)

    this.logger = getLogger({ name: '🤖' })
    this.logger.debug('Initializing LittleBot')
  }

  private _settings = ensureSettings({ version: VERSION })

  get settings() {
    return this._settings
  }

  protected set settings(value: LittleBotSettings) {
    this._settings = ensureSettings(value)
  }

  override async onload() {
    this.logger.trace('Loading LittleBot')

    // 读取插件设置
    this.settings = await this.loadData()

    // 添加一条命令
    this.addCommand({
      id: 'little-bot-command',
      name: 'Run Little Bot Command',
      callback: () => {
        this.logger.debug('Running Little Bot command')
      },
    })
  }

  override onUserEnable() {
    this.logger.debug('User enabled Little Bot')
  }

  override onExternalSettingsChange() {
    const settings = this.loadData()
    this.logger.debug('New settings', settings)
  }
}
