import { describe, expect } from 'vitest'

import { add } from './add.js'

describe('add', () => {
  it('should return 2 + 2', () => {
    const result = add(1, 1)
    expect(result).toBe(2)
  })
})
