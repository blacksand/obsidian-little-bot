import 'i18next'

import type translation from './locales/dev/translation.json'

declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: 'translation'
    // custom resources type
    resources: {
      translation: typeof translation
    }
    strictKeyChecks: true
  }
}
