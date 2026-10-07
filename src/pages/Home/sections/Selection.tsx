import { Link } from 'react-router'
import { cursorLabel } from '../../../components/CursorLabel/CursorLabel'
import Img from '../../../components/Img/Img'
import TextLink from '../../../components/TextLink/TextLink'
import { formatMonthYear } from '../../../content/format'
import type { MediaId } from '../../../content/media'
import { getProject, projects } from '../../../content/projects'
import styles from './Selection.module.css'

/** Quatre projets, chacun dans sa propre proportion : un rythme de planche, pas une grille de cartes. */
const SELECTION: { slug: string; image: MediaId; place: string }[] = [
  { slug: 'gecko-et-tonneaux', image: 'gecko-tonneaux-eau', place: styles.large },
  { slug: 'couloir-de-nage', image: 'couloir', place: styles.gauche },
  { slug: 'nuit-turquoise', image: 'nuit-turquoise', place: styles.droite },
  { slug: 'au-pied-du-chateau', image: 'chateau-apres', place: styles.centre },
]

function meta(nature: string | null, photographed: string | null): string | null {
  const date = formatMonthYear(photographed)
  if (nature && date) return `${nature}. Photographié en ${date}.`
  if (nature) return nature
  if (date) return `Photographié en ${date}.`
  return null
}

export default function Selection() {
  return (
    <section className={styles.selection} aria-labelledby="selection-titre">
      <div className="grille">
        <div className={styles.entete}>
          <h2 id="selection-titre" className="titre-section">
            Des bassins, photographiés sur place.
          </h2>
          <TextLink to="/realisations">Les {projects.length} réalisations et le carnet de chantier</TextLink>
        </div>
        <ul className={styles.planche}>
          {SELECTION.map(({ slug, image, place }) => {
            const project = getProject(slug)
            if (!project) return null
            const line = meta(project.nature, project.photographed)
            return (
              <li key={slug} className={place}>
                <Link to={`/realisations/${slug}`} className={styles.projet} {...cursorLabel('Voir le projet')}>
                  <div className={styles.image}>
                    <Img id={image} sizes="(min-width: 1024px) 60vw, 100vw" />
                  </div>
                  <div className={styles.legende}>
                    <h3 className="titre-sous">{project.title}</h3>
                    <p className="petit secondaire">{project.summary}</p>
                    {line && <p className="petit">{line}</p>}
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
