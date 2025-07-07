import type { PluginManifest } from 'obsidian'

import type { ObsidianApp } from '../obsidian/types'
import type { LittleBotSettings } from './little-bot-settings'

export interface SanitizedSettings {
  locale: string
  version: string
}

export interface LittleBot {
  readonly app: ObsidianApp
  readonly manifest: PluginManifest

  readonly settings: LittleBotSettings
}
