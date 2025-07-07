import type { BackendModule } from 'i18next'

import type { ObsidianApi } from '@peaks/core'

import type { ObsidianI18nBackendOptions } from './obsidian-i18n-backend'
import { ObsidianI18nBackend } from './obsidian-i18n-backend'

const basePath = '/mock/base/path'

// Mock the ObsidianApi
const mockObsidianApi = {
  adapterRead: vi.fn(),
  getLittleBotPath: () => basePath,
  // @ts-expect-error types
} satisfies ObsidianApi

describe('obsidianI18nBackend', () => {
  let backend: BackendModule<ObsidianI18nBackendOptions>
  const options: ObsidianI18nBackendOptions = {
    loadPath: 'locals/{{lng}}/{{ns}}.json',
  }

  beforeEach(() => {
    backend = new ObsidianI18nBackend(mockObsidianApi as never)
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
      await Promise.resolve()

      expect(callback).toHaveBeenCalledWith(new Error(`Failed to parse ${fullPath}`), null)
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

      const callback = vi.fn()

      backend.readMulti?.(languages, namespaces, callback)
      await new Promise((resolve) => setTimeout(resolve, 100))

      expect(callback).toHaveBeenCalledWith(null, { en: { translation: { key: 'value' } } })
      expect(mockObsidianApi.adapterRead).toHaveBeenCalledTimes(4)
    })
  })
})
