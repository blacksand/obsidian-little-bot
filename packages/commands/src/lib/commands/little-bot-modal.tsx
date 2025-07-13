import { Effect } from 'effect'
import type { App } from 'obsidian'
import { Modal } from 'obsidian'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'

import { Internationalization, LittleBot, Logging, ObsidianApi } from '@peaks/core'
import type { LittleBotRuntime } from '@peaks/core'
import type { Undefinable } from '@peaks/utils'

import { LittleBotCommand } from './little-bot-command'

export class LittleBotModal extends Modal {
  root: Undefinable<Root>

  constructor(app: App, readonly runtime: LittleBotRuntime, readonly isEditor: boolean) {
    super(app)

    const runnable = Effect.all([LittleBot, Logging, Internationalization, ObsidianApi]).pipe(
      Effect.map(([littleBot, { getLogger }, { t }, obsidian]) =>
        ({ littleBot, logger: getLogger({ name: '🕹️' }), obsidian, t })),

      Effect.tap(({ logger }) => Effect.gen(this, function* () {
        yield* logger.trace('Run Little Bot Command')
        this.setTitle('LittleBot')
        // this.setContent('Look at me, I\'m a modal! 👀')
      })),
    )

    this.runtime.runFork(runnable)
  }

  override onOpen() {
    super.onOpen()

    const container = this.containerEl.children[1]

    if (!container) {
      return
    }

    this.root = createRoot(container)

    this.root.render(
      <StrictMode>
        <LittleBotCommand />
        ,
      </StrictMode>,
    )
  }

  override onClose() {
    super.onOpen()

    this.root?.unmount()
  }
}
