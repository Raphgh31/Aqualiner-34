import { Link } from 'react-router'
import { company, zoneSentence } from '../../content/company'
import { NAV } from '../../routes'
import Plaque from '../Plaque/Plaque'
import Wordmark from '../Wordmark/Wordmark'
import styles from './Footer.module.css'

/** Le pied de page est le fond du bassin : la dernière profondeur, là où l'on se parle. */
export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={`${styles.pied} profond`} id="le-fond">
      <div className={styles.contenu}>
        <div className={styles.appel}>
          <p className={`titre-page ${styles.titre}`}>Parlons de votre bassin.</p>
          <p className={`chapo secondaire ${styles.texte}`}>
            Une fuite, un liner fatigué, une construction à l’étude : décrivez votre bassin, vous recevrez une réponse et un devis.
          </p>
          <div className={styles.actions}>
            <Plaque to="/contact" variant="email" fleche>
              Décrire mon projet
            </Plaque>
            <a className={`mesure ${styles.telephone}`} href={company.phone.href}>
              <span className="visuellement-cache">Appeler le </span>
              {company.phone.display}
            </a>
          </div>
        </div>

        <dl className={styles.infos}>
          <div>
            <dt>L’atelier</dt>
            <dd>
              <a href={company.mapsUrl} target="_blank" rel="noreferrer">
                {company.address.street}
                <br />
                {company.address.postalCode} {company.address.city}
              </a>
            </dd>
          </div>
          <div>
            <dt>Téléphone</dt>
            <dd>
              <a href={company.phone.href}>{company.phone.display}</a>
            </dd>
          </div>
          <div>
            <dt>E-mail</dt>
            <dd>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </dd>
          </div>
        </dl>

        <nav className={styles.plan} aria-label="Plan du site">
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className={`petit secondaire ${styles.zone}`}>Secteur d’intervention : {zoneSentence}</p>

        <div className={styles.bas}>
          <Wordmark className={styles.marque} />
          <p className="petit secondaire">© {year} Aqualiner 34. Photographies : chantiers de l’entreprise.</p>
          <Link className="petit" to="/mentions-legales">
            Mentions légales
          </Link>
          <p className={`mesure ${styles.profondeur}`} aria-hidden="true">
            2,20<span className="mesure-unite">m</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
