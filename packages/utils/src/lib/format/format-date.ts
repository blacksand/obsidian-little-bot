import { isDate } from 'remeda'

export interface FormatDateTimeOptions extends Intl.DateTimeFormatOptions {
  defaultValue?: string
  locale?: string
}

export function formatDate(
  value: Date | string | undefined | null,
  { defaultValue, locale, ...options }: FormatDateTimeOptions = {},
) {
  if (!value) {
    return defaultValue
  }

  const date = isDate(value) ? value : new Date(value)
  return date.toLocaleDateString(locale ?? 'zh-CN', options)
}
