import { isDate } from 'remeda'

export interface FormatDateTimeOptions extends Intl.DateTimeFormatOptions {
  defaultValue?: string
  locale?: string
}

export function formatDateTime(
  value: Date | string | undefined | null,
  { defaultValue, locale, ...options }: FormatDateTimeOptions = {},
) {
  if (!value) {
    return defaultValue
  }

  const date = isDate(value) ? value : new Date(value)
  return date.toLocaleString(locale ?? 'zh-CN', options)
}
