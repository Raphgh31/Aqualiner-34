import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, type RefObject } from 'react'
import { NavLink } from 'react-router'
import { company } from '../../content/company'
import { useScrollApi } from '../../lib/scroll'
import { NAV } from '../../routes'
import styles from './MobileMenu.module.css'

type MobileMenuProps = { open: boolean; onClose: () => void; returnFocus: RefObject<HTMLButtonElement | null> }

const ease = [0.22, 1, 0.36, 1] as const

export default function MobileMenu({ open, onClose, returnFocus }: MobileMenuProps) {
  const panel = useRef<HTMLDivElement>(null)
  const { lock } = useScrollApi()

  useEffect(() => {
    lock(open)
    if (!open) return
    const node = panel.current
    node?.querySelector<HTMLElement>('a')?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab' || !node) return
      const focusables = [...node.querySelectorAll<HTMLElement>('a, button')]
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    const button = returnFocus.current
    return () => {
      document.removeEventListener('keydown', onKey)
      button?.focus()
    }
  }, [open, onClose, lock, returnFocus])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panel}
          id="menu-plein-ecran"
          className={`${styles.menu} profond`}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.55, ease }}
        >
          <nav aria-label="Navigation principale" className={styles.nav}>
            <ul>
              {NAV.map((item, index) => (
                <motion.li
                  key={item.to}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: 0.12 + index * 0.05 }}
                >
                  <NavLink to={item.to} className={styles.lien} onClick={onClose}>
                    {item.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </nav>
          <div className={styles.contact}>
            <a className={styles.telephone} href={company.phone.href}>
              {company.phone.display}
            </a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <p className={styles.adresse}>
              {company.address.street}, {company.address.postalCode} {company.address.city}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
