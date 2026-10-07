import { describe, expect, test } from 'vitest'
import { buildMailto, type ContactData } from './mailto'

const demande: ContactData = {
  projet: 'Rénovation',
  forme: 'Rectangulaire',
  revetement: 'Liner',
  dimensions: '8 × 4 m',
  commune: 'Pézenas',
  nom: 'Camille Martin',
  telephone: '06 12 34 56 78',
  email: 'camille@example.org',
  message: 'Fuite côté escalier.\nR&D ? #1',
}

function parts(url: string) {
  const [address, query] = url.split('?')
  const params = Object.fromEntries(query.split('&').map((pair) => pair.split('=')))
  return { address, subject: decodeURIComponent(params.subject), body: decodeURIComponent(params.body) }
}

describe('buildMailto', () => {
  test('adresse la demande à l’entreprise', () => {
    expect(parts(buildMailto(demande, 'contact@aqualiner34.fr')).address).toBe('mailto:contact@aqualiner34.fr')
  })
  test('résume le projet et la commune dans le sujet', () => {
    expect(parts(buildMailto(demande, 'contact@aqualiner34.fr')).subject).toBe('Demande de projet — Rénovation — Pézenas')
  })
  test('encode les caractères réservés et les retours à la ligne sans rien perdre', () => {
    const url = buildMailto(demande, 'contact@aqualiner34.fr')
    expect(url).not.toContain('#')
    expect(url).not.toContain('\n')
    const { body } = parts(url)
    expect(body).toContain('Fuite côté escalier.\nR&D ? #1')
    expect(body).toContain('Commune : Pézenas')
    expect(body).toContain('Téléphone : 06 12 34 56 78')
  })
  test('omet les lignes laissées vides', () => {
    const { body } = parts(buildMailto({ projet: 'Construction', commune: 'Agde', nom: 'Sam', email: 'sam@example.org' }, 'contact@aqualiner34.fr'))
    expect(body).not.toContain('Téléphone')
    expect(body).not.toContain('Bassin')
    expect(body).toContain('E-mail : sam@example.org')
  })
})
