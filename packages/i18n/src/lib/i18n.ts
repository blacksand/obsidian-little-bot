import { Context, Effect, Layer } from 'effect'
import i18next from 'i18next'
import type { BackendModule } from 'i18next'

import { Internationalization, LittleBotSettings, ObsidianApi } from '@peaks/core'

import type { ObsidianI18nBackendOptions } from './obsidian-i18n-backend'

const isDevelopment = process.env.NODE_ENV !== 'production'

export class I18nBackend extends Context.Tag('I18nBackend')<
  I18nBackend,
  BackendModule
>() {}

export const InternationalizationLive = Layer.effect(
  Internationalization,
  Effect.gen(function* () {
    const obsidian = yield* ObsidianApi
    const { getSetting } = yield* LittleBotSettings

    const localeFromApp = yield* obsidian.getLanguage()
    const localeFromSetting = yield* getSetting('locale')

    const fallbackLanguages = localeFromApp === localeFromSetting ? [] : [localeFromApp]
    if (isDevelopment) {
      fallbackLanguages.unshift('dev')
    }
    if (localeFromApp !== 'en') {
      fallbackLanguages.push('en')
    }

    const backend = yield* I18nBackend

    return ({
      init: () => Effect.promise(() =>
        i18next
          .use(backend)
          .init<ObsidianI18nBackendOptions>({
            debug: isDevelopment,
            saveMissing: isDevelopment,
            updateMissing: isDevelopment,

            defaultNS: 'general',
            ns: ['general'],

            fallbackLng: fallbackLanguages,
            lng: localeFromSetting ?? localeFromApp,
            supportedLngs: ['en', 'zh', ...(isDevelopment ? ['dev'] : [])],

            backend: {
              addPath: 'locals/{{lng}}/{{ns}}.missing.json',
              loadPath: 'locals/{{lng}}/{{ns}}.json',
            },
          })),
      t: i18next.t,
    })
  }),
)
