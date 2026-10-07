import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { useFinePointer, useReducedMotion } from '../../lib/useMediaQuery'
import styles from './CursorLabel.module.css'

/** Props à poser sur un élément pour que l'étiquette accompagne le curseur au survol. */
export function cursorLabel(label: string) {
  return { 'data-curseur': label }
}

/** Étiquette discrète qui suit le curseur sur les médias interactifs ; le curseur système reste visible. */
export default function CursorLabel() {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const [label, setLabel] = useState<string | null>(null)
  const { pathname } = useLocation()
  // Un changement de page retire l'étiquette ; le prochain mouvement relit ce qui est sous le curseur.
  const [shownOn, setShownOn] = useState(pathname)
  if (shownOn !== pathname) {
    setShownOn(pathname)
    setLabel(null)
  }
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 520, damping: 42, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 520, damping: 42, mass: 0.6 })

  useEffect(() => {
    if (!fine) return
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      const target = (event.target as Element | null)?.closest<HTMLElement>('[data-curseur]')
      setLabel(target?.dataset.curseur ?? null)
    }
    const onLeave = () => setLabel(null)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [fine, x, y])

  if (!fine) return null

  return (
    <motion.div
      className={styles.etiquette}
      aria-hidden="true"
      style={{ x: reduced ? x : springX, y: reduced ? y : springY }}
      data-visible={label ? true : undefined}
    >
      <span>{label}</span>
    </motion.div>
  )
}
