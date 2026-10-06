import { describe, expect, test } from 'vitest'
import { company } from './company'
import { faq } from './faq'
import { finishes } from './finishes'
import { formatMonthYear } from './format'
import { allMedia } from './media'
import { motifs } from './motifs'
import { getNextProject, getProject, projectMedia, projects } from './projects'
import { services } from './services'
import { timeline } from './timeline'

const mediaIds = new Set<string>(allMedia.map((m) => m.id))

describe('projets', () => {
  test('les slugs sont uniques et lisibles', () => {
    const slugs = projects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  })

  test('le projet suivant du dernier est le premier', () => {
    const last = projects[projects.length - 1]
    expect(getNextProject(last.slug).slug).toBe(projects[0].slug)
    expect(getNextProject(projects[0].slug).slug).toBe(projects[1].slug)
  })

  test('un slug inconnu ne renvoie aucun projet', () => {
    expect(getProject('inconnu')).toBeUndefined()
  })

  test('chaque image citée par un projet existe', () => {
    for (const project of projects) {
      for (const id of projectMedia(project)) expect(mediaIds.has(id), `${project.slug} → ${id}`).toBe(true)
    }
  })

  test('les annotations restent dans le cadre de leur image', () => {
    for (const project of projects) {
      for (const block of project.blocks) {
        if (block.kind !== 'annote') continue
        for (const note of block.notes) {
          expect(note.x).toBeGreaterThanOrEqual(0)
          expect(note.x).toBeLessThanOrEqual(1)
          expect(note.y).toBeGreaterThanOrEqual(0)
          expect(note.y).toBeLessThanOrEqual(1)
        }
      }
    }
  })
})

describe('contenus', () => {
  const everything = JSON.stringify({ company, projects, services, faq, finishes, motifs, timeline })

  test("aucun texte provisoire ne subsiste", () => {
    expect(everything).not.toMatch(/TODO|lorem|ipsum|\bXX\b|TBD/i)
  })

  test("les images citées hors projets existent", () => {
    const cited = [...everything.matchAll(/"(?:image|photo|texture|textureWet|cover)":"([a-z0-9-]+)"/g)].map((m) => m[1])
    expect(cited.length).toBeGreaterThan(10)
    for (const id of cited) expect(mediaIds.has(id), id).toBe(true)
  })

  test('le téléphone est cohérent', () => {
    expect(company.phone.href).toBe('tel:+33622856095')
    expect(company.phone.display).toBe('06 22 85 60 95')
  })
})

describe('formatMonthYear', () => {
  test('écrit le mois et l’année en français', () => {
    expect(formatMonthYear('2018-07-31')).toBe('juillet 2018')
    expect(formatMonthYear('2022-04-08')).toBe('avril 2022')
  })
  test('renvoie null sans date', () => {
    expect(formatMonthYear(null)).toBeNull()
  })
})
