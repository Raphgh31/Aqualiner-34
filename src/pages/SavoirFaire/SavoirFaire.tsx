import Img from '../../components/Img/Img'
import MembraneDiagram from '../../components/MembraneDiagram/MembraneDiagram'
import MotifStrip from '../../components/MotifStrip/MotifStrip'
import Plaque from '../../components/Plaque/Plaque'
import ProcessSteps from '../../components/ProcessSteps/ProcessSteps'
import { company } from '../../content/company'
import { formatMonthYear } from '../../content/format'
import { getMedia } from '../../content/media'
import { motifs } from '../../content/motifs'
import { membrane, steps } from '../../content/services'
import { useHeroTone } from '../../lib/layout'
import { useSeo } from '../../lib/seo'
import Matieres from './Matieres'
import styles from './SavoirFaire.module.css'

/** La photo de soudure ouvre déjà la page : la bande de motifs ne la répète pas. */
const MOTIFS = motifs.filter((motif) => motif.image !== 'soudure-mains')

export default function SavoirFaire() {
  useHeroTone('clair')
  useSeo({
    title: 'Savoir-faire',
    description:
      'La membrane armée de 1,5 mm couche par couche, la pose en cinq étapes soudée à l’air chaud, les reliefs 3D Touch et les motifs sur mesure. Garantie fabricant de 10 ans.',
  })
  const soudure = formatMonthYear(getMedia('soudure').date)

  return (
    <>
      <section className={styles.ouverture} aria-labelledby="savoir-faire-titre">
        <div className="grille">
          <h1 id="savoir-faire-titre" className={`titre-page ${styles.titre}`}>
            Une membrane, soudée sur place.
          </h1>
          <p className={`chapo ${styles.chapo}`}>
            Le métier tient en un matériau et un geste : la membrane armée, posée lé après lé et soudée à l’air chaud sur le fond et les parois du
            bassin.
          </p>
          <figure className={styles.photo}>
            <Img id="soudure" sizes="(min-width: 1024px) 92vw, 100vw" priority intrinsic />
            <figcaption className="legende">Soudure d’une membrane ardoise sur le haut d’une paroi{soudure ? `, ${soudure}` : ''}.</figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.membrane} aria-labelledby="membrane-titre">
        <div className="grille">
          <div className={styles.membraneTexte}>
            <h2 id="membrane-titre" className="titre-section">
              La membrane, couche par couche.
            </h2>
            <p className="texte">
              Une trame en polyester haute résistance, prise entre deux couches de PVC et protégée côté eau par un vernis : 1,5 mm en tout. Elle
              arrive en rouleaux de 25 mètres, se découpe et se soude sur place.
            </p>
          </div>
          <div className={styles.schema}>
            <MembraneDiagram />
          </div>
          <dl className={styles.fiche}>
            {membrane.specs.map((spec) => (
              <div key={spec.label} className={styles.ligne}>
                <dt>{spec.label}</dt>
                <dd>
                  <span className={`mesure ${styles.valeur}`}>{spec.value}</span>
                  <span className="petit secondaire">{spec.note}</span>
                </dd>
              </div>
            ))}
          </dl>
          <div className={styles.traitements}>
            <h3 className="titre-sous">Traitements</h3>
            <ul>
              {membrane.treatments.map((treatment) => (
                <li key={treatment}>{treatment}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.avantages} aria-labelledby="avantages-titre">
        <div className="grille">
          <h2 id="avantages-titre" className={`titre-section ${styles.avantagesTitre}`}>
            Ce qu’elle permet.
          </h2>
          <ul className={styles.liste}>
            {membrane.advantages.map((advantage) => (
              <li key={advantage}>{advantage}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`profond ${styles.methode}`} aria-labelledby="methode-titre">
        <div className="grille">
          <div className={styles.methodeTexte}>
            <h2 id="methode-titre" className="titre-section">
              La pose, en cinq étapes.
            </h2>
            <p className="texte secondaire">Du diagnostic à la mise en eau, l’équipe mène chaque étape elle-même. Le remplacement d’une étanchéité prend 3 à 4 jours.</p>
            <figure className={styles.avantApres}>
              <Img id="escalier-beton" sizes="(min-width: 1024px) 20vw, 50vw" intrinsic />
              <Img id="escalier-membrane" sizes="(min-width: 1024px) 20vw, 50vw" intrinsic />
              <figcaption className="legende">Un escalier en béton, puis habillé de membrane.</figcaption>
            </figure>
          </div>
          <div className={styles.etapes}>
            <ProcessSteps steps={steps} variant="liste" />
          </div>
        </div>
      </section>

      <section className={styles.reliefs} aria-labelledby="reliefs-titre">
        <div className="grille">
          <div className={styles.reliefsTexte}>
            <h2 id="reliefs-titre" className="titre-section">
              Les reliefs, à sec et sous l’eau.
            </h2>
            <p className="texte">
              La gamme 3D Touch reproduit en relief la pierre, le béton ou le marbre. Sous l’eau, chaque matière prend
              une autre teinte : basculez pour comparer.
            </p>
          </div>
          <div className={styles.reliefsOutil}>
            <Matieres />
          </div>
        </div>
      </section>

      <section className={`ardoise ${styles.motifs}`} aria-labelledby="motifs-titre">
        <div className="grille">
          <h2 id="motifs-titre" className={`titre-section ${styles.motifsTitre}`}>
            Des motifs sur mesure.
          </h2>
          <p className={`texte ${styles.motifsTexte}`}>
            Une croix occitane, un gecko, le logo d’un hôtel : le motif est découpé dans une membrane d’une autre teinte, puis soudé au fond ou sur
            une paroi.
          </p>
        </div>
        <div className={styles.bande}>
          <MotifStrip items={MOTIFS} label="Motifs découpés et soudés dans la membrane" />
        </div>
      </section>

      <section className={styles.garanties} aria-labelledby="garanties-titre">
        <div className="grille">
          <h2 id="garanties-titre" className={`titre-section ${styles.garantiesTitre}`}>
            Ce qui est garanti.
          </h2>
          <ul className={styles.labels}>
            {company.labels.map((label) => (
              <li key={label.title}>
                {label.title === 'Pro Piscine' && (
                  <div className={styles.logo}>
                    <Img id="label-pro-piscine" sizes="96px" intrinsic />
                  </div>
                )}
                <h3 className="titre-sous">{label.title}</h3>
                <p className="texte secondaire">{label.text}</p>
              </li>
            ))}
          </ul>
          <div className={styles.action}>
            <Plaque to="/contact" variant="rouge" fleche>
              Décrire mon projet
            </Plaque>
          </div>
        </div>
      </section>
    </>
  )
}
