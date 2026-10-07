import { describe, expect, test } from 'vitest'
import { nextScale } from './quality'

describe('nextScale', () => {
  test('un rendu fluide garde sa définition', () => {
    expect(nextScale(16, 1)).toBe(1)
  })
  test('un rendu trop lent baisse la définition par paliers', () => {
    expect(nextScale(60, 1)).toBe(0.75)
    expect(nextScale(60, 0.75)).toBe(0.5)
  })
  test('au dernier palier, l’eau se fige plutôt que de ralentir la page', () => {
    expect(nextScale(60, 0.5)).toBeNull()
  })
  test('un rendu très lent (rendu logiciel) fige l’eau sans attendre les paliers', () => {
    expect(nextScale(180, 1)).toBeNull()
  })
})
