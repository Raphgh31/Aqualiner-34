import { useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { company } from '../../content/company'
import { useLayout } from '../../lib/layout'
import { NAV } from '../../routes'
import MobileMenu from '../MobileMenu/MobileMenu'
import Plaque from '../Plaque/Plaque'
import Wordmark from '../Wordmark/Wordmark'
import styles from './Header.module.css'

export default function Header() {
  const { tone, menuOpen, setMenuOpen } = useLayout()
  const { pathname } = useLocation()
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const last = useRef(0)
  const menuButton = useRef<HTMLButtonElement>(null)

  useMotionValueEvent(scrollY, 'change', (y) => {
    // Sur une ouverture photographique, l'en-tête reste transparent tant que la photo est visible.
    const threshold = tone === 'sombre' ? window.innerHeight * 0.82 : 8
    setSolid(y > threshold)
    const goingDown = y > last.current
    setHidden(goingDown && y > Math.max(threshold, 320))
    last.current = y
  })

  // Au changement de page, l'en-tête réapparaît ; sa position est relue une fois la page placée.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setHidden(false)
      setSolid(window.scrollY > 8 && tone === 'clair')
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, tone])

  useEffect(() => setMenuOpen(false), [pathname, setMenuOpen])

  const light = menuOpen || (tone === 'sombre' && !solid)

  return (
    <>
      <header
        className={styles.entete}
        data-clair={light || undefined}
        data-plein={(solid && !menuOpen) || undefined}
        data-cache={(hidden && !menuOpen) || undefined}
      >
        <div className={styles.barre}>
          <Link to="/" className={styles.marque}>
            <Wordmark />
            <span className="visuellement-cache">, retour à l’accueil</span>
          </Link>

          <nav className={styles.nav} aria-label="Navigation principale">
            <ul>
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} className={styles.lien}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <a className={styles.telephone} href={company.phone.href}>
              <span className="visuellement-cache">Appeler le </span>
              {company.phone.display}
            </a>
            <Plaque to="/contact" variant="rouge" petite className={styles.projet}>
              Votre projet
            </Plaque>
          </div>

          <button
            ref={menuButton}
            type="button"
            className={styles.menuBouton}
            aria-expanded={menuOpen}
            aria-controls="menu-plein-ecran"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span>{menuOpen ? 'Fermer' : 'Menu'}</span>
            <span className={styles.traits} aria-hidden="true" data-ouvert={menuOpen || undefined}>
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} returnFocus={menuButton} />
    </>
  )
}
