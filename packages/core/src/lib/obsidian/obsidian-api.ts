import type { Either } from 'effect'
import { Context } from 'effect'
import type { Effect } from 'effect/Effect'
import type { Plugin } from 'obsidian'

export class ObsidianApi extends Context.Tag('@peaks/core/ObsidianApi')<
  ObsidianApi,
  {
    adapterRead: (incomingPath: string) => Effect<string>
    normalizePath: (path: string) => Effect<string>

    getLanguage: () => Effect<string>
    getLittleBotPath: () => Effect<string>
    getPlugin: (name: Lowercase<string>) => Either.Either<Plugin, string>
  }
>() {}
