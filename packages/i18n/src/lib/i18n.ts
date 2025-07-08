import i18n from 'i18next'

import type { LittleBot } from '@peaks/core'

import { ObsidianI18nBackend } from './obsidian-i18n-backend'
import type { ObsidianI18nBackendOptions } from './obsidian-i18n-backend'

const isDevelopment = process.env.NODE_ENV !== 'production'

let initialized = false

export async function init(littleBot: LittleBot) {
  if (!initialized) {
    await i18n
      .use(new ObsidianI18nBackend(littleBot))
      .init<ObsidianI18nBackendOptions>({
        debug: isDevelopment,
        saveMissing: isDevelopment,
        updateMissing: isDevelopment,

        defaultNS: 'general',
        ns: ['general'],

        fallbackLng: isDevelopment ? 'dev' : 'en',
        lng: littleBot.obsidian.getLanguage(),
        supportedLngs: ['en', 'zh', ...(isDevelopment ? ['dev'] : [])],

        backend: {
          addPath: 'locals/{{lng}}/{{ns}}.missing.json',
          loadPath: 'locals/{{lng}}/{{ns}}.json',
        },
      })

    initialized = true
  }

  return i18n
}

export function t() {
  if (!initialized) {
    throw new Error('i18n not initialized')
  }

  return i18n.t
}
