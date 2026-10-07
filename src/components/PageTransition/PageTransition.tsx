import { motion } from 'motion/react'
import { useLayoutEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router'
import { useArrival } from '../../lib/arrival'
import { useScrollApi } from '../../lib/scroll'
import { scrollTarget } from '../../lib/scrollMemory'
import styles from './PageTransition.module.css'

const ease = [0.65, 0, 0.35, 1] as const

/**
 * Passage d'une page à l'autre : un rideau d'eau profonde monte depuis le bas, couvre l'écran,
 * puis se retire vers le haut sur la nouvelle page (0,7 s au total). Quand « Projet suivant » s'est
 * agrandi jusqu'à couvrir l'écran, la photo tient lieu de rideau : ni rideau ni fondu.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const { jump } = useScrollApi()
  const location = useLocation()
  const { navigationType, flight } = useArrival()
  // À l'arrivée sur le site (clé « default »), pas de rideau : le hero porte son propre moment.
  const arrival = location.key === 'default'

  // La nouvelle page arrive quand l'ancienne est couverte : on la place (en haut, ou là où on l'avait quittée).
  useLayoutEffect(() => {
    jump(scrollTarget(navigationType, location.key))
  }, [jump, navigationType, location.key])

  return (
    <motion.div initial={arrival || flight ? 'visible' : 'couvert'} animate="visible" exit="sortie" className={styles.page}>
      <motion.div
        className={styles.rideau}
        aria-hidden="true"
        variants={{
          couvert: { scaleY: 1, originY: 0 },
          visible: { scaleY: 0, originY: 0, transition: { duration: 0.42, ease, delay: 0.04 } },
          // `custom` vient d'AnimatePresence : « projet » quand la page suivante arrive par l'agrandissement.
          sortie: (kind: string | null) =>
            kind === 'projet' ? { scaleY: 0, transition: { duration: 0 } } : { scaleY: 1, originY: 1, transition: { duration: 0.28, ease } },
        }}
      />
      <motion.div
        variants={{
          couvert: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.3, delay: 0.1 } },
          sortie: { opacity: 1 },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
