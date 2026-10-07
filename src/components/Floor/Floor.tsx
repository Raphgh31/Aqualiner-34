import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../lib/useMediaQuery'
import { createFloor } from '../../webgl/floor'
import { canUseWebGL } from '../../webgl/support'
import styles from './Floor.module.css'

/** La lumière au fond du bassin, derrière le pied de page ; rien du tout si l'appareil ne la tient pas. */
export default function Floor() {
  const reduced = useReducedMotion()
  const canvas = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)
  const [off, setOff] = useState(false)

  useEffect(() => {
    const target = canvas.current
    if (!target || off || !canUseWebGL()) return
    const floor = createFloor(target, { reducedMotion: reduced, onSlow: () => setOff(true) })
    if (!floor) return
    const frame = requestAnimationFrame(() => setReady(true))
    return () => {
      cancelAnimationFrame(frame)
      floor.destroy()
      setReady(false)
    }
  }, [reduced, off])

  if (off) return null
  return <canvas ref={canvas} className={styles.fond} data-pret={ready || undefined} aria-hidden="true" />
}
