import { describe, expect, test } from 'vitest'
import { heroLayout, projectHeroRect } from './heroRect'

const grande = { w: 4032, h: 2268, widths: [640, 1024, 1600, 2400] }
const petite = { w: 750, h: 500, widths: [640] }

describe('heroLayout', () => {
  test('une photo assez grande occupe tout l’écran', () => {
    expect(heroLayout(grande)).toBe('plein')
  })
  test('une petite photo reste encadrée', () => {
    expect(heroLayout(petite)).toBe('cadre')
  })
})

describe('projectHeroRect', () => {
  test('sur ordinateur, le hero plein couvre la fenêtre', () => {
    expect(projectHeroRect(grande, { width: 1440, height: 900 }, 72)).toEqual({ top: 0, left: 0, width: 1440, height: 900 })
  })
  test('sur ordinateur, une petite photo ne s’agrandit pas', () => {
    expect(projectHeroRect(petite, { width: 1440, height: 900 }, 72)).toBeNull()
  })
  test('sur mobile, la photo garde ses proportions sous l’en-tête', () => {
    expect(projectHeroRect(grande, { width: 390, height: 844 }, 64)).toEqual({ top: 64, left: 0, width: 390, height: 219 })
  })
})
