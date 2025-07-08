import { describe, expect, it } from 'vitest'

import { formatTime } from './format-time'

describe('formatTime', () => {
  const de = { locale: 'de-DE', timeZone: 'Europe/Berlin' }
  const en = { locale: 'en-US', timeZone: 'America/New_York' }
  const zh = { locale: 'zh-CN', timeZone: 'Asia/Shanghai' }
  const date = new Date('2024-01-01T12:30:00.000Z')

  it('应当正确格式化时间，默认使用中文地区设置', () => {
    expect(formatTime(date, zh)).toBe('20:30:00')
  })

  it('应当根据地区设置格式化时间', () => {
    expect(formatTime(date, de)).toBe('13:30:00')
    expect(formatTime(date, en)).toBe('7:30:00 AM')
  })

  it('应当处理 Intl.DateTimeFormatOptions', () => {
    expect(formatTime(date, { ...en, hour: '2-digit', minute: '2-digit' })).toBe(
      '07:30 AM',
    )
    expect(formatTime(date, { ...de, timeStyle: 'short' })).toBe('13:30')
  })
})