import { describe, expect, it } from 'vitest'

import { formatDateTime } from './format-date-time'

describe('formatDateTime', () => {
  const de = { locale: 'de-DE', timeZone: 'Europe/Berlin' }
  const en = { locale: 'en-US', timeZone: 'America/New_York' }
  const zh = { locale: 'zh-CN', timeZone: 'Asia/Shanghai' }
  const date = new Date('2024-01-01T12:30:00.000Z')

  it('应当正确格式化日期时间，默认使用中文地区设置', () => {
    // Default locale is zh-CN, but timezone is system's default.
    // To make test deterministic, we specify timezone.
    expect(formatDateTime(date, zh)).toBe('2024/1/1 20:30:00')
  })

  it('应当根据地区设置格式化日期时间', () => {
    expect(formatDateTime(date, de)).toBe('1.1.2024, 13:30:00')
    expect(formatDateTime(date, en)).toBe('1/1/2024, 7:30:00 AM')
  })

  it('应当处理字符串日期', () => {
    expect(formatDateTime('2024-01-01T12:30:00.000Z', en)).toBe(
      '1/1/2024, 7:30:00 AM',
    )
  })

  it('当值为 null 或 undefined 时应当返回 defaultValue', () => {
    expect(formatDateTime(null)).toBeUndefined()
    expect(formatDateTime(undefined)).toBeUndefined()
    expect(formatDateTime(null, { defaultValue: 'N/A' })).toBe('N/A')
    expect(formatDateTime(undefined, { defaultValue: 'N/A' })).toBe('N/A')
  })

  it('应当处理 Intl.DateTimeFormatOptions', () => {
    expect(
      formatDateTime(date, { ...en, hour: '2-digit', minute: '2-digit' }),
    ).toBe('07:30 AM')
    expect(
      formatDateTime(date, { ...de, dateStyle: 'full', timeStyle: 'long' }),
    ).toBe('Montag, 1. Januar 2024 um 13:30:00 MEZ')
  })
})