import type { Effect } from 'effect'

export type LoggerMethod = (message: string, ...others: readonly unknown[]) => Effect.Effect<void, never, never>

export interface Logger {
  annotates: typeof Effect.annotateLogs
  annotatesScoped: typeof Effect.annotateLogsScoped
  withSpan: typeof Effect.withLogSpan

  debug: LoggerMethod
  error: LoggerMethod
  fatal: LoggerMethod
  info: LoggerMethod
  trace: LoggerMethod
  warn: LoggerMethod
}
