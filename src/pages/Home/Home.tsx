import { useScroll } from 'motion/react'
import { useRef } from 'react'
import Nuancier from '../../components/Nuancier/Nuancier'
import WaterHero from '../../components/WaterHero/WaterHero'
import { useHeroTone } from '../../lib/layout'
import { useSeo } from '../../lib/seo'

export default function Home() {
  useHeroTone('sombre')
  useSeo({
    description:
      'Rénovation et construction de piscines en membrane armée soudée sur place, autour de Béziers, Agde, Pézenas et Narbonne. Atelier fondé en 2008 à Abeilhan.',
  })
  const sequence = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sequence, offset: ['start start', 'end end'] })
  return (
    <>
      <div ref={sequence} style={{ height: '260vh' }} data-sombre>
        <div style={{ position: 'sticky', top: 0, height: '100svh' }}>
          <WaterHero progress={scrollYProgress} />
        </div>
      </div>
      <section className="grille" style={{ paddingBlock: 'var(--e-section)' }}>
        <div style={{ gridColumn: '2 / -1' }}>
          <Nuancier />
        </div>
      </section>
    </>
  )
}
