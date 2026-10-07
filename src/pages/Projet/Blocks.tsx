import AnnotatedImage from '../../components/AnnotatedImage/AnnotatedImage'
import Img from '../../components/Img/Img'
import { getMedia, type MediaId } from '../../content/media'
import type { ProjectBlock } from '../../content/projects'
import styles from './Blocks.module.css'

/** Une photo déclinée sous 1600 px ne s'affiche pas plus large que sa taille d'origine. */
function largeur(id: MediaId) {
  const media = getMedia(id)
  return Math.max(...media.widths) < 1600 ? { maxWidth: `${media.w}px` } : undefined
}

function Photo({ id, sizes, caption, className }: { id: MediaId; sizes: string; caption?: string; className?: string }) {
  return (
    <figure className={[styles.photo, className].filter(Boolean).join(' ')} style={largeur(id)}>
      <Img id={id} sizes={sizes} intrinsic />
      {caption && <figcaption className="legende">{caption}</figcaption>}
    </figure>
  )
}

/** Les compositions d'une fiche, dans l'ordre du récit. */
export default function Blocks({ blocks }: { blocks: ProjectBlock[] }) {
  return (
    <div className={styles.blocs}>
      {blocks.map((block, index) => {
        const key = `${block.kind}-${index}`
        switch (block.kind) {
          case 'plein':
            return (
              <div key={key} className={`grille ${styles.bloc}`}>
                <Photo id={block.image} sizes="(min-width: 1024px) 84vw, 100vw" caption={block.caption} className={styles.plein} />
              </div>
            )
          case 'paire':
            return (
              <div key={key} className={`grille ${styles.bloc} ${styles.paire}`}>
                <Photo id={block.images[0]} sizes="(min-width: 1024px) 52vw, 100vw" className={styles.premiere} />
                <Photo id={block.images[1]} sizes="(min-width: 1024px) 36vw, 100vw" caption={block.caption} className={styles.seconde} />
              </div>
            )
          case 'texte':
            return (
              <div key={key} className={`grille ${styles.bloc}`}>
                <div className={styles.texte}>
                  <h2 className="titre-sous">{block.title}</h2>
                  <p className="texte">{block.text}</p>
                </div>
              </div>
            )
          case 'decale':
            return (
              <div key={key} className={`grille ${styles.bloc} ${styles.decale}`} data-cote={block.side}>
                <Photo id={block.image} sizes="(min-width: 1024px) 56vw, 100vw" caption={block.caption} className={styles.image} />
                <p className={`texte ${styles.recit}`}>{block.text}</p>
              </div>
            )
          case 'annote':
            return (
              <div key={key} className={`grille ${styles.bloc}`}>
                <AnnotatedImage image={block.image} notes={block.notes} caption={block.caption} sizes="(min-width: 1024px) 84vw, 100vw" className={styles.plein} />
              </div>
            )
        }
      })}
    </div>
  )
}
