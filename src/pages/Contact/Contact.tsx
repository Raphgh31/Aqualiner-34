import { useHeroTone } from '../../lib/layout'
import { useSeo } from '../../lib/seo'

export default function Contact() {
  useHeroTone('clair')
  useSeo({ title: 'Contact', description: 'Contact — Aqualiner 34.' })
  return (
    <section className="grille" style={{ paddingTop: 'calc(var(--hauteur-entete) + var(--e-9))', paddingBottom: 'var(--e-section)' }}>
      <h1 className="titre-page" style={{ gridColumn: '2 / -1' }}>Contact</h1>
    </section>
  )
}
