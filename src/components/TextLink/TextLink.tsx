import type { ReactNode } from 'react'
import { Link } from 'react-router'
import styles from './TextLink.module.css'

type TextLinkProps = { children: ReactNode; to?: string; href?: string; className?: string; external?: boolean }

/** Lien de texte : le trait se dessine de gauche à droite au survol. */
export default function TextLink({ children, to, href, className, external }: TextLinkProps) {
  const classes = [styles.lien, className].filter(Boolean).join(' ')
  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      {children}
    </a>
  )
}
