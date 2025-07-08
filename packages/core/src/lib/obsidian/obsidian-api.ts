import type { Plugin } from 'obsidian'

import type { LittleBot } from '../little-bot/little-bot'
import type { ObsidianApp } from './obsidian-app'

export interface ObsidianApi {
  readonly app: ObsidianApp
  readonly littleBot: LittleBot

  getPlugin: (name: Lowercase<string>) => Plugin | undefined

  getLanguage: () => string

  getLittleBotPath: () => string

  normalizePath: (path: string) => string

  adapterRead: (incomingPath: string) => Promise<string>
}
