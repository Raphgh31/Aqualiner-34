import Img from '../../components/Img/Img'
import Plaque from '../../components/Plaque/Plaque'
import TextLink from '../../components/TextLink/TextLink'
import { useHeroTone } from '../../lib/layout'
import { useSeo } from '../../lib/seo'
import styles from './NotFound.module.css'

export default function NotFound() {
  useHeroTone('clair')
  useSeo({ title: 'Page introuvable', description: 'Cette page n’existe pas ou plus sur le site d’Aqualiner 34.' })
  return (
    <section className={styles.vide} aria-labelledby="introuvable-titre">
      <div className="grille">
        <div className={styles.texte}>
          <h1 id="introuvable-titre" className="titre-page">
            Ce bassin est vide.
          </h1>
          <p className="chapo">La page demandée n’existe pas, ou plus. Le reste du site, lui, est bien en eau.</p>
          <div className={styles.actions}>
            <Plaque to="/" variant="ardoise" fleche>
              Revenir à l’accueil
            </Plaque>
            <TextLink to="/realisations">Voir les réalisations</TextLink>
          </div>
        </div>
        <figure className={styles.photo}>
          <Img id="angle-vide" sizes="(min-width: 1024px) 640px, 100vw" intrinsic />
          <figcaption className="legende">Un bassin vidé, juste avant la pose de sa nouvelle membrane.</figcaption>
        </figure>
      </div>
    </section>
  )
}
