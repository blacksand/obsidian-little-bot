import { Effect, LogLevel } from 'effect'

import type { Logger } from './logger'
import type { LoggerSettings } from './logger-settings'

export function getLogger({ name }: LoggerSettings = {}): Logger {
  const logWithLevel = (level: LogLevel.LogLevel) => {
    return (message: string, ...others: readonly unknown[]) => {
      const firstLine = name ? `${name} ${message}` : message
      return Effect.logWithLevel(level, firstLine, ...others)
    }
  }

  return {
    annotates: Effect.annotateLogs,
    annotatesScoped: Effect.annotateLogsScoped,
    withSpan: Effect.withLogSpan,

    debug: logWithLevel(LogLevel.Debug),
    error: logWithLevel(LogLevel.Error),
    fatal: logWithLevel(LogLevel.Fatal),
    info: logWithLevel(LogLevel.Info),
    trace: logWithLevel(LogLevel.Trace),
    warn: logWithLevel(LogLevel.Warning),
  }
}

export const defaultLogger = getLogger()
