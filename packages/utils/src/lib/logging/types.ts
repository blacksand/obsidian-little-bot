import type { Merge } from 'ts-essentials'
import type { ILogObj, ISettingsParam, Logger as TsLogger } from 'tslog'

export interface LoggingObject extends ILogObj {
  scope?: string
}

export type Logger = TsLogger<LoggingObject>
export type Settings = Merge<ISettingsParam<LoggingObject>, {
  name: string
  scope?: string
}>
