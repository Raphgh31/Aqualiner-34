import { useEffect, useRef } from 'react'
import Img from '../../components/Img/Img'
import { getMedia } from '../../content/media'
import type { Project } from '../../content/projects'
import { useArrival } from '../../lib/arrival'
import { heroLayout } from '../../lib/heroRect'
import { useProjectTransition } from '../../lib/projectTransition'
import styles from './ProjectHero.module.css'

/**
 * Ouverture d'une fiche. Sur ordinateur, une photo assez grande occupe tout l'écran, le titre posé dessus ;
 * une petite photo reste encadrée à sa taille pour rester nette. Sur mobile, la photo garde ses proportions
 * sous l'en-tête, le titre en dessous. La géométrie suit `projectHeroRect`, cible de « Projet suivant ».
 */
export default function ProjectHero({ project }: { project: Project }) {
  const media = getMedia(project.cover)
  const plein = heroLayout(media) === 'plein'
  const image = useRef<HTMLImageElement>(null)
  const { land } = useProjectTransition()
  const { flight } = useArrival()

  // Arrivée par l'agrandissement : la photo agrandie s'efface quand la même photo est prête dessous.
  useEffect(() => {
    if (!flight) return
    const img = image.current
    let cancelled = false
    const ready = !img
      ? Promise.resolve()
      : img.complete
        ? img.decode()
        : new Promise<void>((resolve) => {
            img.addEventListener('load', () => resolve(), { once: true })
            img.addEventListener('error', () => resolve(), { once: true })
          })
    ready
      .catch(() => {})
      .then(() => {
        if (!cancelled) requestAnimationFrame(() => land())
      })
    return () => {
      cancelled = true
    }
  }, [flight, land])

  return (
    <section className={`profond ${styles.hero}`} data-plein={plein || undefined} aria-labelledby="projet-titre">
      <div className={styles.photo} style={{ aspectRatio: `${media.w} / ${media.h}` }}>
        <Img id={project.cover} sizes={plein ? '100vw' : `(min-width: 1024px) ${media.w}px, 100vw`} priority imgRef={image} />
      </div>
      <div className={styles.voile} aria-hidden="true" />
      <div className={styles.texte}>
        <h1 id="projet-titre" className={`titre-hero ${styles.titre}`}>
          {project.title}
        </h1>
        <p className={`chapo ${styles.resume}`}>{project.summary}</p>
      </div>
    </section>
  )
}
