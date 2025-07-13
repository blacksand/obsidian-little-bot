import '@vitest/browser/providers/playwright'
import type { ViteUserConfig } from 'vitest/config'

export function testingConfig(configFileUrl: string): ViteUserConfig

export { mergeConfig } from 'vitest/config'
