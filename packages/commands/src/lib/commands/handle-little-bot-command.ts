import type { LittleBotRuntime, ObsidianApp } from '@peaks/core'

import { LittleBotModal } from './little-bot-modal'

export function handleLittleBotCommand(app: ObsidianApp, runtime: LittleBotRuntime, isEditor = false) {
  return () => {
    const model = new LittleBotModal(app, runtime, isEditor)
    model.open()
  }
}
