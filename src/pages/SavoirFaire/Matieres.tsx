import { useId, useState } from 'react'
import Img from '../../components/Img/Img'
import { finishes } from '../../content/finishes'
import styles from './Matieres.module.css'

const reliefs = finishes.filter((finish) => finish.family === 'relief' && finish.texture && finish.textureWet)

/** Les reliefs 3D Touch, à sec ou sous l'eau : un même choix bascule toutes les matières. */
export default function Matieres() {
  const [wet, setWet] = useState(false)
  const name = useId()
  return (
    <div className={styles.matieres}>
      <fieldset className={styles.bascule}>
        <legend className="visuellement-cache">Afficher les matières</legend>
        {[
          { value: false, label: 'À sec' },
          { value: true, label: 'Sous l’eau' },
        ].map((option) => (
          <label key={option.label} className={styles.option} data-actif={wet === option.value || undefined}>
            <input type="radio" name={name} checked={wet === option.value} onChange={() => setWet(option.value)} className="visuellement-cache" />
            {option.label}
          </label>
        ))}
      </fieldset>
      <ul className={styles.grille}>
        {reliefs.map((finish) => (
          <li key={finish.id}>
            <figure className={styles.matiere}>
              {/* L'eau monte sur la matière : la photo sous l'eau se dévoile du bas vers le haut. */}
              <div className={styles.photos} data-mouille={wet || undefined}>
                <div className={styles.sec} aria-hidden={wet || undefined}>
                  <Img id={finish.texture!} sizes="(min-width: 1024px) 18vw, 45vw" alt={`Relief ${finish.name.toLowerCase()}, à sec`} />
                </div>
                <div className={styles.mouille} aria-hidden={!wet || undefined}>
                  <Img id={finish.textureWet!} sizes="(min-width: 1024px) 18vw, 45vw" alt={`Relief ${finish.name.toLowerCase()}, sous l’eau`} />
                </div>
              </div>
              <figcaption>
                <span className={styles.nom}>{finish.name}</span>
                <span className={`petit ${styles.eau}`}>{finish.water}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <p className="legende">Images du nuancier Renolit Alkorplan Touch (gamme en relief, 2 mm). Teintes indicatives.</p>
    </div>
  )
}
