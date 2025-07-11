import type { Effect } from 'effect'
import { Context } from 'effect'
import type { BackendModule } from 'i18next'

export class I18nBackend extends Context.Tag('I18nBackend')<
  I18nBackend,
  Effect.Effect<BackendModule>
>() {}
