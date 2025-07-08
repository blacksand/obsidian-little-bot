import type { DeepReadonly, Paths, PathValue } from 'ts-essentials'

import type { SanitizedSettings } from './sanitized-settings'

export interface LittleBotSettings {
  getAllSettings: () => DeepReadonly<SanitizedSettings>

  getSetting: (
    key: Paths<SanitizedSettings>,
    defaultValue?: PathValue<SanitizedSettings, typeof key>,
  ) => PathValue<SanitizedSettings, typeof key> | undefined

  load: (force?: boolean) => Promise<SanitizedSettings>
}
