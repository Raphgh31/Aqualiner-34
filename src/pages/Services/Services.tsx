import { useHeroTone } from '../../lib/layout'
import { useSeo } from '../../lib/seo'

export default function Services() {
  useHeroTone('clair')
  useSeo({ title: 'Services', description: 'Services — Aqualiner 34.' })
  return (
    <section className="grille" style={{ paddingTop: 'calc(var(--hauteur-entete) + var(--e-9))', paddingBottom: 'var(--e-section)' }}>
      <h1 className="titre-page" style={{ gridColumn: '2 / -1' }}>Services</h1>
    </section>
  )
}
