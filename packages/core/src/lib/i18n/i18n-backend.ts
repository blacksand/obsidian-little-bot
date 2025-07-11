import { Context } from 'effect'
import type { BackendModule } from 'i18next'

export class I18nBackend extends Context.Tag('@peaks/core/I18nBackend')<
  I18nBackend,
  BackendModule
>() {}
