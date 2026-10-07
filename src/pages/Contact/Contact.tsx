import { useSearchParams } from 'react-router'
import ContactForm from '../../components/ContactForm/ContactForm'
import TextLink from '../../components/TextLink/TextLink'
import { company } from '../../content/company'
import { useHeroTone } from '../../lib/layout'
import { useSeo } from '../../lib/seo'
import styles from './Contact.module.css'

export default function Contact() {
  useHeroTone('clair')
  useSeo({
    title: 'Contact',
    description: `Décrivez votre bassin à Aqualiner 34 : rénovation, construction, motif sur mesure. Téléphone ${company.phone.display}, atelier à Abeilhan (Hérault).`,
  })
  const [params] = useSearchParams()

  return (
    <section className={styles.contact} aria-labelledby="contact-titre">
      <div className="grille">
        <div className={styles.entete}>
          <h1 id="contact-titre" className="titre-page">
            Décrivez votre bassin.
          </h1>
          <p className={`chapo ${styles.chapo}`}>
            Quelques questions pour préparer votre demande ; elle part ensuite depuis votre propre messagerie. Vous préférez en parler ? Appelez.
          </p>
        </div>
        <div className={styles.formulaire}>
          <ContactForm initialProjet={params.get('projet') ?? undefined} />
        </div>
        <aside className={styles.direct} aria-label="Coordonnées">
          <div className={styles.bloc}>
            <p className="petit secondaire">Téléphone</p>
            <a href={company.phone.href} className={`mesure ${styles.telephone}`}>
              {company.phone.display}
            </a>
          </div>
          <div className={styles.bloc}>
            <p className="petit secondaire">E-mail</p>
            <a href={`mailto:${company.email}`} className={styles.lien}>
              {company.email}
            </a>
          </div>
          <div className={styles.bloc}>
            <p className="petit secondaire">L’atelier</p>
            <address>
              {company.address.street}
              <br />
              {company.address.postalCode} {company.address.city}
            </address>
            <TextLink href={company.mapsUrl} external>
              Voir sur la carte
            </TextLink>
          </div>
        </aside>
      </div>
    </section>
  )
}
