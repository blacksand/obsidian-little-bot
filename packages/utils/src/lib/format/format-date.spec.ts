import { describe, expect, it } from 'vitest'

import { formatDate } from './format-date'

describe('formatDate', () => {
  const de = { locale: 'de-DE' }
  const en = { locale: 'en-US' }
  const zh = { locale: 'zh-CN' }
  const date = new Date('2024-01-01T12:00:00.000Z')

  it('应当正确格式化日期，默认使用中文地区设置', () => {
    expect(formatDate(date)).toBe('2024/1/1')
    expect(formatDate(date, zh)).toBe('2024/1/1')
  })

  it('应当根据地区设置格式化日期', () => {
    expect(formatDate(date, de)).toBe('1.1.2024')
    expect(formatDate(date, en)).toBe('1/1/2024')
  })

  it('应当处理字符串日期', () => {
    expect(formatDate('2024-01-01T12:00:00.000Z', en)).toBe('1/1/2024')
  })

  it('当值为 null 或 undefined 时应当返回 defaultValue', () => {
    expect(formatDate(null)).toBeUndefined()
    expect(formatDate(undefined)).toBeUndefined()
    expect(formatDate(null, { defaultValue: 'N/A' })).toBe('N/A')
    expect(formatDate(undefined, { defaultValue: 'N/A' })).toBe('N/A')
  })

  it('应当处理 Intl.DateTimeFormatOptions', () => {
    expect(formatDate(date, { ...en, day: 'numeric', month: 'long' })).toBe('January 1')
    expect(formatDate(date, { ...de, weekday: 'long' })).toBe('Montag')
  })
})
