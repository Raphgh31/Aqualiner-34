import type { MouseEventHandler, ReactNode } from 'react'
import { Link } from 'react-router'
import styles from './Plaque.module.css'

type Variant = 'rouge' | 'ardoise' | 'email' | 'ligne'

type PlaqueProps = {
  children: ReactNode
  variant?: Variant
  /** Flèche dessinée : réservée à l'action principale d'une zone. */
  fleche?: boolean
  petite?: boolean
  className?: string
  to?: string
  href?: string
  type?: 'button' | 'submit'
  onClick?: MouseEventHandler<HTMLElement>
  'aria-label'?: string
}

function Fleche() {
  return (
    <svg className={styles.fleche} width="18" height="12" viewBox="0 0 18 12" aria-hidden="true" focusable="false">
      <path d="M0 6h16M11 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

/** Action en forme de plaque émaillée : aplat, angles vifs, libellé qui dit ce qui va se passer. */
export default function Plaque({ children, variant = 'rouge', fleche, petite, className, to, href, type = 'button', onClick, ...rest }: PlaqueProps) {
  const classes = [styles.plaque, styles[variant], petite ? styles.petite : '', className].filter(Boolean).join(' ')
  const content = (
    <>
      <span className={styles.libelle}>{children}</span>
      {fleche && <Fleche />}
    </>
  )
  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} {...rest}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} {...rest}>
        {content}
      </a>
    )
  }
  return (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      {content}
    </button>
  )
}
