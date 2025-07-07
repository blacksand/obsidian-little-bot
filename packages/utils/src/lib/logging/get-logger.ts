import { Logger as TsLogger } from 'tslog'

import type { Logger, LoggingObject, Settings } from './types'

const MIN_LEVEL = process.env.NODE_ENV === 'production' ? 4 : 1

export function getLogger(incomingSettings: Settings, logObject?: LoggingObject): Logger {
  const { scope, ...settings } = incomingSettings

  return new TsLogger<LoggingObject>(
    {
      type: 'pretty',
      prettyLogTemplate: '{{hh}}:{{MM}}:{{ss}}.{{ms}} {{logLevelName}} {{name}} ',
      ...settings,
      hideLogPositionForProduction: true,
      maskValuesRegEx: [/api_?key/i],
      minLevel: MIN_LEVEL,
    },
    logObject,
  )
}
