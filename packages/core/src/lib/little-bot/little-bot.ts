import { Context } from 'effect'
import type { PluginManifest } from 'obsidian'
import type { DeepReadonly } from 'ts-essentials'

import type { ObsidianApp } from '../obsidian/obsidian-app'

export class LittleBot extends Context.Tag('LittleBot')<
  LittleBot,
  {
    readonly app: ObsidianApp
    readonly manifest: DeepReadonly<PluginManifest>
    readonly saveData: (data: unknown) => Promise<void>
  }
>() {}
