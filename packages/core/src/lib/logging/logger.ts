import type { LoggingObject } from './logging-object'

export interface Logger {
  readonly log: (logLevelId: number, logLevelName: string, ...args: unknown[]) => LoggingObject | undefined

  /**
   * Logs a trace message.
   * @param args  - Multiple log attributes that should be logged out.
   */
  readonly trace: (...args: unknown[]) => LoggingObject | undefined

  /**
   * Logs a debug message.
   * @param args  - Multiple log attributes that should be logged out.
   */
  readonly debug: (...args: unknown[]) => LoggingObject | undefined

  /**
   * Logs an info message.
   * @param args  - Multiple log attributes that should be logged out.
   */
  readonly info: (...args: unknown[]) => LoggingObject | undefined

  /**
   * Logs a warn message.
   * @param args  - Multiple log attributes that should be logged out.
   */
  readonly warn: (...args: unknown[]) => LoggingObject | undefined

  /**
   * Logs an error message.
   * @param args  - Multiple log attributes that should be logged out.
   */
  readonly error: (...args: unknown[]) => LoggingObject | undefined

  /**
   * Logs a fatal message.
   * @param args  - Multiple log attributes that should be logged out.
   */
  readonly fatal: (...args: unknown[]) => LoggingObject | undefined
}
