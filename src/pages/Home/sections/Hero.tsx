import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { company } from '../../../content/company'
import Plaque from '../../../components/Plaque/Plaque'
import SplitWords from '../../../components/SplitWords/SplitWords'
import TextLink from '../../../components/TextLink/TextLink'
import WaterHero from '../../../components/WaterHero/WaterHero'
import { useReducedMotion } from '../../../lib/useMediaQuery'
import { FOCUS_CROSS, heroState } from '../../../webgl/heroState'
import styles from './Hero.module.css'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * L'ouverture : la croix occitane sous une eau vivante. Au défilement, la caméra plonge vers le motif
 * (le cadre se resserre), puis la vue s'ouvre sur le même bassin vu depuis l'escalier.
 */
export default function Hero() {
  const reduced = useReducedMotion()
  const sequence = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sequence, offset: ['start start', 'end end'] })

  const clip = useTransform(scrollYProgress, (p) => {
    const f = heroState(p).frame
    return `inset(${(f * 8).toFixed(2)}vh ${(f * 6).toFixed(2)}vw ${(f * 8).toFixed(2)}vh ${(f * 6).toFixed(2)}vw)`
  })
  const opening = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0])
  const openingY = useTransform(scrollYProgress, [0, 0.2], [0, -56])
  const note = useTransform(scrollYProgress, [0, 0.06], [1, 0])
  const detail = useTransform(scrollYProgress, [0.25, 0.32, 0.47, 0.54], [0, 1, 1, 0])
  const detailY = useTransform(scrollYProgress, [0.25, 0.54], [24, -24])
  const wide = useTransform(scrollYProgress, [0.7, 0.78], [0, 1])

  return (
    <section ref={sequence} className={styles.sequence} data-reduit={reduced || undefined} data-sombre aria-labelledby="titre-accueil">
      <div className={styles.scene}>
        <motion.div className={styles.cadre} style={reduced ? undefined : { clipPath: clip }}>
          <WaterHero progress={scrollYProgress} />
          <div className={styles.voile} aria-hidden="true" />
        </motion.div>

        <motion.div className={styles.ouverture} style={reduced ? undefined : { opacity: opening, y: openingY }}>
          <h1 id="titre-accueil" className={`titre-hero ${styles.titre}`}>
            <SplitWords text="Piscines rénovées" delay={0.15} />
            <br />
            <SplitWords text="de fond en comble." delay={0.29} />
          </h1>
          <motion.div
            className={styles.suite}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.75 }}
          >
            <p className={`chapo ${styles.chapo}`}>
              Membrane armée posée et soudée sur place : rénovation et construction de bassins autour de Béziers, Agde et Pézenas, depuis 2008.
            </p>
            <div className={styles.projet} role="group" aria-label="Votre projet">
              <Plaque to="/contact?projet=renovation" variant="rouge" fleche>
                Rénover mon bassin
              </Plaque>
              <Plaque to="/contact?projet=construction" variant="email">
                Construire
              </Plaque>
              <Plaque to="/contact?projet=motif" variant="email">
                Un motif sur mesure
              </Plaque>
            </div>
            <p className={`petit ${styles.appel}`}>
              ou appelez le{' '}
              <a href={company.phone.href} className="chiffres">
                {company.phone.display}
              </a>
            </p>
          </motion.div>
        </motion.div>

        <motion.p
          className={styles.annotation}
          style={{ opacity: reduced ? 1 : note, left: `${FOCUS_CROSS[0] * 100}%`, top: `${FOCUS_CROSS[1] * 100}%` }}
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 0.9, ease, delay: 1.1 }}
        >
          <span className={styles.point} aria-hidden="true" />
          <span className={styles.trait} aria-hidden="true" />
          <span className={styles.note}>Croix occitane soudée au fond, juillet 2018</span>
        </motion.p>

        {!reduced && (
          <>
            <motion.div className={styles.detail} style={{ opacity: detail, y: detailY }}>
              <p className="titre-sous">Une croix occitane découpée dans une membrane claire, puis soudée au fond.</p>
              <p className={`petit ${styles.precision}`}>La fine ligne qui la traverse : la soudure entre deux lés.</p>
            </motion.div>

            <motion.div className={styles.large} style={{ opacity: wide }}>
              <p className="titre-sous">Le même bassin, depuis l’escalier.</p>
              <p className={styles.precision}>Banquette et marches habillées de la même membrane anthracite.</p>
              <TextLink to="/realisations/croix-occitane">Voir le projet</TextLink>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}
