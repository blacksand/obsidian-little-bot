import { Context } from 'effect'
import type { Effect } from 'effect'
import type { t } from 'i18next'

import type { SanitizedSettings } from '../settings/sanitized-settings'

export class Internationalization extends Context.Tag('@peaks/core/i18n')<
  Internationalization,
  {
    init: (settings: SanitizedSettings) => Effect.Effect<typeof t, unknown>
    t: typeof t
  }
>() {}
