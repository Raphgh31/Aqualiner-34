import { motion } from 'motion/react'
import type { MediaId } from '../../content/media'
import type { Rect } from '../../lib/heroRect'
import Img from '../Img/Img'
import styles from './Flight.module.css'

export type FlightPlan = {
  image: MediaId
  from: Rect
  to: Rect
  /**
   * « fenetre » (ordinateur) : la photo couvre déjà l'écran derrière un cadre, seul le cadre s'ouvre.
   * « deplacement » (mobile) : la photo, à ses proportions, glisse jusqu'à sa place sous l'en-tête.
   */
  mode: 'fenetre' | 'deplacement'
}

const ease = [0.65, 0, 0.35, 1] as const

function inset(rect: Rect) {
  const right = window.innerWidth - (rect.left + rect.width)
  const bottom = window.innerHeight - (rect.top + rect.height)
  return `inset(${rect.top}px ${right}px ${bottom}px ${rect.left}px)`
}

const box = (rect: Rect) => ({ top: rect.top, left: rect.left, width: rect.width, height: rect.height })

/** La photo du projet suivant, en vol entre le bas d'une fiche et le hero de la suivante. */
export default function Flight({ plan, landing, onArrived, onDone }: { plan: FlightPlan; landing: boolean; onArrived: () => void; onDone: () => void }) {
  const fenetre = plan.mode === 'fenetre'
  return (
    <motion.div
      className={fenetre ? styles.fenetre : styles.deplacement}
      aria-hidden="true"
      initial={fenetre ? { clipPath: inset(plan.from), opacity: 1 } : { ...box(plan.from), opacity: 1 }}
      animate={
        landing
          ? { opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } }
          : fenetre
            ? { clipPath: inset(plan.to), transition: { duration: 0.85, ease } }
            : { ...box(plan.to), transition: { duration: 0.7, ease } }
      }
      onAnimationComplete={() => (landing ? onDone() : onArrived())}
    >
      <Img id={plan.image} sizes="100vw" priority alt="" />
    </motion.div>
  )
}
