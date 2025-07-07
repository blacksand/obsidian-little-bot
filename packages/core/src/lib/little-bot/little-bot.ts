import type { PluginManifest } from 'obsidian'

import type { ObsidianApp } from '../obsidian/obsidian-api'
import type { LittleBotSettings } from './little-bot-settings'

export interface LittleBot {
  readonly app: ObsidianApp
  readonly manifest: PluginManifest

  readonly settings: LittleBotSettings
}
