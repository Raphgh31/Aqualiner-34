import { useHeroTone } from '../../lib/layout'
import { useSeo } from '../../lib/seo'
import Atelier from './sections/Atelier'
import Couleur from './sections/Couleur'
import Geste from './sections/Geste'
import Hero from './sections/Hero'
import Manifeste from './sections/Manifeste'
import Renover from './sections/Renover'
import Selection from './sections/Selection'
import Signature from './sections/Signature'

/**
 * L'accueil se lit comme une plongée : la surface (l'eau), la promesse (rénover), la main (le geste),
 * les bassins, la signature, la couleur, puis les gens. Le pied de page est le fond.
 */
export default function Home() {
  useHeroTone('sombre')
  useSeo({
    description:
      'Rénovation et construction de piscines en membrane armée soudée sur place, autour de Béziers, Agde, Pézenas et Narbonne. Atelier fondé en 2008 à Abeilhan.',
  })
  return (
    <>
      <Hero />
      <Manifeste />
      <Renover />
      <Geste />
      <Selection />
      <Signature />
      <Couleur />
      <Atelier />
    </>
  )
}
