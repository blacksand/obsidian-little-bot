import type { Merge } from 'ts-essentials'
import type { ILogObj, ISettingsParam } from 'tslog'
import { Logger as TsLogger } from 'tslog'

export interface LoggingObject extends ILogObj {
  scope?: string
}

export type Logger = TsLogger<LoggingObject>

export type Settings = Merge<ISettingsParam<LoggingObject>, {
  name: string
  scope?: string
}>

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
