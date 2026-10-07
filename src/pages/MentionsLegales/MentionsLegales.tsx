import { company } from '../../content/company'
import { A_PRECISER } from '../../content/format'
import { useHeroTone } from '../../lib/layout'
import { useSeo } from '../../lib/seo'
import styles from './MentionsLegales.module.css'

/** Une ligne d'information légale ; les valeurs que l'entreprise doit encore fournir s'affichent « À préciser ». */
function Ligne({ label, value }: { label: string; value: string | null }) {
  return (
    <div className={styles.ligne}>
      <dt>{label}</dt>
      <dd data-inconnu={value === null || undefined}>{value ?? A_PRECISER}</dd>
    </div>
  )
}

export default function MentionsLegales() {
  useHeroTone('clair')
  useSeo({ title: 'Mentions légales', description: 'Éditeur, hébergement, données personnelles et crédits du site d’Aqualiner 34.' })
  const { address } = company

  return (
    <section className={styles.mentions} aria-labelledby="mentions-titre">
      <div className="grille">
        <h1 id="mentions-titre" className={`titre-page ${styles.titre}`}>
          Mentions légales
        </h1>

        <div className={styles.corps}>
          <section aria-labelledby="editeur">
            <h2 id="editeur" className="titre-sous">
              Éditeur du site
            </h2>
            <dl className={styles.fiche}>
              <Ligne label="Entreprise" value={company.name} />
              <Ligne label="Adresse" value={`${address.street}, ${address.postalCode} ${address.city}`} />
              <Ligne label="Téléphone" value={company.phone.display} />
              <Ligne label="E-mail" value={company.email} />
              <Ligne label="Forme juridique" value={null} />
              <Ligne label="Capital social" value={null} />
              <Ligne label="SIRET et RCS" value={null} />
              <Ligne label="TVA intracommunautaire" value={null} />
              <Ligne label="Directeur de la publication" value={company.publisher} />
            </dl>
          </section>

          <section aria-labelledby="hebergement">
            <h2 id="hebergement" className="titre-sous">
              Hébergement
            </h2>
            <p className="texte">
              Cette préversion est hébergée par GitHub Pages : GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis.
              L’hébergeur du site définitif reste à préciser.
            </p>
          </section>

          <section aria-labelledby="donnees">
            <h2 id="donnees" className="titre-sous">
              Données personnelles
            </h2>
            <p className="texte">
              Le site ne dépose aucun cookie, ne mesure pas l’audience et ne charge aucune ressource d’un autre site : polices et images sont servies
              depuis le site lui-même.
            </p>
            <p className="texte">
              Le formulaire de contact n’envoie rien à un serveur : il prépare un e-mail dans votre propre messagerie, que vous relisez et envoyez
              vous-même. Les informations ainsi transmises servent à répondre à votre demande ; vous pouvez en demander la consultation ou la
              suppression en écrivant à <a href={`mailto:${company.email}`}>{company.email}</a>.
            </p>
          </section>

          <section aria-labelledby="credits">
            <h2 id="credits" className="titre-sous">
              Crédits
            </h2>
            <ul className={styles.credits}>
              <li>Photographies : chantiers réalisés par Aqualiner 34, reprises du site aqualiner34.fr.</li>
              <li>Matières en relief, à sec et sous l’eau : images du nuancier Renolit Alkorplan Touch, reprises du site aqualiner34.fr.</li>
              <li>
                Article de presse : <cite>L’Activité Piscine</cite>, n° 105, septembre 2017.
              </li>
              <li>Badge Pro Piscine : Fédération des professionnels de la piscine.</li>
              <li>Caractère typographique : Archivo, d’Omnibus-Type, sous licence SIL Open Font License 1.1.</li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  )
}
