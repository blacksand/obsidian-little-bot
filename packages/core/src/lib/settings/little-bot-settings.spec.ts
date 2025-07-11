import { beforeEach, describe, expect, it } from '@effect/vitest'
import { Exit, ManagedRuntime } from 'effect'
import { exit, gen } from 'effect/Effect'

import { Uninitialized } from '../errors/uninitialized'
import { DEFAULT_SETTINGS } from './default-settings'
import { LittleBotSettings } from './little-bot-settings'
import type { SanitizedSettings } from './sanitized-settings'

const { version: pluginVersion } = DEFAULT_SETTINGS

// Test data
const mockSettings: SanitizedSettings = {
  locale: 'en',
  templatePath: '/test/path',
  version: pluginVersion,
}

const invalidSettings = {
  invalidField: 'invalid',
}

// Setup effect runtime
const runtime = ManagedRuntime.make(LittleBotSettings.Default)

describe('littleBotSettings', () => {
  let service: typeof LittleBotSettings.Service
  const error = new Uninitialized('LittleBotSettings')

  beforeEach(() => {
    runtime.runSync(gen(function* () {
      service = yield* LittleBotSettings
      yield* service.unload()
    }))
  })

  describe('getSettings with uninitialized', () => {
    it.effect('should fail with UninitializedError when not initialized', () => gen(function* () {
      const result = yield* exit(service.getAll())
      expect(result).toStrictEqual(Exit.fail(error))
    }))

    it('should reject with UninitializedError when not initialized', async () => {
      await expect(runtime.runPromise(service.getAll())).rejects.toThrowError(error.message)
    })
  })

  describe('load', () => {
    it.effect('should load valid settings', () => gen(function* () {
      // Load settings
      yield* service.load(mockSettings)

      // Verify settings were loaded by getting them
      const result = yield* service.getAll()
      expect(result).toEqual(mockSettings)
    }))

    it.effect('should sanitize invalid settings', () => gen(function* () {
      // Load invalid settings
      yield* service.load(invalidSettings)

      // Verify settings were sanitized
      const result = yield* service.getAll()

      // Should have default values since invalid settings were provided
      expect(result.locale).toBe('en')
      expect(result.templatePath).toBe('')
      expect(result.version).toBe(pluginVersion)
    }))

    it.effect('should update settings when called multiple times', () => gen(function* () {
      // Load initial settings
      yield* service.load(mockSettings)

      // Verify initial settings
      let result = yield* service.getAll()
      expect(result).toEqual(mockSettings)

      // Load new settings
      const newSettings: SanitizedSettings = {
        locale: 'fr',
        templatePath: '/new/path',
        version: '2.0.0',
      }
      yield* service.load(newSettings)

      // Verify settings were updated
      result = yield* service.getAll()
      expect(result).toEqual({ ...newSettings, version: pluginVersion })
    }))
  })

  describe('getAllSettings', () => {
    it.effect('should return all settings when initialized', () => gen(function* () {
      yield* service.load(mockSettings)
      const result = yield* service.getAll()

      // Verify the result
      expect(result).toEqual(mockSettings)
    }))
  })

  describe('getSetting', () => {
    it.effect('should return a specific setting when initialized', () => gen(function* () {
      // Load settings
      yield* service.load(mockSettings)

      // Get a specific setting
      const locale = yield* service.getSetting('locale')
      const templatePath = yield* service.getSetting('templatePath')
      const version = yield* service.getSetting('version')

      // Verify the results
      expect(locale).toBe('en')
      expect(templatePath).toBe('/test/path')
      expect(version).toBe(pluginVersion)
    }))

    it.effect('should fail with UninitializedError when not initialized', () => gen(function* () {
      const result = yield* exit(service.getSetting('locale'))
      expect(result).toStrictEqual(Exit.fail(error))
    }))
  })
})
