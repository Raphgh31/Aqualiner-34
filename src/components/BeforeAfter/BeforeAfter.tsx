import { useId, useState } from 'react'
import { getMedia, type MediaId } from '../../content/media'
import { cursorLabel } from '../CursorLabel/CursorLabel'
import Img from '../Img/Img'
import styles from './BeforeAfter.module.css'

type BeforeAfterProps = {
  before: MediaId
  after: MediaId
  labels?: [string, string]
  caption?: string
  sizes?: string
  /** Part de l'image d'avant visible au départ, en %. */
  initial?: number
}

/** Comparaison glissable : à gauche l'état d'avant, à droite l'état d'après. Pilotable au clavier. */
export default function BeforeAfter({
  before,
  after,
  labels = ['Avant', 'Après'],
  caption,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  initial = 52,
}: BeforeAfterProps) {
  const [position, setPosition] = useState(initial)
  const id = useId()
  const { w, h } = getMedia(after)

  return (
    <figure className={styles.comparaison}>
      <div className={styles.cadre} style={{ aspectRatio: `${w} / ${h}` }} {...cursorLabel('Glisser')}>
        <Img id={after} sizes={sizes} className={styles.image} />
        <div className={styles.avant} style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Img id={before} sizes={sizes} className={styles.image} />
        </div>
        <span className={`${styles.etiquette} ${styles.gauche}`} aria-hidden="true">
          {labels[0]}
        </span>
        <span className={`${styles.etiquette} ${styles.droite}`} aria-hidden="true">
          {labels[1]}
        </span>
        <div className={styles.separateur} style={{ left: `${position}%` }} aria-hidden="true">
          <span className={styles.poignee}>
            <svg width="22" height="12" viewBox="0 0 22 12" focusable="false">
              <path d="M6 1 1 6l5 5M16 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </span>
        </div>
        <label className="visuellement-cache" htmlFor={id}>
          Comparer {labels[0].toLowerCase()} et {labels[1].toLowerCase()}
        </label>
        <input
          id={id}
          className={styles.curseur}
          type="range"
          min={0}
          max={100}
          step={1}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-valuetext={`${position} % de l’image d’avant visible`}
        />
      </div>
      {caption && <figcaption className="legende">{caption}</figcaption>}
    </figure>
  )
}
