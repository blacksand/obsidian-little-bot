import { Effect, Layer } from 'effect'
import i18next from 'i18next'

import type { SanitizedSettings } from '@peaks/core'
import { I18nBackend, Internationalization, ObsidianApi } from '@peaks/core'

import type { ObsidianI18nBackendOptions } from './obsidian-i18n-backend'

const isDevelopment = process.env.NODE_ENV !== 'production'

export const InternationalizationLive = Layer.effect(
  Internationalization,
  Effect.gen(function* () {
    const backend = yield* I18nBackend
    const obsidian = yield* ObsidianApi
    const localeFromApp = yield* obsidian.getLanguage()

    const init = (settings: SanitizedSettings) =>
      Effect.succeed(settings.locale)
        .pipe(
          Effect.flatMap((localeFromSetting) => {
            const fallbackLanguages = localeFromApp === localeFromSetting ? [] : [localeFromApp]
            if (isDevelopment) {
              fallbackLanguages.unshift('dev')
            }

            if (localeFromApp !== 'en') {
              fallbackLanguages.push('en')
            }

            return Effect.promise(() =>
              i18next
                .use(backend)
                .init<ObsidianI18nBackendOptions>({
                  debug: isDevelopment,
                  saveMissing: isDevelopment,
                  updateMissing: isDevelopment,

                  defaultNS: 'translation',
                  ns: ['translation'],

                  fallbackLng: fallbackLanguages,
                  lng: localeFromSetting ?? localeFromApp,
                  supportedLngs: ['en', 'zh', ...(isDevelopment ? ['dev'] : [])],

                  backend: {
                    addPath: 'locales/{{lng}}/{{ns}}.missing.json',
                    loadPath: 'locales/{{lng}}/{{ns}}.json',
                  },
                }))
          }),
        )

    return {
      init,
      t: i18next.t,
    }
  }),
)
