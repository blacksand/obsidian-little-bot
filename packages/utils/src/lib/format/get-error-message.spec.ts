import { describe, expect, it } from 'vitest'

import { getErrorMessage } from './get-error-message'

describe('getErrorMessage', () => {
  it('应当从字符串中返回错误消息', () => {
    expect(getErrorMessage('这是一个错误')).toBe('这是一个错误')
  })

  it('应当从 Error 对象中提取错误消息', () => {
    expect(getErrorMessage(new Error('这是一个错误'))).toBe('这是一个错误')
  })

  it('应当从带有 message 属性的对象中提取错误消息', () => {
    expect(getErrorMessage({ message: '这是一个错误' })).toBe('这是一个错误')
  })

  it('当无法提取消息时应当返回默认消息', () => {
    expect(getErrorMessage(null)).toBe('unknown error')
    expect(getErrorMessage(undefined)).toBe('unknown error')
    expect(getErrorMessage({})).toBe('unknown error')
    expect(getErrorMessage(123)).toBe('unknown error')
  })

  it('当无法提取消息时应当返回自定义默认消息', () => {
    expect(getErrorMessage(null, '自定义错误')).toBe('自定义错误')
    expect(getErrorMessage(undefined, '自定义错误')).toBe('自定义错误')
    expect(getErrorMessage({}, '自定义错误')).toBe('自定义错误')
    expect(getErrorMessage(123, '自定义错误')).toBe('自定义错误')
  })
})
