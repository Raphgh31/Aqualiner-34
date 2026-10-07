import Img from '../../components/Img/Img'
import Plaque from '../../components/Plaque/Plaque'
import { company } from '../../content/company'
import { formatMonthYear } from '../../content/format'
import { quoteFounding, timeline } from '../../content/timeline'
import { useHeroTone } from '../../lib/layout'
import { useSeo } from '../../lib/seo'
import styles from './Atelier.module.css'

export default function Atelier() {
  useHeroTone('clair')
  useSeo({
    title: 'L’atelier',
    description:
      'De la pizzeria aux chantiers : l’histoire d’Aqualiner 34, fondée le 1er novembre 2008 à Abeilhan par Wladimir Dubreuil et Jean-Philippe Pagnon. L’équipe, les engagements, la presse.',
  })
  const press = formatMonthYear(company.press.date)

  return (
    <>
      <section className={styles.ouverture} aria-labelledby="atelier-titre">
        <div className="grille">
          <h1 id="atelier-titre" className={`titre-page ${styles.titre}`}>
            L’atelier d’Abeilhan, depuis 2008.
          </h1>
          <p className={`chapo ${styles.chapo}`}>
            Trois dirigeants, un atelier près de Béziers, et une histoire qui commence derrière le comptoir d’une pizzeria.
          </p>
          <ul className={styles.equipe} aria-label="L’équipe dirigeante">
            {company.team.map((member) => (
              <li key={member.name}>
                <div className={styles.portrait}>
                  <Img id={member.photo} sizes="120px" intrinsic />
                </div>
                <div>
                  <p className={`titre-sous ${styles.nom}`}>{member.name}</p>
                  <p className="petit secondaire">{member.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`profond ${styles.histoire}`} aria-labelledby="histoire-titre">
        <div className="grille">
          <h2 id="histoire-titre" className={`titre-section ${styles.histoireTitre}`}>
            De 2003 à aujourd’hui.
          </h2>
          <ol className={styles.chronologie}>
            {timeline.map((event) => (
              <li key={event.year} className={styles.date}>
                <span className={`mesure ${styles.annee}`}>{event.year}</span>
                <div className={styles.recit}>
                  <h3 className="titre-sous">{event.title}</h3>
                  <p className="texte">{event.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <blockquote className={styles.citation}>
            <p>« {quoteFounding.text} »</p>
            <footer className="petit">
              {quoteFounding.author}, <cite>{quoteFounding.source}</cite>
            </footer>
          </blockquote>
        </div>
      </section>

      <section className={styles.engagements} aria-labelledby="engagements-titre">
        <div className="grille">
          <h2 id="engagements-titre" className={`titre-section ${styles.engagementsTitre}`}>
            Les engagements.
          </h2>
          <ul className={styles.trois}>
            {company.commitments.map((commitment) => (
              <li key={commitment.title}>
                <h3 className="titre-sous">{commitment.title}</h3>
                <p className="texte secondaire">{commitment.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.presse} aria-labelledby="presse-titre">
        <div className="grille">
          <div className={styles.presseTexte}>
            <h2 id="presse-titre" className="titre-section">
              Dans la presse.
            </h2>
            <p className="texte">
              En {press}, le magazine <cite>{company.press.title}</cite> consacre un article à l’entreprise : « {company.press.headline} ».
            </p>
            <blockquote className={styles.mot}>
              <p>« {company.press.quote} »</p>
              <footer className="petit secondaire">{company.press.quoteAuthor}</footer>
            </blockquote>
          </div>
          <figure className={styles.coupure}>
            <Img id={company.press.image} sizes="(min-width: 1024px) 640px, 100vw" intrinsic />
            <figcaption className="legende">
              <cite>{company.press.title}</cite>, {press}.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.labels} aria-labelledby="labels-titre">
        <div className="grille">
          <h2 id="labels-titre" className={`titre-section ${styles.labelsTitre}`}>
            Labels et garanties.
          </h2>
          <ul className={styles.trois}>
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
