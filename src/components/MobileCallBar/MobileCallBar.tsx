import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'
import { useLocation } from 'react-router'
import { company } from '../../content/company'
import { useLayout } from '../../lib/layout'
import Plaque from '../Plaque/Plaque'
import styles from './MobileCallBar.module.css'

/** Sur téléphone : appeler ou décrire son projet en un geste, depuis n'importe quelle page. */
export default function MobileCallBar() {
  const { menuOpen } = useLayout()
  const { pathname } = useLocation()
  const { scrollY } = useScroll()
  const [past, setPast] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)

  // Le pied de page porte déjà le téléphone : la barre s'efface quand il entre à l'écran.
  useMotionValueEvent(scrollY, 'change', (y) => {
    setPast(y > window.innerHeight * 0.7)
    const footer = document.getElementById('le-fond')
    setFooterVisible(Boolean(footer && footer.getBoundingClientRect().top < window.innerHeight))
  })

  const visible = past && !footerVisible && !menuOpen && pathname !== '/contact'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.barre}
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          exit={{ y: '110%' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Plaque href={company.phone.href} variant="ardoise" className={styles.bouton}>
            Appeler
          </Plaque>
          <Plaque to="/contact" variant="rouge" className={styles.bouton}>
            Votre projet
          </Plaque>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
