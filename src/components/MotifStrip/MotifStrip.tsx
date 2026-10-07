import { useRef, type PointerEvent } from 'react'
import type { Motif } from '../../content/motifs'
import { cursorLabel } from '../CursorLabel/CursorLabel'
import Img from '../Img/Img'
import styles from './MotifStrip.module.css'

/**
 * Bande de motifs à faire défiler : à la souris (glisser), au doigt, au clavier (flèches)
 * ou avec les deux boutons.
 */
export default function MotifStrip({ items, label }: { items: Motif[]; label: string }) {
  const track = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null)

  const scrollBy = (direction: 1 | -1) => {
    const node = track.current
    if (!node) return
    node.scrollBy({ left: direction * node.clientWidth * 0.75, behavior: 'smooth' })
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || !track.current) return
    drag.current = { x: event.clientX, left: track.current.scrollLeft, moved: false }
    track.current.setPointerCapture(event.pointerId)
  }
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !track.current) return
    const delta = event.clientX - drag.current.x
    if (Math.abs(delta) > 3) drag.current.moved = true
    track.current.scrollLeft = drag.current.left - delta
  }
  const onPointerUp = () => {
    drag.current = null
  }

  return (
    <div className={styles.bande}>
      <div
        ref={track}
        className={styles.piste}
        role="region"
        aria-label={label}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        {...cursorLabel('Glisser')}
      >
        {items.map((item) => (
          <figure key={item.image} className={styles.motif}>
            <div className={styles.image}>
              <Img id={item.image} sizes="(min-width: 1024px) 30vw, 78vw" />
            </div>
            <figcaption>
              <span className={styles.titre}>{item.title}</span>
              <span className="petit secondaire">{item.text}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className={styles.commandes}>
        <button type="button" onClick={() => scrollBy(-1)} aria-label="Motifs précédents">
          <svg width="22" height="12" viewBox="0 0 22 12" aria-hidden="true">
            <path d="M21 6H2M7 1 2 6l5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
        <button type="button" onClick={() => scrollBy(1)} aria-label="Motifs suivants">
          <svg width="22" height="12" viewBox="0 0 22 12" aria-hidden="true">
            <path d="M1 6h19M15 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </div>
  )
}
