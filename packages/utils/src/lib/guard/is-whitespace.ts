export function isWhitespace(value: string) {
  return value.replaceAll(/\s*/g, '').length === 0
}
