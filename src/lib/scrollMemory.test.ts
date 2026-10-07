import { describe, expect, test } from 'vitest'
import { scrollTarget } from './scrollMemory'

describe('scrollTarget', () => {
  const memory = new Map([['retour', 1840]])
  test('une nouvelle page s’ouvre en haut', () => {
    expect(scrollTarget('PUSH', 'retour', memory)).toBe(0)
  })
  test('le retour arrière retrouve la position quittée', () => {
    expect(scrollTarget('POP', 'retour', memory)).toBe(1840)
  })
  test('un retour sans position connue s’ouvre en haut', () => {
    expect(scrollTarget('POP', 'inconnue', memory)).toBe(0)
  })
})
