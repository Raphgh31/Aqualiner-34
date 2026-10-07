import { useParams } from 'react-router'
import BeforeAfter from '../../components/BeforeAfter/BeforeAfter'
import NextProject from '../../components/NextProject/NextProject'
import Plaque from '../../components/Plaque/Plaque'
import TextLink from '../../components/TextLink/TextLink'
import { getNextProject, getProject, projectFacts, projects, type Project } from '../../content/projects'
import { useHeroTone } from '../../lib/layout'
import { useSeo } from '../../lib/seo'
import Blocks from './Blocks'
import ProjectHero from './ProjectHero'
import styles from './Projet.module.css'

export default function Projet() {
  const { slug = '' } = useParams()
  const project = getProject(slug)
  return project ? <Fiche key={project.slug} project={project} /> : <Introuvable />
}

function Fiche({ project }: { project: Project }) {
  useHeroTone('sombre')
  useSeo({ title: project.title, description: `${project.summary} Une réalisation d’Aqualiner 34.` })
  const facts = projectFacts(project)

  return (
    <>
      <ProjectHero project={project} />

      <section className={styles.fiche} aria-labelledby="fiche-titre">
        <div className="grille">
          <h2 id="fiche-titre" className="visuellement-cache">
            Le projet
          </h2>
          <div className={styles.recit}>
            <p className={`chapo ${styles.intro}`}>{project.intro}</p>
            <TextLink to="/realisations">Toutes les réalisations</TextLink>
          </div>
          <dl className={styles.donnees}>
            {facts.map((fact) => (
              <div key={fact.label} className={styles.ligne}>
                <dt>{fact.label}</dt>
                <dd data-inconnu={!fact.known || undefined}>{fact.value}</dd>
              </div>
            ))}
            {project.features.length > 0 && (
              <div className={styles.ligne}>
                <dt>Particularités</dt>
                <dd>
                  <ul className={styles.particularites}>
                    {project.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      {project.beforeAfter && (
        <section className={styles.avantApres} aria-label="Avant et après">
          <div className="grille">
            <div className={styles.comparaison}>
              <BeforeAfter
                before={project.beforeAfter.before}
                after={project.beforeAfter.after}
                labels={project.beforeAfter.labels}
                caption={project.beforeAfter.caption}
                initial={project.beforeAfter.initial}
                sizes="(min-width: 1024px) 760px, 100vw"
              />
            </div>
          </div>
        </section>
      )}

      {project.blocks.length > 0 && <Blocks blocks={project.blocks} />}

      <NextProject project={getNextProject(project.slug)} />
    </>
  )
}

/** Fiche demandée par une adresse qui ne correspond à aucun projet. */
function Introuvable() {
  useHeroTone('clair')
  useSeo({ title: 'Projet introuvable', description: 'Cette adresse ne correspond à aucune réalisation d’Aqualiner 34.' })
  return (
    <section className={styles.introuvable} aria-labelledby="introuvable-titre">
      <div className="grille">
        <div className={styles.message}>
          <h1 id="introuvable-titre" className="titre-page">
            Ce bassin n’est pas dans le carnet.
          </h1>
          <p className="chapo">L’adresse ne correspond à aucune réalisation. Les {projects.length} bassins racontés sont dans l’index.</p>
          <div className={styles.actions}>
            <Plaque to="/realisations" variant="ardoise" fleche>
              Voir les réalisations
            </Plaque>
            <TextLink to="/">Revenir à l’accueil</TextLink>
          </div>
        </div>
      </div>
    </section>
  )
}
