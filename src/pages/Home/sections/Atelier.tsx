import Img from '../../../components/Img/Img'
import TextLink from '../../../components/TextLink/TextLink'
import { company } from '../../../content/company'
import styles from './Atelier.module.css'

export default function Atelier() {
  return (
    <section className={styles.atelier} aria-labelledby="atelier-titre">
      <div className="grille">
        <h2 id="atelier-titre" className={`titre-section ${styles.titre}`}>
          Avant les piscines, il y avait une pizzeria.
        </h2>
        <div className={styles.recit}>
          <p className="texte">
            En 2003, Wladimir Dubreuil donne un coup de main à un poseur de liners de la région et ne quitte plus les chantiers. Deux ans plus tard,
            Jean-Philippe Pagnon vend la pizzeria qu’ils géraient ensemble près de Béziers pour le rejoindre. Le 1er novembre 2008, en pleine crise
            du marché, ils fondent Aqualiner 34.
          </p>
          <TextLink to="/atelier">L’histoire de l’atelier</TextLink>
        </div>
        <ul className={styles.equipe}>
          {company.team.map((member) => (
            <li key={member.name}>
              <div className={styles.portrait}>
                <Img id={member.photo} sizes="120px" alt="" />
              </div>
              <p className={styles.nom}>{member.name}</p>
              <p className="petit secondaire">{member.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
