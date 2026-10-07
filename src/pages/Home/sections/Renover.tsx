import BeforeAfter from '../../../components/BeforeAfter/BeforeAfter'
import TextLink from '../../../components/TextLink/TextLink'
import styles from './Renover.module.css'

export default function Renover() {
  return (
    <section className={styles.renover} aria-labelledby="renover-titre">
      <div className="grille">
        <div className={styles.texte}>
          <h2 id="renover-titre" className="titre-section">
            Rénover plutôt que reconstruire.
          </h2>
          <p className="texte">
            Liner percé, fuites, coque abîmée, peinture qui s’écaille : la membrane armée se pose sur presque tous les supports. La structure est
            conservée ; seule l’étanchéité change, et avec elle la couleur de l’eau.
          </p>
          <p className="texte secondaire">Béton, carrelage, peinture, coque polyester ou panneaux métalliques : chaque support est étudié avant la pose.</p>
          <TextLink to="/realisations/au-pied-du-chateau">Voir la rénovation au pied du château</TextLink>
        </div>
        <div className={styles.comparaison}>
          {/* Les deux photos ne sont pas prises exactement du même point : à 30 %, le château n'apparaît qu'une fois. */}
          <BeforeAfter
            before="chateau-avant"
            after="chateau-pose"
            labels={['Avant', 'Membrane posée']}
            caption="Le bassin vidé, puis la membrane posée avant la mise en eau, photographiés depuis le même coin."
            sizes="(min-width: 1024px) 760px, 100vw"
            initial={30}
          />
        </div>
      </div>
    </section>
  )
}
