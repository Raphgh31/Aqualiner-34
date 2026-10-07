import { useRef, useState } from 'react'
import { cursorLabel } from '../../components/CursorLabel/CursorLabel'
import Img from '../../components/Img/Img'
import Lightbox from '../../components/Lightbox/Lightbox'
import { getMedia } from '../../content/media'
import { carnet } from '../../content/projects'
import styles from './Carnet.module.css'

/** Le carnet de chantier : d'autres bassins, en planche contact ; chaque photo s'ouvre dans la visionneuse. */
export default function Carnet() {
  const [open, setOpen] = useState<number | null>(null)
  const openers = useRef<(HTMLButtonElement | null)[]>([])

  const close = () => {
    const from = open
    setOpen(null)
    if (from !== null) openers.current[from]?.focus()
  }

  return (
    <section className={styles.carnet} aria-labelledby="carnet-titre">
      <div className="grille">
        <div className={styles.entete}>
          <h2 id="carnet-titre" className="titre-section">
            Le carnet de chantier.
          </h2>
          <p className="texte secondaire">
            D’autres bassins, photographiés au fil des chantiers. Pas de fiche pour ceux-là : l’eau, les margelles et la lumière du jour.
          </p>
        </div>
        <ul className={styles.planche}>
          {carnet.map((id, index) => {
            const media = getMedia(id)
            const ratio = media.w / media.h
            return (
              <li key={id} style={{ flexGrow: ratio, flexBasis: `calc(${ratio} * var(--rang))` }}>
                <button
                  type="button"
                  ref={(node) => {
                    openers.current[index] = node
                  }}
                  className={styles.vignette}
                  onClick={() => setOpen(index)}
                  aria-label={`Agrandir : ${media.alt}`}
                  {...cursorLabel('Agrandir')}
                >
                  <Img id={id} sizes="(min-width: 1024px) 24vw, 50vw" intrinsic alt="" />
                </button>
              </li>
            )
          })}
          <li className={styles.fin} aria-hidden="true" />
        </ul>
      </div>
      <Lightbox items={carnet} index={open} onIndex={setOpen} onClose={close} label="Carnet de chantier" />
    </section>
  )
}
