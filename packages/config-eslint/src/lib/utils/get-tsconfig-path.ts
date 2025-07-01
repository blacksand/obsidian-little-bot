import fs from 'node:fs'
import path from 'node:path'

export function getTsconfigPath(projectRoot: string | undefined): string | undefined {
  if (!projectRoot) {
    return undefined
  }

  const tsconfigPath = path.join(projectRoot, 'tsconfig.json')
  if (fs.existsSync(tsconfigPath)) {
    return tsconfigPath
  }

  return undefined
}
