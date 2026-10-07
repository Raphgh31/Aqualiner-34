import Faq from '../../components/Faq/Faq'
import Img from '../../components/Img/Img'
import Plaque from '../../components/Plaque/Plaque'
import ZoneMap from '../../components/ZoneMap/ZoneMap'
import { company, zoneSentence } from '../../content/company'
import { faq } from '../../content/faq'
import { services } from '../../content/services'
import { useHeroTone } from '../../lib/layout'
import { useSeo } from '../../lib/seo'
import styles from './Services.module.css'

export default function Services() {
  useHeroTone('clair')
  useSeo({
    title: 'Services',
    description:
      'Étanchéité en membrane armée, transformation et construction de bassins, local technique, réseau hydraulique, sécurité, bassins professionnels. Autour de Béziers, Agde et Pézenas.',
  })

  return (
    <>
      <section className={styles.ouverture} aria-labelledby="services-titre">
        <div className="grille">
          <h1 id="services-titre" className={`titre-page ${styles.titre}`}>
            Rénover, transformer, construire.
          </h1>
          <p className={`chapo ${styles.chapo}`}>
            Le cœur du métier, c’est l’étanchéité. Autour, tout ce qu’un bassin demande : sa forme, son local technique, son réseau, sa sécurité.
          </p>
        </div>
      </section>

      <section className={styles.prestations} aria-label="Prestations">
        <div className="grille">
          <ul className={styles.liste}>
            {services.map((service) => (
              <li key={service.slug} className={styles.service} id={service.slug}>
                <h2 className={`titre-sous ${styles.nom}`}>{service.title}</h2>
                <div className={styles.contenu}>
                  <p className="texte">{service.text}</p>
                  <ul className={styles.details}>
                    {service.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
                {service.image && (
                  <div className={styles.image}>
                    <Img id={service.image} sizes="(min-width: 1024px) 22vw, 100vw" intrinsic />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`profond ${styles.zone}`} aria-labelledby="zone-titre">
        <div className="grille">
          <div className={styles.zoneTexte}>
            <h2 id="zone-titre" className="titre-section">
              Autour d’Abeilhan.
            </h2>
            <p className="texte">
              Depuis l’atelier d’{company.address.city}, l’équipe se déplace principalement à {zoneSentence}
            </p>
            <p className="petit secondaire">Votre commune n’est pas citée ? Décrivez votre projet : la réponse dira si le chantier est possible.</p>
          </div>
          <div className={styles.carte}>
            <ZoneMap />
          </div>
        </div>
      </section>

      <section className={styles.questions} aria-labelledby="faq-titre">
        <div className="grille">
          <h2 id="faq-titre" className={`titre-section ${styles.faqTitre}`}>
            Questions fréquentes.
          </h2>
          <div className={styles.faq}>
            <Faq questions={faq} />
            <div className={styles.action}>
              <Plaque to="/contact" variant="rouge" fleche>
                Décrire mon projet
              </Plaque>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
