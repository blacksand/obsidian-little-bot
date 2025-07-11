import type { Either } from 'effect'
import { Context } from 'effect'
import type { Effect } from 'effect/Effect'
import type { DataWriteOptions, Debouncer, Plugin } from 'obsidian'

export class ObsidianApi extends Context.Tag('@peaks/core/ObsidianApi')<
  ObsidianApi,
  {
    adapterExists: (normalizedPath: string, sensitive?: boolean) => Effect<boolean>
    adapterRead: (normalizedPath: string) => Effect<string>
    adapterWrite: (normalizedPath: string, content: string, options?: DataWriteOptions) => Effect<void>

    debounce: <A extends unknown[], T>(
      callback: (...args: [...A]) => T,
      timeout?: number,
      resetTimer?: boolean,
    ) => Effect<Debouncer<A, T>>

    normalizePath: (path: string) => Effect<string>

    getLanguage: () => Effect<string>
    getLittleBotPath: () => Effect<string>
    getPlugin: (name: Lowercase<string>) => Either.Either<Plugin, string>
  }
>() {}
