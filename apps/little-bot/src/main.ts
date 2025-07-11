import { Effect, Layer, ManagedRuntime } from 'effect'
import { Plugin } from 'obsidian'
import type { PluginManifest } from 'obsidian'

import { Internationalization, LittleBot, LittleBotSettings, Logging, ObsidianApi } from '@peaks/core'
import type { LittleBotRuntime, ObsidianApp } from '@peaks/core'
import { I18nBackend, InternationalizationLive, ObsidianI18nBackend } from '@peaks/i18n'
import { ObsidianApiLive } from '@peaks/obsidian'

export default class LittleBotPlugin extends Plugin {
  readonly runtime: LittleBotRuntime<I18nBackend | Internationalization>
  readonly logger: ReturnType<typeof Logging.Service['getLogger']>

  constructor(app: ObsidianApp, manifest: PluginManifest) {
    super(app, manifest)

    const LittleBotLive = Layer.succeed(
      LittleBot,
      LittleBot.of(
        { app, manifest, saveData: this.saveData.bind(this) },
      ),
    )

    const ObsidianI18nBackendLive = Layer.effect(
      I18nBackend,
      ObsidianApi.pipe(Effect.map((obsidian) => new ObsidianI18nBackend(obsidian))),
    )

    const apiLayer = Layer.provideMerge(
      ObsidianApiLive,
      Layer.mergeAll(
        LittleBotLive,
        Logging.Default,
        LittleBotSettings.Default,
      ),
    )

    const i18nLayer = Layer.merge(
      Layer.provide(ObsidianI18nBackendLive, ObsidianApiLive),
      Layer.provide(InternationalizationLive, ObsidianI18nBackendLive),
    )

    this.runtime = ManagedRuntime.make(
      Layer.provideMerge(i18nLayer, apiLayer),
    )

    this.logger = this.runtime.runSync(
      Logging.pipe(
        Effect.map(({ getLogger }) => getLogger({ name: '🤖' })),
        Effect.tap((logger) => logger.trace('Initialized LittleBot')),
      ),
    )
  }

  override async onload() {
    this.runtime.runFork(LittleBotSettings.pipe(
      Effect.tap(() => this.logger.trace('Loading Little Bot...')),
      Effect.zip(Effect.promise(() => this.loadData())),
      Effect.andThen(([settings, data]) => settings.load(data)),
      Effect.tap((loaded) => this.logger.trace('Settings loaded', loaded)),
      Effect.flatMap(() => Internationalization),
      Effect.flatMap((i18n) => i18n.init()),
      Effect.tap((t) => this.addCommand({
        id: 'little-bot-command',
        name: t('little-bot-command', 'Ask Little Bot...'),
        callback: () => {
          this.runtime.runFork(
            this.logger.trace('Running Little Bot command'),
          )
        },
      })),
    ))
  }

  override async onunload() {
    this.runtime.runSync(this.logger.trace('Unloading Little Bot'))
    await this.runtime.dispose()

    super.onunload()
  }

  override onUserEnable() {
    this.runtime.runFork(this.logger.trace('User enabled Little Bot'))
  }

  override async onExternalSettingsChange() {
    this.runtime.runFork(LittleBotSettings.pipe(
      Effect.tap(() => this.logger.trace('Reloading settings...')),
      Effect.zip(Effect.promise(() => this.loadData())),
      Effect.andThen(([settings, data]) => settings.load(data)),
      Effect.tap((loaded) => this.logger.trace('Reload done', loaded)),
    ))
  }
}
