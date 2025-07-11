import { Effect, LogLevel } from 'effect'

import type { LoggerSettings } from './logger-settings'

export interface Logger {
  trace: (message: string, ...others: readonly unknown[]) => Effect.Effect<void, never, never>

  debug: (message: string, ...others: readonly unknown[]) => Effect.Effect<void, never, never>

  info: (message: string, ...others: readonly unknown[]) => Effect.Effect<void, never, never>

  warn: (message: string, ...others: readonly unknown[]) => Effect.Effect<void, never, never>

  error: (message: string, ...others: readonly unknown[]) => Effect.Effect<void, never, never>

  fatal: (message: string, ...others: readonly unknown[]) => Effect.Effect<void, never, never>

  annotates: typeof Effect.annotateLogs
  annotatesScoped: typeof Effect.annotateLogsScoped

  withSpan: typeof Effect.withLogSpan
}

export class Logging extends Effect.Service<Logging>()(
  'Logging',
  {
    sync: () => {
      // eslint-disable-next-line unicorn/consistent-function-scoping
      const getLogger = ({ name }: LoggerSettings): Logger => ({
        trace: (message: string, ...others: readonly unknown[]) =>
          Effect.logWithLevel(LogLevel.Trace, `${name} ${message}`, ...others),

        debug: (message: string, ...others: readonly unknown[]) =>
          Effect.logWithLevel(LogLevel.Debug, `${name} ${message}`, ...others),

        info: (message: string, ...others: readonly unknown[]) =>
          Effect.logWithLevel(LogLevel.Info, `${name} ${message}`, ...others),

        warn: (message: string, ...others: readonly unknown[]) =>
          Effect.logWithLevel(LogLevel.Warning, `${name} ${message}`, ...others),

        error: (message: string, ...others: readonly unknown[]) =>
          Effect.logWithLevel(LogLevel.Error, `${name} ${message}`, ...others),

        fatal: (message: string, ...others: readonly unknown[]) =>
          Effect.logWithLevel(LogLevel.Fatal, `${name} ${message}`, ...others),

        annotates: Effect.annotateLogs,
        annotatesScoped: Effect.annotateLogsScoped,

        withSpan: Effect.withLogSpan,
      })

      return { getLogger }
    },
  },
) {}
