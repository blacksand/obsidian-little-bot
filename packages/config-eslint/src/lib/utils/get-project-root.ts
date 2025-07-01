import path from 'node:path'
import { fileURLToPath } from 'node:url'

export function getProjectRoot(fileURL: string): string {
  return fileURL ? path.dirname(fileURLToPath(fileURL)) : ''
}
