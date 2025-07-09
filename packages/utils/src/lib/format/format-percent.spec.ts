import { describe, expect, it } from 'vitest'

import { formatPercent } from './format-percent'

describe('formatPercent', () => {
  const de = { locale: 'de-DE' }
  const en = { locale: 'en-US' }
  const zh = { locale: 'zh-CN' }

  it('应当正确格式化百分比，默认使用中文地区设置', () => {
    expect(formatPercent(0.5)).toBe('50%')
    expect(formatPercent(0.5, zh)).toBe('50%')
  })

  it('应当根据地区设置格式化百分比', () => {
    // non-breaking space
    expect(formatPercent(0.5, de)).toBe('50 %')
    expect(formatPercent(0.5, en)).toBe('50%')
  })

  it('应当处理小数', () => {
    expect(formatPercent(0.123_45, { ...en, maximumFractionDigits: 2 })).toBe(
      '12.35%',
    )
    expect(formatPercent(0.123_45, { ...de, maximumFractionDigits: 2 })).toBe(
      '12,35 %',
    )
  })

  it('应当处理负数', () => {
    expect(formatPercent(-0.5, en)).toBe('-50%')
  })
})
