import { describe, expect, it } from 'vitest'

import { formatNumber } from './format-number'

describe('formatNumber', () => {
  const de = { locale: 'de-DE' }
  const en = { locale: 'en-US' }
  const zh = { locale: 'zh-CN' }

  it('应当正确格式化数字，默认使用中文地区设置', () => {
    expect(formatNumber(1_234_567)).toBe('1,234,567')
    expect(formatNumber(1_234_567, zh)).toBe('1,234,567')
  })

  it('应当根据地区设置格式化数字', () => {
    expect(formatNumber(1_234_567, de)).toBe('1.234.567')
    expect(formatNumber(1_234_567, en)).toBe('1,234,567')
  })

  it('应当处理小数点', () => {
    expect(formatNumber(1234.5678, en)).toBe('1,234.568')
    expect(formatNumber(1234.5678, de)).toBe('1.234,568')
  })

  it('当值为 null 或 undefined 或 NaN 时应当返回 defaultValue', () => {
    expect(formatNumber(null)).toBeUndefined()
    expect(formatNumber(undefined)).toBeUndefined()
    expect(formatNumber(Number.NaN)).toBeUndefined()
    expect(formatNumber(null, { defaultValue: 'N/A' })).toBe('N/A')
    expect(formatNumber(undefined, { defaultValue: 'N/A' })).toBe('N/A')
    expect(formatNumber(Number.NaN, { defaultValue: 'N/A' })).toBe('N/A')
  })

  it('应当处理 Intl.NumberFormatOptions', () => {
    expect(formatNumber(1234.5, { ...en, currency: 'USD', style: 'currency' })).toBe('$1,234.50')
    // non-breaking space
    expect(formatNumber(1234.5, { ...de, currency: 'EUR', style: 'currency' })).toBe('1.234,50 €')
    expect(formatNumber(1234.5, { ...zh, currency: 'CNY', style: 'currency' })).toBe('¥1,234.50')
  })

  it('应当正确处理小数位数', () => {
    expect(formatNumber(123.456, { ...en, minimumFractionDigits: 4 })).toBe('123.4560')
    expect(formatNumber(123.456, { ...en, maximumFractionDigits: 2 })).toBe('123.46')
  })
})
