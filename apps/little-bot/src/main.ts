import { Effect } from 'effect'
import { Plugin } from 'obsidian'
import type { PluginManifest } from 'obsidian'

import { handleLittleBotCommand } from '@peaks/commands'
import { Internationalization, LittleBotSettings, Logging } from '@peaks/core'
import type { LittleBotRuntime, Logger, ObsidianApp } from '@peaks/core'

import './styles/global.css'
import { makeRuntime } from './runtime/make-runtime'

export default class LittleBotPlugin extends Plugin {
  readonly runtime: LittleBotRuntime
  readonly logger: Logger

  constructor(app: ObsidianApp, manifest: PluginManifest) {
    super(app, manifest)

    this.runtime = makeRuntime(this)

    this.logger = this.runtime.runSync(
      Logging.pipe(
        Effect.map((service) => service.getLogger({ name: '🤖' })),
        Effect.tap((logger) => logger.trace('LittleBot initialized')),
      ),
    )
  }

  override async onload() {
    await this.runtime.runPromise(LittleBotSettings.pipe(
      Effect.tap(() => this.logger.trace('Loading Little Bot...')),

      // load settings
      Effect.zip(Effect.promise(() => this.loadData())),
      Effect.andThen(([settings, data]) => settings.load(data)),
      Effect.tap((loaded) => this.logger.trace('Settings loaded', loaded)),

      // initialize i18n
      Effect.zip(Internationalization),
      Effect.flatMap(([settings, i18n]) => i18n.init(settings)),

      // add commands
      Effect.tap((t) => this.addCommand({
        id: 'little-bot-command',
        name: t('LittleBotCommand', 'Ask Little Bot...'),
        callback: handleLittleBotCommand(this.app, this.runtime),
        editorCallback: handleLittleBotCommand(this.app, this.runtime, true),
      })),
    ))
  }

  override async onunload() {
    this.runtime.runSync(this.logger.trace('Unload Little Bot'))
    // await this.runtime.dispose()

    super.onunload()
  }

  override onUserEnable() {
    Effect.runSync(this.logger.trace('User enabled Little Bot'))
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
