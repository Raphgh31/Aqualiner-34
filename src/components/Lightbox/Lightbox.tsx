import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { formatMonthYear } from '../../content/format'
import { getMedia, srcSet, type MediaId } from '../../content/media'
import { wrapIndex } from '../../lib/gallery'
import { useScrollApi } from '../../lib/scroll'
import Img from '../Img/Img'
import styles from './Lightbox.module.css'

type LightboxProps = {
  items: MediaId[]
  /** Photo affichée ; null : visionneuse fermée. */
  index: number | null
  onIndex: (index: number) => void
  onClose: () => void
  label: string
}

const ease = [0.22, 1, 0.36, 1] as const

const slide = {
  entree: (direction: number) => ({ opacity: 0, x: direction * 48 }),
  centre: { opacity: 1, x: 0, transition: { duration: 0.45, ease } },
  sortie: (direction: number) => ({ opacity: 0, x: direction * -48, transition: { duration: 0.3, ease } }),
}

function Fleche({ sens }: { sens: 'gauche' | 'droite' }) {
  return (
    <svg width="20" height="12" viewBox="0 0 20 12" aria-hidden="true" focusable="false">
      <path d={sens === 'droite' ? 'M0 6h18M13 1l5 5-5 5' : 'M20 6H2M7 1 2 6l5 5'} fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

/**
 * Visionneuse en plein écran (dialogue modal natif : le reste de la page devient inerte, le focus y reste).
 * Échap ferme, les flèches du clavier passent d'une photo à l'autre, un glissé latéral aussi sur écran tactile.
 */
export default function Lightbox({ items, index, onIndex, onClose, label }: LightboxProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const { lock } = useScrollApi()
  const [direction, setDirection] = useState(1)
  const open = index !== null

  useEffect(() => {
    const node = dialog.current
    if (!node) return
    if (open && !node.open) {
      node.showModal()
      lock(true)
    } else if (!open && node.open) {
      node.close()
      lock(false)
    }
  }, [open, lock])

  useEffect(() => () => lock(false), [lock])

  // Les photos voisines se chargent d'avance.
  useEffect(() => {
    if (index === null) return
    for (const step of [1, -1]) {
      const media = getMedia(items[wrapIndex(index + step, items.length)])
      const image = new Image()
      image.sizes = '100vw'
      image.srcset = srcSet(media, 'avif')
    }
  }, [index, items])

  const go = (step: number) => {
    if (index === null) return
    setDirection(step)
    onIndex(wrapIndex(index + step, items.length))
  }

  const onKeyDown = (event: KeyboardEvent) => {
    // Le focus fait le tour du dialogue au lieu d'en sortir vers le navigateur.
    if (event.key === 'Tab') {
      const focusables = Array.from(dialog.current?.querySelectorAll<HTMLElement>('button, [href]') ?? [])
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      go(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      go(-1)
    }
  }

  const current = index === null ? null : getMedia(items[index])
  const date = current ? formatMonthYear(current.date) : null

  return (
    <dialog
      ref={dialog}
      className={styles.visionneuse}
      aria-label={label}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onKeyDown={onKeyDown}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      {index !== null && current && (
        <div className={styles.contenu}>
          <div className={styles.barre}>
            <p className={`mesure ${styles.compteur}`} aria-live="polite">
              <span className="visuellement-cache">
                Photo {index + 1} sur {items.length}
              </span>
              <span aria-hidden="true">
                {index + 1}
                <span className={styles.total}>/{'\u202f'}{items.length}</span>
              </span>
            </p>
            <button type="button" className={styles.fermer} onClick={onClose} autoFocus>
              Fermer
            </button>
          </div>

          <div className={styles.scene}>
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.figure
                key={items[index]}
                className={styles.figure}
                custom={direction}
                variants={slide}
                initial="entree"
                animate="centre"
                exit="sortie"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.5}
                onDragEnd={(_event, info) => {
                  if (info.offset.x < -70) go(1)
                  else if (info.offset.x > 70) go(-1)
                }}
              >
                <Img id={items[index]} sizes="100vw" className={styles.image} priority />
                <figcaption className={`legende ${styles.legende}`}>
                  {current.alt}
                  {date && ` Photographié en ${date}.`}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className={styles.navigation}>
            <button type="button" className={styles.bouton} onClick={() => go(-1)} aria-label="Photo précédente">
              <Fleche sens="gauche" />
            </button>
            <button type="button" className={styles.bouton} onClick={() => go(1)} aria-label="Photo suivante">
              <Fleche sens="droite" />
            </button>
          </div>
        </div>
      )}
    </dialog>
  )
}
