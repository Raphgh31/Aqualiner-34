import MotifStrip from '../../../components/MotifStrip/MotifStrip'
import { company } from '../../../content/company'
import { motifs } from '../../../content/motifs'
import styles from './Signature.module.css'

/** La soudure (le geste) et le gecko des tonneaux (la sélection) sont déjà montrés plus haut sur l'accueil. */
const STRIP = motifs.filter((motif) => motif.image !== 'soudure-mains' && motif.image !== 'gecko-tonneaux-eau')

export default function Signature() {
  return (
    <section className={`${styles.signature} ardoise`} aria-labelledby="signature-titre">
      <div className="grille">
        <h2 id="signature-titre" className={`titre-section ${styles.titre}`}>
          Une croix, un gecko, votre logo.
        </h2>
        <p className={`texte ${styles.texte}`}>
          Les motifs sont découpés dans une membrane d’une autre teinte, puis soudés au fond ou sur les parois. Croix occitane, motifs tribaux,
          logo d’un hôtel ou d’un club : du dessin jusqu’à l’eau, tout se fait sur mesure.
        </p>
        <blockquote className={styles.citation}>
          <p>« {company.press.quote} »</p>
          <footer className="petit secondaire">
            {company.press.quoteAuthor}, <cite>L’Activité Piscine</cite>, septembre 2017
          </footer>
        </blockquote>
      </div>
      <div className={styles.bande}>
        <MotifStrip items={STRIP} label="Motifs découpés et soudés dans la membrane" />
      </div>
    </section>
  )
}
