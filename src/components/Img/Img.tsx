import { useCallback, useState, type CSSProperties, type Ref, type RefObject } from 'react'
import { getMedia, mediaUrl, srcSet, type MediaId } from '../../content/media'
import styles from './Img.module.css'

type ArtDirection = { media: string; id: MediaId }

type ImgProps = {
  id: MediaId
  /** Attribut `sizes` : la largeur affichée de l'image selon la fenêtre. */
  sizes: string
  priority?: boolean
  className?: string
  /** Remplace le texte alternatif du manifeste ; chaîne vide pour une image décorative. */
  alt?: string
  /** Cadrage dans le conteneur (`object-position`). */
  position?: string
  /** Variantes recadrées selon la fenêtre (ex. portrait sur mobile). */
  art?: ArtDirection[]
  /** Respecte le rapport largeur/hauteur de l'image (sinon le conteneur décide). */
  intrinsic?: boolean
  imgRef?: Ref<HTMLImageElement>
  onLoad?: (image: HTMLImageElement) => void
}

/** Transmet le nœud à une ref fournie par le parent, fonction ou objet. */
function setRef<T>(ref: Ref<T> | undefined, node: T | null) {
  if (typeof ref === 'function') ref(node)
  else if (ref) (ref as RefObject<T | null>).current = node
}

export default function Img({ id, sizes, priority, className, alt, position, art = [], intrinsic, imgRef, onLoad }: ImgProps) {
  const media = getMedia(id)
  const [loaded, setLoaded] = useState(Boolean(priority))
  const fallback = media.widths.find((w) => w >= 1024) ?? media.widths[media.widths.length - 1]

  // Une image déjà en cache peut être chargée avant que React n'écoute « load ».
  const attach = useCallback(
    (node: HTMLImageElement | null) => {
      if (node?.complete && node.naturalWidth > 0) setLoaded(true)
      setRef(imgRef, node)
    },
    [imgRef],
  )

  const style: CSSProperties = { backgroundColor: media.color }
  if (intrinsic) style.aspectRatio = `${media.w} / ${media.h}`

  return (
    <picture className={[styles.picture, intrinsic ? styles.intrinsic : '', className].filter(Boolean).join(' ')} style={style}>
      {art.map((variant) => {
        const crop = getMedia(variant.id)
        return [
          <source key={`${variant.id}-avif`} media={variant.media} type="image/avif" srcSet={srcSet(crop, 'avif')} sizes={sizes} />,
          <source key={`${variant.id}-webp`} media={variant.media} type="image/webp" srcSet={srcSet(crop, 'webp')} sizes={sizes} />,
        ]
      })}
      <source type="image/avif" srcSet={srcSet(media, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(media, 'webp')} sizes={sizes} />
      <img
        ref={attach}
        className={[styles.img, loaded ? styles.loaded : ''].join(' ')}
        src={mediaUrl(id, fallback, 'webp')}
        width={media.w}
        height={media.h}
        alt={alt ?? media.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        style={position ? { objectPosition: position } : undefined}
        onLoad={(event) => {
          setLoaded(true)
          onLoad?.(event.currentTarget)
        }}
      />
    </picture>
  )
}
