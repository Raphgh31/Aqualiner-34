import ProjectIndex from '../../components/ProjectIndex/ProjectIndex'
import { projects } from '../../content/projects'
import { useHeroTone } from '../../lib/layout'
import { useSeo } from '../../lib/seo'
import Carnet from './Carnet'
import styles from './Realisations.module.css'

export default function Realisations() {
  useHeroTone('clair')
  useSeo({
    title: 'Réalisations',
    description: 'Bassins rénovés et construits par Aqualiner 34, photographiés sur les chantiers : fiches détaillées et carnet de chantier.',
  })
  return (
    <>
      <section className={styles.ouverture} aria-labelledby="realisations-titre">
        <div className="grille">
          <h1 id="realisations-titre" className={`titre-page ${styles.titre}`}>
            Réalisations
          </h1>
          <p className={`chapo ${styles.chapo}`}>
            Des bassins photographiés sur nos chantiers, racontés un par un. Plus bas, le carnet : d’autres bassins, sans fiche détaillée.
          </p>
          <div className={styles.index}>
            <ProjectIndex projects={projects} />
          </div>
        </div>
      </section>
      <Carnet />
    </>
  )
}
