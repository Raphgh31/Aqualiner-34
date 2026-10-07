import { motion, useMotionValue, useSpring } from 'motion/react'
import { useState, type PointerEvent } from 'react'
import { Link } from 'react-router'
import { formatMonthYear } from '../../content/format'
import type { Project } from '../../content/projects'
import { useDesktop, useFinePointer, useReducedMotion } from '../../lib/useMediaQuery'
import Img from '../Img/Img'
import styles from './ProjectIndex.module.css'

const ease = [0.22, 1, 0.36, 1] as const
const LARGEUR = 380

/**
 * Index des réalisations, comme celui d'un cabinet d'architectes : une ligne par bassin. Sur ordinateur,
 * la photo du projet survolé suit le curseur et les autres lignes s'effacent ; ailleurs, chaque ligne a sa vignette.
 */
export default function ProjectIndex({ projects }: { projects: Project[] }) {
  const fine = useFinePointer()
  const desktop = useDesktop()
  const preview = fine && desktop
  const reduced = useReducedMotion()
  const [active, setActive] = useState<number | null>(null)
  // Les photos de l'aperçu ne se chargent qu'à l'approche de la liste.
  const [armed, setArmed] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 30, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 260, damping: 30, mass: 0.6 })

  const follow = (event: PointerEvent) => {
    // L'aperçu passe à gauche du curseur quand il déborderait à droite.
    const right = event.clientX + 40 + LARGEUR > window.innerWidth - 24
    x.set(right ? event.clientX - 40 - LARGEUR : event.clientX + 40)
    y.set(event.clientY)
  }

  return (
    <div
      className={styles.index}
      onPointerEnter={(event) => {
        setArmed(true)
        follow(event)
        if (!reduced) {
          springX.jump(x.get())
          springY.jump(y.get())
        }
      }}
      onPointerMove={follow}
      onPointerLeave={() => setActive(null)}
    >
      <ul className={styles.liste}>
        {projects.map((project, index) => {
          const date = formatMonthYear(project.photographed)
          return (
            <li key={project.slug} className={styles.item}>
              <Link
                to={`/realisations/${project.slug}`}
                className={styles.ligne}
                onPointerEnter={() => setActive(index)}
                onFocus={() => setActive(null)}
              >
                <span className={styles.vignette} aria-hidden="true">
                  <Img id={project.cover} sizes="40vw" alt="" />
                </span>
                <span className={styles.titre}>{project.title}</span>
                <span className={styles.details}>
                  {project.nature && <span className={styles.nature}>{project.nature}</span>}
                  {project.finish && <span>{project.finish}</span>}
                </span>
                <span className={styles.date}>{date && <time dateTime={project.photographed ?? undefined}>{date}</time>}</span>
              </Link>
            </li>
          )
        })}
      </ul>

      {preview && armed && (
        <motion.div className={styles.apercu} style={{ x: reduced ? x : springX, y: reduced ? y : springY, width: LARGEUR }} aria-hidden="true">
          <motion.div
            className={styles.cadre}
            initial={false}
            animate={{ opacity: active === null ? 0 : 1, scale: active === null ? 0.94 : 1 }}
            transition={{ duration: 0.35, ease }}
          >
            {projects.map((project, index) => (
              <div key={project.slug} className={styles.image} data-actif={index === active || undefined}>
                <Img id={project.cover} sizes={`${LARGEUR}px`} alt="" />
              </div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
