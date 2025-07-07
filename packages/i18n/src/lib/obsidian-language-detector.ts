import type { LanguageDetectorModule } from 'i18next'
import { getLanguage } from 'obsidian'

export class ObsidianLanguageDetector implements LanguageDetectorModule {
  readonly type = 'languageDetector'

  detect(): string {
    return getLanguage()
  }
}
