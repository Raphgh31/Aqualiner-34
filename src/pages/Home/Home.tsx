import Img from '../../components/Img/Img'
import { useHeroTone } from '../../lib/layout'
import { useSeo } from '../../lib/seo'

export default function Home() {
  useHeroTone('sombre')
  useSeo({
    description:
      'Rénovation et construction de piscines en membrane armée soudée sur place, autour de Béziers, Agde, Pézenas et Narbonne. Atelier fondé en 2008 à Abeilhan.',
  })
  return (
    <section style={{ height: '100svh', position: 'relative' }} data-sombre>
      <Img id="croix-occitane" sizes="100vw" priority />
      <h1 className="titre-hero" style={{ position: 'absolute', left: 'var(--marge)', bottom: 'var(--e-8)', color: 'var(--email)' }}>
        De fond en comble.
      </h1>
    </section>
  )
}
