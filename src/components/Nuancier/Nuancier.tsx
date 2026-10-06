import { useEffect, useId, useRef, useState } from 'react'
import { finishes, type Finish } from '../../content/finishes'
import { closestWidth, getMedia, mediaUrl } from '../../content/media'
import { useReducedMotion } from '../../lib/useMediaQuery'
import { loadImage, toPowerOfTwo } from '../../webgl/gl'
import { createPoolSim, type PoolSim } from '../../webgl/poolSim'
import { canUseWebGL } from '../../webgl/support'
import { cursorLabel } from '../CursorLabel/CursorLabel'
import Img from '../Img/Img'
import styles from './Nuancier.module.css'

const textures = new Map<string, Promise<HTMLCanvasElement>>()

/** Texture de fond (finitions en relief), rendue carrée pour pouvoir être répétée. */
function floorTexture(finish: Finish): Promise<HTMLCanvasElement | null> {
  if (!finish.texture) return Promise.resolve(null)
  const media = getMedia(finish.texture)
  if (!textures.has(finish.id)) {
    textures.set(finish.id, loadImage(mediaUrl(media.id, closestWidth(media, 960), 'webp')).then((image) => toPowerOfTwo(image, 1024)))
  }
  return textures.get(finish.id)!
}

/** Teinte approximative de l'eau (même modèle que le shader), pour le repli sans WebGL. */
function waterTint([r, g, b]: [number, number, number]): string {
  const depth = 1.4
  const absorb = [0.4, 0.075, 0.09]
  const lum = 0.299 * r + 0.587 * g + 0.114 * b
  const scatter = [0.012, 0.125, 0.215].map((s) => s * (1 - Math.exp(-depth * 0.9)) * (1 - lum * 0.45))
  const out = [r, g, b].map((c, i) => Math.min(1, c * 0.86 * Math.exp(-absorb[i] * depth * 2) + scatter[i]))
  return `rgb(${out.map((c) => Math.round(c * 255)).join(' ')})`
}

const DEFAULT = finishes.find((f) => f.id === 'anthracite') ?? finishes[0]

export default function Nuancier() {
  const reduced = useReducedMotion()
  const name = useId()
  const canvas = useRef<HTMLCanvasElement>(null)
  const sim = useRef<PoolSim | null>(null)
  const [finish, setFinish] = useState<Finish>(DEFAULT)
  const [webgl, setWebgl] = useState(true)

  useEffect(() => {
    const target = canvas.current
    if (!target || !canUseWebGL()) {
      setWebgl(false)
      return
    }
    let cancelled = false
    floorTexture(DEFAULT).then((texture) => {
      if (cancelled) return
      sim.current = createPoolSim(target, { finish: DEFAULT, texture, reducedMotion: reduced })
      if (!sim.current) setWebgl(false)
    })
    return () => {
      cancelled = true
      sim.current?.destroy()
      sim.current = null
    }
  }, [reduced])

  const choose = (next: Finish) => {
    setFinish(next)
    floorTexture(next).then((texture) => {
      sim.current?.setFinish(next, texture)
      // Une onde accompagne le changement de teinte.
      sim.current?.pointer(0.5, 0.5, 0.9)
    })
  }

  const families: { id: Finish['family']; label: string }[] = [
    { id: 'unie', label: 'Teintes unies' },
    { id: 'relief', label: 'Reliefs 3D Touch' },
  ]

  return (
    <div className={styles.nuancier}>
      <div className={styles.bassin}>
        {webgl ? (
          <canvas
            ref={canvas}
            className={styles.canevas}
            {...cursorLabel('Toucher l’eau')}
            onPointerMove={(event) => {
              const box = event.currentTarget.getBoundingClientRect()
              sim.current?.pointer((event.clientX - box.left) / box.width, (event.clientY - box.top) / box.height)
            }}
            role="img"
            aria-label={`Simulation d’un bassin vu du ciel, membrane ${finish.name.toLowerCase()} : ${finish.water}`}
          />
        ) : (
          <div className={styles.repli} style={{ backgroundColor: waterTint(finish.color) }} role="img" aria-label={`Teinte indicative de l’eau sur une membrane ${finish.name.toLowerCase()}`} />
        )}
        <p className={`petit secondaire ${styles.avertissement}`}>
          Simulation indicative : la teinte réelle dépend de la profondeur, de la lumière et du traitement de l’eau.
        </p>
      </div>

      <div className={styles.panneau}>
        <p className={`titre-sous ${styles.nom}`} aria-live="polite">
          {finish.name}
        </p>
        <p className={`texte ${styles.effet}`}>{finish.water}</p>

        {families.map((family) => (
          <fieldset key={family.id} className={styles.groupe}>
            <legend className="petit secondaire">{family.label}</legend>
            <div className={styles.pastilles}>
              {finishes
                .filter((f) => f.family === family.id)
                .map((f) => (
                  <label key={f.id} className={styles.pastille} data-actif={f.id === finish.id || undefined}>
                    <input
                      type="radio"
                      name={name}
                      value={f.id}
                      checked={f.id === finish.id}
                      onChange={() => choose(f)}
                      className="visuellement-cache"
                    />
                    <span
                      className={styles.echantillon}
                      style={{ backgroundColor: `rgb(${f.color.map((c) => Math.round(c * 255)).join(' ')})` }}
                      aria-hidden="true"
                    >
                      {f.texture && <Img id={f.texture} sizes="56px" alt="" />}
                    </span>
                    <span className={styles.libelle}>{f.name}</span>
                  </label>
                ))}
            </div>
          </fieldset>
        ))}

        {finish.seen.length > 0 && (
          <div className={styles.vus}>
            <p className="petit secondaire">Vu sur nos chantiers</p>
            <ul>
              {finish.seen.map((seen) => (
                <li key={seen.image}>
                  <Img id={seen.image} sizes="(min-width: 1024px) 160px, 40vw" />
                  <span className="petit">{seen.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {finish.textureWet && (
          <div className={styles.vus}>
            <p className="petit secondaire">Sous l’eau, d’après le nuancier du fabricant</p>
            <ul>
              <li>
                <Img id={finish.textureWet} sizes="(min-width: 1024px) 160px, 40vw" />
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
