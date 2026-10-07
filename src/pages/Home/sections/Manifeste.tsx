import TextLink from '../../../components/TextLink/TextLink'
import styles from './Manifeste.module.css'

const FICHE = [
  { label: 'Membrane armée', value: '1,5 mm', note: 'épaisseur 150/100e' },
  { label: 'Assemblage', value: 'Air chaud', note: 'soudure sur place, lé après lé' },
  { label: 'Garantie d’étanchéité', value: '10 ans', note: 'garantie du fabricant' },
  { label: 'Remplacement', value: '3 à 4 jours', note: 'de chantier' },
  { label: 'Atelier', value: '2008', note: 'à Abeilhan, près de Béziers' },
]

export default function Manifeste() {
  return (
    <section className={styles.manifeste} aria-labelledby="manifeste-titre">
      <div className="grille">
        <h2 id="manifeste-titre" className={`titre-section ${styles.enonce}`}>
          Ce que vous voyez, c’est l’eau. Notre travail, c’est tout ce qui la retient.
        </h2>
        <div className={styles.texte}>
          <p className="chapo">
            Aqualiner 34 rénove et construit des piscines depuis 2008, à Abeilhan, près de Béziers.
          </p>
          <p className="texte secondaire">
            Le métier, c’est d’abord la rénovation : des bassins qui fuient, des liners percés, des peintures à refaire chaque
            printemps. Ils sont transformés sans être reconstruits, avec une membrane armée découpée et soudée sur place.
          </p>
          <TextLink to="/savoir-faire">Ce qu’est une membrane armée</TextLink>
        </div>
        <dl className={styles.fiche}>
          {FICHE.map((row) => (
            <div key={row.label} className={styles.ligne}>
              <dt>{row.label}</dt>
              <dd>
                <span className={`mesure ${styles.valeur}`}>{row.value}</span>
                <span className="petit secondaire">{row.note}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
