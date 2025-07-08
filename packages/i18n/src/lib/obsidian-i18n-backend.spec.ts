import type { BackendModule } from 'i18next'

import type { LittleBot, Logger, LoggerSettings, ObsidianApi } from '@peaks/core'

import { ObsidianI18nBackend } from './obsidian-i18n-backend'
import type { ObsidianI18nBackendOptions } from './obsidian-i18n-backend'

const basePath = '/mock/base/path'

// Mock the ObsidianApi
const mockObsidianApi = {
  adapterRead: vi.fn(),
  getLittleBotPath: () => basePath,
  // @ts-expect-error types - other properties not needed for tests
} satisfies ObsidianApi

// Mock the Logger
const mockLogger = {
  error: vi.fn(),
  // @ts-expect-error types - other properties not needed for tests
} satisfies Logger

// Mock the LittleBot
const mockLittleBot = {
  // @ts-expect-error types - other properties not needed for tests
  getLogger: (_settings: LoggerSettings) => mockLogger,
  // @ts-expect-error types - other properties not needed for tests
  obsidian: mockObsidianApi,
} satisfies LittleBot

describe('obsidianI18nBackend', () => {
  let backend: BackendModule<ObsidianI18nBackendOptions>
  const options: ObsidianI18nBackendOptions = {
    loadPath: 'locals/{{lng}}/{{ns}}.json',
  }

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks()

    // @ts-expect-error mock
    backend = new ObsidianI18nBackend(mockLittleBot)
    backend.init(null as never, options, null as never)
  })

  describe('read', () => {
    it('should read and parse a locale file successfully', async () => {
      const language = 'en'
      const namespace = 'translation'
      const mockData = '{"key": "value"}'
      const fullPath = `${basePath}/locals/${language}/${namespace}.json`

      // Mock the adapterRead to return valid JSON data
      mockObsidianApi.adapterRead.mockResolvedValueOnce(mockData)

      const callback = vi.fn()

      backend.read(language, namespace, callback)
      await Promise.resolve()

      expect(callback).toHaveBeenCalledWith(null, { key: 'value' })
      expect(mockObsidianApi.adapterRead).toHaveBeenCalledWith(fullPath)
    })

    it('should handle errors when reading a locale file', async () => {
      const language = 'en'
      const namespace = 'translation'
      const fullPath = `${basePath}/locals/${language}/${namespace}.json`
      const error = new Error('File not found')

      // Mock the adapterRead to throw an error
      mockObsidianApi.adapterRead.mockRejectedValueOnce(error)

      const callback = vi.fn()

      backend.read(language, namespace, callback)
      await new Promise((resolve) => setTimeout(resolve, 100))

      expect(callback).toHaveBeenCalledWith(error, null)
      expect(mockObsidianApi.adapterRead).toHaveBeenCalledWith(fullPath)
    })

    it('should handle invalid JSON data', async () => {
      const language = 'en'
      const namespace = 'translation'
      const fullPath = `${basePath}/locals/${language}/${namespace}.json`
      const mockData = '{invalid json}'

      // Mock the adapterRead to return invalid JSON data
      mockObsidianApi.adapterRead.mockResolvedValueOnce(mockData)

      const callback = vi.fn()

      backend.read(language, namespace, callback)
      await Promise.resolve()

      const error = new Error(`Failed to parse ${fullPath}`)
      expect(callback).toHaveBeenCalledWith(error, null)
      expect(mockObsidianApi.adapterRead).toHaveBeenCalledWith(fullPath)
      // Verify that the logger's error method is called
      expect(mockLogger.error).toHaveBeenCalled()
    })
  })

  describe('readMulti', () => {
    it('should read multiple locale files successfully', async () => {
      const languages = ['en', 'fr']
      const namespaces = ['translation', 'common']
      const mockData = '{"key": "value"}'
      const resources: Record<string, Record<string, any>> = {}

      for (const lang of languages) {
        for (const ns of namespaces) {
          // const fullPath = `${basePath}/locals/${lang}/${ns}.json`
          resources[lang] = { ...resources[lang], [ns]: { key: 'value' } }
          mockObsidianApi.adapterRead.mockResolvedValueOnce(mockData)
        }
      }

      const callback = vi.fn()

      backend.readMulti?.(languages, namespaces, callback)
      await new Promise((resolve) => setTimeout(resolve, 100))

      expect(callback).toHaveBeenCalledWith(null, resources)

      for (const lang of languages) {
        for (const ns of namespaces) {
          const fullPath = `${basePath}/locals/${lang}/${ns}.json`
          expect(mockObsidianApi.adapterRead).toHaveBeenCalledWith(fullPath)
        }
      }
    })

    it('should handle errors when reading multiple locale files', async () => {
      const languages = ['en', 'fr']
      const namespaces = ['translation', 'common']
      const error = new Error('File not found')

      // Mock the first call to succeed and the second to fail
      mockObsidianApi.adapterRead
        .mockResolvedValueOnce('{"key": "value"}')
        .mockRejectedValueOnce(error)
        // Add a case with invalid JSON to test logger.error
        .mockResolvedValueOnce('{invalid json}')
        .mockResolvedValueOnce('{"key": "value"}')

      const callback = vi.fn()

      backend.readMulti?.(languages, namespaces, callback)
      await new Promise((resolve) => setTimeout(resolve, 100))

      const expectedValue = { en: { translation: { key: 'value' } }, fr: { common: { key: 'value' } } }
      expect(callback).toHaveBeenCalledWith(null, expectedValue)
      expect(mockObsidianApi.adapterRead).toHaveBeenCalledTimes(4)
      // Verify that the logger's error method is called for the invalid JSON
      expect(mockLogger.error).toHaveBeenCalled()
    })
  })
})
