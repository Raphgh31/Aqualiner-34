import Nuancier from '../../../components/Nuancier/Nuancier'
import styles from './Couleur.module.css'

export default function Couleur() {
  return (
    <section className={styles.couleur} aria-labelledby="couleur-titre">
      <div className="grille">
        <h2 id="couleur-titre" className={`titre-section ${styles.titre}`}>
          L’eau prend la couleur de ce qu’on lui donne.
        </h2>
        <p className={`texte secondaire ${styles.texte}`}>
          La teinte de la membrane change tout : un fond clair donne une eau turquoise, un fond anthracite une eau profonde, presque minérale.
          Choisissez une finition, puis passez la main sur l’eau.
        </p>
        <div className={styles.outil}>
          <Nuancier />
        </div>
      </div>
    </section>
  )
}
