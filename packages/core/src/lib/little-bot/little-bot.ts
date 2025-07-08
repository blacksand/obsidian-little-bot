import type { Plugin, PluginManifest } from 'obsidian'

import type { Logger } from '../logging/logger'
import type { LoggerSettings } from '../logging/logger-settings'
import type { ObsidianApi } from '../obsidian/obsidian-api'
import type { ObsidianApp } from '../obsidian/obsidian-app'
import type { LittleBotSettings } from './little-bot-settings'

export interface LittleBot extends Plugin {
  readonly app: ObsidianApp
  readonly manifest: PluginManifest
  readonly obsidian: ObsidianApi

  readonly settings: LittleBotSettings

  readonly getLogger: (settings: LoggerSettings) => Logger
}
