import { describe, expect, test } from 'vitest'
import { wrapIndex } from './gallery'

describe('wrapIndex', () => {
  test('après la dernière photo vient la première', () => {
    expect(wrapIndex(25, 25)).toBe(0)
  })
  test('avant la première photo vient la dernière', () => {
    expect(wrapIndex(-1, 25)).toBe(24)
  })
  test('un index valide ne change pas', () => {
    expect(wrapIndex(3, 25)).toBe(3)
  })
})
