import { expect, test } from 'vitest'
import { formatDepth } from './depth'

test('affiche une profondeur en mètres, à la française', () => {
  expect(formatDepth(0)).toBe('0,00 m')
  expect(formatDepth(1.234)).toBe('1,23 m')
  expect(formatDepth(2.2)).toBe('2,20 m')
})

test('les graduations sont courtes et sans unité', () => {
  expect(formatDepth(0.5, false)).toBe('0,5')
  expect(formatDepth(2, false)).toBe('2,0')
})

test('une valeur négative est ramenée à la surface', () => {
  expect(formatDepth(-0.01)).toBe('0,00 m')
})
