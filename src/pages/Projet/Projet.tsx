import { useHeroTone } from '../../lib/layout'
import { useSeo } from '../../lib/seo'

export default function Projet() {
  useHeroTone('clair')
  useSeo({ title: 'Projet', description: 'Projet — Aqualiner 34.' })
  return (
    <section className="grille" style={{ paddingTop: 'calc(var(--hauteur-entete) + var(--e-9))', paddingBottom: 'var(--e-section)' }}>
      <h1 className="titre-page" style={{ gridColumn: '2 / -1' }}>Projet</h1>
    </section>
  )
}
