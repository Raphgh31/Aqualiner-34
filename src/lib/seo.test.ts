import { expect, test } from 'vitest'
import { pageTitle } from './seo'

test("le titre de l'accueil décrit l'activité", () => {
  expect(pageTitle()).toBe('Aqualiner 34 — Rénovation et construction de piscines, Hérault')
})

test('les autres pages portent leur nom avant la marque', () => {
  expect(pageTitle('Réalisations')).toBe('Réalisations — Aqualiner 34')
})
