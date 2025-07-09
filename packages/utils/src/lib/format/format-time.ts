export interface FormatDateTimeOptions extends Intl.DateTimeFormatOptions {
  defaultValue?: string
  locale?: string
}

export function formatTime(
  value: Date,
  { locale, ...options }: FormatDateTimeOptions = {},
) {
  return value.toLocaleTimeString(locale ?? 'zh-CN', options)
}
