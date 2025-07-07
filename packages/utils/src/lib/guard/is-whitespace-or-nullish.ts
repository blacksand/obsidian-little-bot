import { isWhitespace } from './is-whitespace'

export function isWhitespaceOrNullish(value: string | null | undefined) {
  return value == null || isWhitespace(value)
}
