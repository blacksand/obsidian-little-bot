import type { ManagedRuntime } from 'effect/ManagedRuntime'

import type { Logging } from '../logging/logging'
import type { ObsidianApi } from '../obsidian/obsidian-api'
import type { LittleBotSettings } from '../settings/little-bot-settings'
import type { LittleBot } from './little-bot'

export type LittleBotRuntime<R> = ManagedRuntime<
  LittleBot |
  ObsidianApi |
  typeof Logging.Service |
  typeof LittleBotSettings.Service |
  R,
  unknown
>
