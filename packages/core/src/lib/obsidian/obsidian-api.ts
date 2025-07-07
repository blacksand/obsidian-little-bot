import { getLanguage, normalizePath } from 'obsidian'

import type { LittleBot } from '../little-bot/types'
import type { ObsidianApp } from './types'

export class ObsidianApi {
  readonly app: ObsidianApp

  constructor(readonly littleBot: LittleBot) {
    this.app = littleBot.app
  }

  getPlugin(name: Lowercase<string>) {
    return this.app.plugins?.enabledPlugins?.has(name)
      ? this.app.plugins.plugins?.[name]
      : undefined
  }

  getLanguage() {
    return getLanguage()
  }

  getLittleBotPath(): string {
    return this.littleBot.manifest.dir ?? `${this.app.vault.configDir}/plugins/${this.littleBot.manifest.id}`
  }

  normalizePath(path: string): string {
    return normalizePath(path)
  }

  async adapterRead(incomingPath: string): Promise<string> {
    const path = this.normalizePath(incomingPath)

    return this.app.vault.adapter.read(path)
  }
}
