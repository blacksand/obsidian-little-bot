import { Context } from 'effect'
import type { Effect } from 'effect'
import type { t } from 'i18next'

export class Internationalization extends Context.Tag('i18n')<
  Internationalization,
  {
    init: () => Effect.Effect<typeof t>
    t: typeof t
  }
>() {}
