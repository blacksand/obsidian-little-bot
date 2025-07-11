import { Data, Effect } from 'effect'
import { isPlainObject, isString, mergeDeep } from 'remeda'

import { DEFAULT_SETTINGS } from './default-settings'

export interface SanitizedSettings {
  locale: string
  templatePath: string
  version: string
}

export class InvalidSettings extends Data.TaggedError('InvalidSettingsError') {}

function isValidSettings(data: unknown | Partial<SanitizedSettings>): data is Partial<SanitizedSettings> {
  return isPlainObject(data)
}

export function sanitizeSettings(data: unknown): Effect.Effect<SanitizedSettings, InvalidSettings> {
  const settings = mergeDeep({}, DEFAULT_SETTINGS)

  if (!isValidSettings(data)) {
    return Effect.fail(new InvalidSettings())
  }

  if (isString(data.locale)) {
    settings.locale = data.locale
  }

  if (isString(data.templatePath)) {
    settings.templatePath = data.templatePath
  }

  // always use the version from plugin
  // if (isString(data.version)) {
  //   settings.version = data.version
  // }

  return Effect.succeed(settings)
}
