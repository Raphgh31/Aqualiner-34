import type { MediaId } from '../../content/media'
import type { Annotation } from '../../content/projects'
import Img from '../Img/Img'
import styles from './AnnotatedImage.module.css'

type AnnotatedImageProps = {
  image: MediaId
  notes: Annotation[]
  sizes: string
  caption?: string
  className?: string
}

/**
 * Photographie annotée : des lignes de rappel nomment les parties du bassin.
 * Sur petit écran, les repères deviennent des numéros reportés en légende.
 */
export default function AnnotatedImage({ image, notes, sizes, caption, className }: AnnotatedImageProps) {
  return (
    <figure className={[styles.figure, className].filter(Boolean).join(' ')}>
      <div className={styles.cadre}>
        <Img id={image} sizes={sizes} intrinsic />
        {notes.map((note, index) => (
          <span
            key={note.label}
            className={styles.repere}
            data-cote={note.side ?? 'droite'}
            style={{ left: `${note.x * 100}%`, top: `${note.y * 100}%` }}
          >
            <span className={styles.point} aria-hidden="true">
              <em>{index + 1}</em>
            </span>
            <span className={styles.trait} aria-hidden="true" />
            <span className={styles.texte}>{note.label}</span>
          </span>
        ))}
      </div>
      <figcaption className={styles.legende}>
        <ol className={styles.liste}>
          {notes.map((note, index) => (
            <li key={note.label}>
              <span className={styles.numero}>{index + 1}</span> {note.label}
            </li>
          ))}
        </ol>
        {caption && <p className="legende">{caption}</p>}
      </figcaption>
    </figure>
  )
}
