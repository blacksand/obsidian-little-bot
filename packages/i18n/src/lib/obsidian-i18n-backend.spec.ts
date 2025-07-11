import { Effect } from 'effect'
import type { BackendModule } from 'i18next'
import { expect } from 'vitest'
import type { Mock } from 'vitest'

import { ObsidianApi } from '@peaks/core'

import { ObsidianI18nBackend } from './obsidian-i18n-backend'
import type { ObsidianI18nBackendOptions } from './obsidian-i18n-backend'

const basePath = '/mock/base/path'

// Mock the ObsidianApi
const ObsidianApiTest = ObsidianApi.of({
  adapterRead: vi.fn(),
  getLanguage: vi.fn(),
  getLittleBotPath: () => Effect.succeed(basePath),
  getPlugin: vi.fn(),
  normalizePath: vi.fn(),
})

const mockObsidianApi = ObsidianApiTest

describe('obsidianI18nBackend', () => {
  let backend: BackendModule<ObsidianI18nBackendOptions>
  const options: ObsidianI18nBackendOptions = {
    loadPath: 'locales/{{lng}}/{{ns}}.json',
  }

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks()

    backend = new ObsidianI18nBackend(mockObsidianApi)
    backend.init(null as never, options, null as never)
  })

  describe('read', () => {
    it('should read and parse a locale file successfully', async () => {
      const language = 'en'
      const namespace = 'translation'
      const mockData = Effect.succeed('{"key": "value"}')
      const fullPath = `${basePath}/locales/${language}/${namespace}.json`

      // Mock the adapterRead to return valid JSON data
      ;(mockObsidianApi.adapterRead as Mock).mockReturnValue(mockData)

      const callback = vi.fn()

      backend.read(language, namespace, callback)
      await Promise.resolve()

      expect(callback).toHaveBeenCalledWith(null, { key: 'value' })
      expect(mockObsidianApi.adapterRead).toHaveBeenCalledWith(fullPath)
    })

    it('should handle errors when reading a locale file', async () => {
      const language = 'en'
      const namespace = 'translation'
      const fullPath = `${basePath}/locales/${language}/${namespace}.json`
      const error = new Error('File not found')

      // Mock the adapterRead to throw an error
      ;(mockObsidianApi.adapterRead as Mock).mockReturnValueOnce(Effect.fail(error))

      const callback = vi.fn()

      backend.read(language, namespace, callback)
      await new Promise((resolve) => setTimeout(resolve, 100))

      expect(callback).toHaveBeenCalledWith(error, null)
      expect(mockObsidianApi.adapterRead).toHaveBeenCalledWith(fullPath)
    })

    it('should handle invalid JSON data', async () => {
      const language = 'en'
      const namespace = 'translation'
      const fullPath = `${basePath}/locales/${language}/${namespace}.json`
      const mockData = Effect.succeed('{invalid json}')

      // Mock the adapterRead to return invalid JSON data
      ;(mockObsidianApi.adapterRead as Mock).mockReturnValueOnce(mockData)

      const callback = vi.fn()

      backend.read(language, namespace, callback)
      await Promise.resolve()

      const error = new Error(`Invalid file ${fullPath}`)
      expect(callback).toHaveBeenCalledWith(error, null)
      expect(mockObsidianApi.adapterRead).toHaveBeenCalledWith(fullPath)
      // Verify that the logger's error method is called
      // expect(mockLogger.error).toHaveBeenCalled()
    })
  })

  describe('readMulti', () => {
    it('should read multiple locale files successfully', async () => {
      const languages = ['en', 'fr']
      const namespaces = ['translation', 'common']
      const mockData = Effect.succeed('{"key": "value"}')
      const resources: Record<string, Record<string, any>> = {}

      for (const lang of languages) {
        for (const ns of namespaces) {
          // const fullPath = `${basePath}/locales/${lang}/${ns}.json`
          resources[lang] = { ...resources[lang], [ns]: { key: 'value' } }
          ;(mockObsidianApi.adapterRead as Mock).mockReturnValueOnce(mockData)
        }
      }

      const callback = vi.fn()

      backend.readMulti?.(languages, namespaces, callback)
      await new Promise((resolve) => setTimeout(resolve, 100))

      expect(callback).toHaveBeenCalledWith(null, resources)

      for (const lang of languages) {
        for (const ns of namespaces) {
          const fullPath = `${basePath}/locales/${lang}/${ns}.json`
          expect(mockObsidianApi.adapterRead).toHaveBeenCalledWith(fullPath)
        }
      }
    })

    it('should handle errors when reading multiple locale files', async () => {
      const languages = ['en', 'fr']
      const namespaces = ['translation', 'common']
      const error = new Error('File not found')

      // Mock the first call to succeed and the second to fail
      ;(mockObsidianApi.adapterRead as Mock)
        .mockReturnValueOnce(Effect.succeed('{"key": "value"}'))
        .mockRejectedValueOnce(error)
        // Add a case with invalid JSON to test logger.error
        .mockReturnValueOnce(Effect.succeed('{invalid json}'))
        .mockReturnValueOnce(Effect.succeed('{"key": "value"}'))

      const callback = vi.fn()

      backend.readMulti?.(languages, namespaces, callback)
      await new Promise((resolve) => setTimeout(resolve, 100))

      const expectedValue = { en: { translation: { key: 'value' } }, fr: { common: { key: 'value' } } }
      expect(callback).toHaveBeenCalledWith(null, expectedValue)
      expect(mockObsidianApi.adapterRead).toHaveBeenCalledTimes(4)
      // Verify that the logger's error method is called for the invalid JSON
      // expect(mockLogger.error).toHaveBeenCalled()
    })
  })
})
