import { useRef, type MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { getMedia } from '../../content/media'
import type { Project } from '../../content/projects'
import { FLIGHT_STATE } from '../../lib/flight'
import { DESKTOP, heroLayout, projectHeroRect } from '../../lib/heroRect'
import { useProjectTransition } from '../../lib/projectTransition'
import { useDesktop, useReducedMotion } from '../../lib/useMediaQuery'
import { cursorLabel } from '../CursorLabel/CursorLabel'
import Img from '../Img/Img'
import styles from './NextProject.module.css'

/**
 * Fin de fiche : le projet suivant. Sur ordinateur, son cadre est une fenêtre ouverte sur la photo posée
 * en plein écran derrière la page ; au clic, la fenêtre s'ouvre jusqu'à devenir le hero de la fiche suivante.
 */
export default function NextProject({ project }: { project: Project }) {
  const media = getMedia(project.cover)
  const desktop = useDesktop()
  const reduced = useReducedMotion()
  const navigate = useNavigate()
  const { fly, flying } = useProjectTransition()
  const frame = useRef<HTMLDivElement>(null)
  const to = `/realisations/${project.slug}`
  const plein = heroLayout(media) === 'plein'

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (flying) {
      event.preventDefault()
      return
    }
    // Nouvel onglet, animations réduites : navigation ordinaire.
    if (reduced || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hauteur-entete')) || 72
    const target = projectHeroRect(media, { width: window.innerWidth, height: window.innerHeight }, header)
    const box = frame.current?.getBoundingClientRect()
    if (!target || !box) return
    event.preventDefault()
    fly(
      {
        image: project.cover,
        from: { top: box.top, left: box.left, width: box.width, height: box.height },
        to: target,
        mode: window.innerWidth >= DESKTOP ? 'fenetre' : 'deplacement',
      },
      () => navigate(to, { state: FLIGHT_STATE }),
    )
  }

  return (
    <section className={`profond ${styles.suivant}`} aria-labelledby="suivant-titre">
      <Link to={to} className={styles.lien} onClick={onClick} {...cursorLabel('Projet suivant')}>
        <div
          ref={frame}
          className={styles.cadre}
          data-fenetre={(desktop && plein && !reduced) || undefined}
          data-petite={!plein || undefined}
          style={{ aspectRatio: `${media.w} / ${media.h}` }}
        >
          <div className={styles.photo}>
            <Img id={project.cover} sizes={plein ? '100vw' : `(min-width: 1024px) ${media.w}px, 100vw`} alt="" />
          </div>
          <span className={styles.plaque}>Projet suivant</span>
        </div>
        <div className={styles.texte}>
          <h2 id="suivant-titre" className={`titre-page ${styles.titre}`}>
            {project.title}
          </h2>
          <p className={`chapo ${styles.resume}`}>{project.summary}</p>
        </div>
      </Link>
    </section>
  )
}
