import { version } from '@peaks/core/package.json'

import type { SanitizedSettings } from './sanitized-settings'

export const DEFAULT_SETTINGS: SanitizedSettings = {
  locale: 'en',
  templatePath: '',
  version,
}
