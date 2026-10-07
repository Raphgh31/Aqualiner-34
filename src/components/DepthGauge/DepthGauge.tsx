import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { depthAt, formatDepth } from '../../lib/depth'
import styles from './DepthGauge.module.css'

/** Profondeur atteinte en bas de page, en mètres. */
const MAX_DEPTH = 2.2
const TICKS = Array.from({ length: Math.round(MAX_DEPTH * 10) + 1 }, (_, i) => i / 10)

/**
 * Jauge de profondeur : le défilement de la page se lit en mètres, de la surface au fond.
 * Rouge près de la surface, turquoise au-dessus des sections profondes (le rouge disparaît sous l'eau).
 */
export default function DepthGauge() {
  const [depth, setDepth] = useState(0)
  const [deep, setDeep] = useState(false)
  const marker = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()

  // La jauge lit la section qui passe derrière son repère.
  const readGround = useCallback(() => {
    const box = marker.current?.getBoundingClientRect()
    if (!box) return
    const under = document.elementFromPoint(box.right + 24, box.top + box.height / 2)
    setDeep(Boolean(under?.closest('.profond, .ardoise, [data-sombre]')))
  }, [])

  const measure = useCallback(() => {
    const root = document.documentElement
    setDepth(depthAt(window.scrollY, root.scrollHeight, window.innerHeight, MAX_DEPTH))
    readGround()
  }, [readGround])

  // Au défilement, et quand la hauteur de la page change (page chargée, images, rideau).
  useEffect(() => {
    const first = requestAnimationFrame(measure)
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    const observer = new ResizeObserver(measure)
    observer.observe(document.body)
    return () => {
      cancelAnimationFrame(first)
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
      observer.disconnect()
    }
  }, [measure])

  useEffect(() => {
    // Après le changement de page (et la fin du rideau), relire le fond.
    const frame = requestAnimationFrame(measure)
    const timer = window.setTimeout(measure, 900)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timer)
    }
  }, [pathname, measure])

  return (
    <div className={styles.jauge} data-profond={deep || undefined} aria-hidden="true">
      <div className={styles.echelle}>
        {TICKS.map((tick) => {
          const major = Math.round(tick * 10) % 5 === 0
          return (
            <span
              key={tick}
              className={major ? styles.majeur : styles.mineur}
              style={{ top: `${(tick / MAX_DEPTH) * 100}%` }}
            >
              {major && <em>{formatDepth(tick, false)}</em>}
            </span>
          )
        })}
        <div ref={marker} className={styles.repere} style={{ top: `${(depth / MAX_DEPTH) * 100}%` }}>
          <span className="mesure">{formatDepth(depth)}</span>
        </div>
      </div>
    </div>
  )
}
