import { getJestProjectsAsync } from '@nx/jest'
import type { Config } from 'jest'

async function config(): Promise<Config> {
  return {
    projects: await getJestProjectsAsync(),
  }
}

export default config
