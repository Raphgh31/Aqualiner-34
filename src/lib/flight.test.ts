import { describe, expect, test } from 'vitest'
import { FLIGHT_STATE, isFlight } from './flight'

describe('isFlight', () => {
  test('« Projet suivant » agrandi vers une nouvelle page est un vol', () => {
    expect(isFlight('PUSH', FLIGHT_STATE)).toBe(true)
  })
  test('revenir sur cette page par l’historique n’en est pas un', () => {
    expect(isFlight('POP', FLIGHT_STATE)).toBe(false)
  })
  test('une navigation ordinaire n’en est pas un', () => {
    expect(isFlight('PUSH', null)).toBe(false)
    expect(isFlight('PUSH', { autre: true })).toBe(false)
  })
})
