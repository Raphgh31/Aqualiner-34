import AnnotatedImage from '../../../components/AnnotatedImage/AnnotatedImage'
import ProcessSteps from '../../../components/ProcessSteps/ProcessSteps'
import TextLink from '../../../components/TextLink/TextLink'
import { steps } from '../../../content/services'
import styles from './Geste.module.css'

export default function Geste() {
  return (
    <section className={`${styles.geste} profond`} aria-labelledby="geste-titre">
      <div className="grille">
        <div className={styles.photo}>
          <AnnotatedImage
            image="soudure-mains"
            sizes="(min-width: 1024px) 46vw, 100vw"
            notes={[
              { x: 0.4, y: 0.27, label: 'Pistolet à air chaud', side: 'droite' },
              { x: 0.92, y: 0.41, label: 'Rouleau presseur', side: 'gauche' },
              { x: 0.3, y: 0.8, label: 'Motif déjà soudé', side: 'droite' },
            ]}
            caption="Soudure d’une membrane ardoise sur le haut d’une paroi, mars 2021."
          />
        </div>
        <div className={styles.recit}>
          <h2 id="geste-titre" className="titre-section">
            Soudé à l’air chaud, lé après lé.
          </h2>
          <p className={`chapo ${styles.chapo}`}>Du diagnostic à la mise en eau, cinq étapes.</p>
          <ProcessSteps steps={steps} />
          <p className={styles.duree}>
            Remplacement d’une étanchéité : <span className="mesure">3 à 4 jours</span> de chantier.
          </p>
          <TextLink to="/savoir-faire">Tout le savoir-faire</TextLink>
        </div>
      </div>
    </section>
  )
}
