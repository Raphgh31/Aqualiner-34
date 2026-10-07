import { useMotionValueEvent, type MotionValue } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { closestWidth, getMedia, mediaUrl } from '../../content/media'
import { useReducedMotion } from '../../lib/useMediaQuery'
import { loadImage } from '../../webgl/gl'
import { FOCUS_CROSS, FOCUS_CROSS_PORTRAIT, FOCUS_STEPS, PORTRAIT_QUERY, heroState } from '../../webgl/heroState'
import { canUseWebGL } from '../../webgl/support'
import { createWaterHero, type WaterHero as Renderer } from '../../webgl/waterHero'
import Img from '../Img/Img'
import styles from './WaterHero.module.css'


const maskUrl = (id: string) => `${import.meta.env.BASE_URL}media/masque-${id}.png`

function whenLoaded(image: HTMLImageElement): Promise<void> {
  if (image.complete && image.naturalWidth > 0) return image.decode().catch(() => undefined)
  return new Promise((resolve) => image.addEventListener('load', () => resolve(), { once: true }))
}

type WaterHeroProps = {
  /** Progression du défilement de la séquence (0 → 1). */
  progress: MotionValue<number>
}

/**
 * La croix occitane sous une eau vivante. La photo s'affiche immédiatement (et reste le repli) ;
 * le rendu WebGL la remplace dès qu'il est prêt.
 */
export default function WaterHero({ progress }: WaterHeroProps) {
  const reduced = useReducedMotion()
  const image = useRef<HTMLImageElement | null>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const renderer = useRef<Renderer | null>(null)
  const [ready, setReady] = useState(false)
  const [fallbackZoom, setFallbackZoom] = useState(1)

  useEffect(() => {
    const img = image.current
    const target = canvas.current
    if (!img || !target || !canUseWebGL()) return
    let cancelled = false
    let created: Renderer | null = null

    const start = async () => {
      await whenLoaded(img)
      const portrait = img.currentSrc.includes('portrait')
      // Le navigateur a choisi le format de la photo affichée : on garde le même pour les textures.
      const format = img.currentSrc.endsWith('.avif') ? 'avif' : 'webp'
      const first = getMedia(portrait ? 'croix-occitane-portrait' : 'croix-occitane')
      const second = getMedia('croix-occitane-escalier')
      const wanted = Math.min(window.innerWidth * Math.min(window.devicePixelRatio || 1, 1.5), 2400)
      // Le gros plan sur la croix demande la plus grande définition disponible.
      const [firstImage, secondImage, mask0, mask1] = await Promise.all([
        loadImage(mediaUrl(first.id, first.widths[first.widths.length - 1], format)),
        loadImage(mediaUrl(second.id, closestWidth(second, wanted), format)),
        loadImage(maskUrl(portrait ? 'croix-occitane-portrait' : 'croix-occitane')),
        loadImage(maskUrl('croix-occitane-escalier')),
      ])
      if (cancelled) return
      created = createWaterHero(target, {
        images: [firstImage, secondImage],
        masks: [mask0, mask1],
        focus: [portrait ? FOCUS_CROSS_PORTRAIT : FOCUS_CROSS, FOCUS_STEPS],
        reducedMotion: reduced,
        onContextLost: () => setReady(false),
      })
      if (!created) return
      renderer.current = created
      created.setProgress(reduced ? 0 : progress.get())
      setReady(true)
    }
    start().catch(() => setReady(false))

    return () => {
      cancelled = true
      created?.destroy()
      renderer.current = null
      setReady(false)
    }
  }, [reduced, progress])

  useMotionValueEvent(progress, 'change', (value) => {
    if (reduced) return
    if (renderer.current) renderer.current.setProgress(value)
    else setFallbackZoom(heroState(value).zoom0)
  })

  return (
    <div className={styles.eau}>
      <div className={styles.photo} style={{ transform: `scale(${fallbackZoom})` }}>
        <Img
          id="croix-occitane"
          sizes="100vw"
          priority
          imgRef={image}
          art={[{ media: PORTRAIT_QUERY, id: 'croix-occitane-portrait' }]}
        />
      </div>
      <canvas ref={canvas} className={styles.canevas} data-pret={ready || undefined} aria-hidden="true" />
    </div>
  )
}
