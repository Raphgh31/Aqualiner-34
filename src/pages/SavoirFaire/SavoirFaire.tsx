import { useHeroTone } from '../../lib/layout'
import { useSeo } from '../../lib/seo'

export default function SavoirFaire() {
  useHeroTone('clair')
  useSeo({ title: 'Savoir-faire', description: 'Savoir-faire — Aqualiner 34.' })
  return (
    <section className="grille" style={{ paddingTop: 'calc(var(--hauteur-entete) + var(--e-9))', paddingBottom: 'var(--e-section)' }}>
      <h1 className="titre-page" style={{ gridColumn: '2 / -1' }}>Savoir-faire</h1>
    </section>
  )
}
