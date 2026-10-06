import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

/** Ton du haut de page : « sombre » quand la page s'ouvre sur une photo, « clair » sur fond émail. */
export type HeroTone = 'sombre' | 'clair'

type Layout = {
  tone: HeroTone
  setTone: (tone: HeroTone) => void
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}

const LayoutContext = createContext<Layout | null>(null)

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [tone, setTone] = useState<HeroTone>('clair')
  const [menuOpen, setMenuOpen] = useState(false)
  return <LayoutContext.Provider value={{ tone, setTone, menuOpen, setMenuOpen }}>{children}</LayoutContext.Provider>
}

export function useLayout(): Layout {
  const layout = useContext(LayoutContext)
  if (!layout) throw new Error('useLayout doit être utilisé dans LayoutProvider')
  return layout
}

/** Chaque page déclare le ton de son ouverture. */
export function useHeroTone(tone: HeroTone) {
  const { setTone } = useLayout()
  useEffect(() => setTone(tone), [tone, setTone])
}
