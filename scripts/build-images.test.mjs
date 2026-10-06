import { describe, expect, test } from 'vitest'
import { exifDate, widthsFor } from './build-images.mjs'

describe('widthsFor', () => {
  test("garde les largeurs inférieures à la source et ajoute la largeur source", () => {
    expect(widthsFor('plein', 2000)).toEqual([640, 1024, 1600, 2000])
  })
  test("n'agrandit jamais une petite image", () => {
    expect(widthsFor('natif', 500)).toEqual([500])
    expect(widthsFor('large', 750)).toEqual([640, 750])
  })
  test('garde le jeu complet pour une grande source', () => {
    expect(widthsFor('plein', 4032)).toEqual([640, 1024, 1600, 2400])
  })
})

describe('exifDate', () => {
  test('renvoie la date la plus ancienne au format ISO', () => {
    const exif = Buffer.from('xx2022:04:08 13:49:16\u00002022:04:08 13:49:10\u0000yy', 'latin1')
    expect(exifDate(exif)).toBe('2022-04-08')
  })
  test('renvoie null sans EXIF ou sans date', () => {
    expect(exifDate(undefined)).toBeNull()
    expect(exifDate(Buffer.from('rien ici'))).toBeNull()
  })
})
