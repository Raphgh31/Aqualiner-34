import { expect, test } from 'vitest'
import { heroState } from './heroState'

test('au repos : la photo entière, cadre ouvert, premier bassin', () => {
  expect(heroState(0)).toEqual({ zoom0: 1, zoom1: 1.35, mix: 0, frame: 0 })
})

test('à mi-course : la caméra est au plus près de la croix et le cadre resserré', () => {
  const state = heroState(0.45)
  expect(state.zoom0).toBeGreaterThan(2.3)
  expect(state.frame).toBe(1)
})

test('en fin de course : la vue s’ouvre sur le second plan', () => {
  expect(heroState(1)).toEqual({ zoom0: 2.5, zoom1: 1, mix: 1, frame: 0 })
})

test('le zoom avance sans jamais reculer pendant la plongée', () => {
  let previous = 0
  for (let p = 0; p <= 0.52; p += 0.02) {
    const { zoom0 } = heroState(p)
    expect(zoom0).toBeGreaterThanOrEqual(previous)
    previous = zoom0
  }
})

test('une progression hors bornes est ramenée dans [0, 1]', () => {
  expect(heroState(-0.4)).toEqual(heroState(0))
  expect(heroState(3)).toEqual(heroState(1))
})
