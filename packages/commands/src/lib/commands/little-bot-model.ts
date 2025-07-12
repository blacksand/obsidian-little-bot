import { Effect } from 'effect'
import type { App } from 'obsidian'
import { Modal } from 'obsidian'

import { Internationalization, LittleBot, Logging, ObsidianApi } from '@peaks/core'
import type { LittleBotRuntime } from '@peaks/core'

export class LittleBotModal extends Modal {
  constructor(app: App, readonly runtime: LittleBotRuntime, readonly isEditor: boolean) {
    super(app)

    const runnable = Effect.all([LittleBot, Logging, Internationalization, ObsidianApi]).pipe(
      Effect.map(([littleBot, { getLogger }, { t }, obsidian]) =>
        ({ littleBot, logger: getLogger({ name: '🕹️' }), obsidian, t })),

      Effect.tap(({ logger }) => Effect.gen(this, function* () {
        yield* logger.trace('Run Little Bot Command')
        this.setContent('Look at me, I\'m a modal! 👀')
      })),
    )

    this.runtime.runFork(runnable)
  }
}
