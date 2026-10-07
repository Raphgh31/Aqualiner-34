export type NavItem = { to: string; label: string }

export const NAV: NavItem[] = [
  { to: '/realisations', label: 'Réalisations' },
  { to: '/savoir-faire', label: 'Savoir-faire' },
  { to: '/services', label: 'Services' },
  { to: '/atelier', label: 'L’atelier' },
  { to: '/contact', label: 'Contact' },
]

/** Chargement différé des pages, préchargées dès que le navigateur est disponible. */
export const pageLoaders = {
  realisations: () => import('./pages/Realisations/Realisations'),
  projet: () => import('./pages/Projet/Projet'),
  savoirFaire: () => import('./pages/SavoirFaire/SavoirFaire'),
  services: () => import('./pages/Services/Services'),
  atelier: () => import('./pages/Atelier/Atelier'),
  contact: () => import('./pages/Contact/Contact'),
  mentions: () => import('./pages/MentionsLegales/MentionsLegales'),
  introuvable: () => import('./pages/NotFound/NotFound'),
}

export function preloadPages() {
  const run = () => Object.values(pageLoaders).forEach((load) => void load())
  if ('requestIdleCallback' in window) window.requestIdleCallback(run, { timeout: 4000 })
  else setTimeout(run, 2500)
}
