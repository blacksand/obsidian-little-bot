import { Effect, Layer, Logger, LogLevel, ManagedRuntime } from 'effect'
import type { Plugin } from 'obsidian'

import { I18nBackend, LittleBot, LittleBotSettings, Logging, ObsidianApi } from '@peaks/core'
import { InternationalizationLive, ObsidianI18nBackend } from '@peaks/i18n'
import { ObsidianApiLive } from '@peaks/obsidian'

const isProduction = process.env.NODE_ENV === 'production'

export function makeRuntime(littleBot: Plugin) {
  const LittleBotLive = Layer.succeed(
    LittleBot,
    LittleBot.of({
      app: littleBot.app,
      manifest: littleBot.manifest,
      saveData: littleBot.saveData.bind(littleBot),
    }),
  )

  const ObsidianI18nBackendLive = Layer.effect(
    I18nBackend,
    ObsidianApi.pipe(Effect.map((obsidian) => new ObsidianI18nBackend(obsidian))),
  )

  const apiLayer = Layer.provideMerge(
    ObsidianApiLive,
    Layer.mergeAll(LittleBotLive, Logging.Default, LittleBotSettings.Default),
  )

  const i18nLayer = Layer.merge(
    Layer.provide(ObsidianI18nBackendLive, ObsidianApiLive),
    Layer.provide(InternationalizationLive, ObsidianI18nBackendLive),
  )

  return ManagedRuntime.make(
    Layer.mergeAll(
      Layer.provideMerge(i18nLayer, apiLayer),
      Logger.pretty,
      Logger.minimumLogLevel(isProduction ? LogLevel.Warning : LogLevel.Trace),
    ),
  )
}
