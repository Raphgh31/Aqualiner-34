import { describe, expect, test } from 'vitest'
import { allMedia, getMedia, type MediaId } from './media'

describe('manifeste des images', () => {
  test('contient des images', () => {
    expect(allMedia.length).toBeGreaterThan(20)
  })

  test.each(allMedia.map((m) => [m.id, m] as const))('%s a des dimensions et des largeurs valides', (_id, media) => {
    expect(media.w).toBeGreaterThan(0)
    expect(media.h).toBeGreaterThan(0)
    expect(media.widths.length).toBeGreaterThan(0)
    for (const width of media.widths) expect(width).toBeLessThanOrEqual(media.w)
    expect(media.color).toMatch(/^#[0-9a-f]{6}$/)
  })

  test.each(allMedia.map((m) => [m.id, m.alt] as const))('%s a un texte alternatif rédigé', (_id, alt) => {
    expect(alt.trim().length).toBeGreaterThan(10)
    expect(alt).not.toMatch(/\.(jpe?g|png|webp)$/i)
  })

  test('getMedia refuse un identifiant inconnu', () => {
    expect(() => getMedia('inconnu' as MediaId)).toThrow(/inconnu/)
  })
})
