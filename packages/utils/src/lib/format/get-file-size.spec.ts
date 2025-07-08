import { describe, expect, it } from 'vitest'

import { getFileSize } from './get-file-size'

describe('getFileSize', () => {
  it('当大小为 null 或 undefined 时应当返回空字符串', () => {
    expect(getFileSize(null)).toBe('')
    expect(getFileSize(undefined)).toBe('')
  })

  it('应当将小于 512B 的大小格式化为 B', () => {
    expect(getFileSize(0)).toBe('0B')
    expect(getFileSize(100)).toBe('100B')
    expect(getFileSize(511)).toBe('511B')
  })

  it('应当将 512B 到 524287B 之间的大小格式化为 K', () => {
    expect(getFileSize(512)).toBe('0.5K')
    expect(getFileSize(1024)).toBe('1.0K')
    expect(getFileSize(10000)).toBe('9.8K')
    expect(getFileSize(524287)).toBe('512.0K')
  })

  it('应当将大于等于 524288B 的大小格式化为 M', () => {
    expect(getFileSize(524288)).toBe('0.5M')
    expect(getFileSize(1048576)).toBe('1.0M')
    expect(getFileSize(10000000)).toBe('9.5M')
  })
})
