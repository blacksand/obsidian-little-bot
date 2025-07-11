import type { ManagedRuntime } from 'effect/ManagedRuntime'

import type { I18nBackend } from '../i18n/i18n-backend'
import type { Internationalization } from '../i18n/internationalization'
import type { Logging } from '../logging/logging'
import type { ObsidianApi } from '../obsidian/obsidian-api'
import type { LittleBotSettings } from '../settings/little-bot-settings'
import type { LittleBot } from './little-bot'

export type LittleBotRuntime = ManagedRuntime<
  LittleBot |
  LittleBotSettings |
  I18nBackend |
  Internationalization |
  Logging |
  ObsidianApi,
  never
>
