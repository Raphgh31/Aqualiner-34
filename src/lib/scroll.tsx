import Lenis from 'lenis'
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { useFinePointer, useReducedMotion } from './useMediaQuery'

type ScrollApi = {
  /** Remonte en haut de page sans animation (changement de page). */
  toTop: () => void
  /** Bloque le défilement (menu ouvert). */
  lock: (locked: boolean) => void
}

const ScrollContext = createContext<ScrollApi>({ toTop: () => window.scrollTo(0, 0), lock: () => {} })

/** Défilement doux sur ordinateur seulement ; jamais si « réduire les animations » est actif. */
export function ScrollProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const lenis = useRef<Lenis | null>(null)
  const [locked, setLocked] = useState(false)

  useEffect(() => {
    if (reduced || !fine) return
    const instance = new Lenis({ lerp: 0.12, smoothWheel: true, wheelMultiplier: 0.9 })
    lenis.current = instance
    let frame = 0
    const loop = (time: number) => {
      instance.raf(time)
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(frame)
      instance.destroy()
      lenis.current = null
    }
  }, [reduced, fine])

  useEffect(() => {
    document.documentElement.style.overflow = locked ? 'hidden' : ''
    if (locked) lenis.current?.stop()
    else lenis.current?.start()
  }, [locked])

  const toTop = useCallback(() => {
    if (lenis.current) lenis.current.scrollTo(0, { immediate: true, force: true })
    window.scrollTo(0, 0)
  }, [])

  return <ScrollContext.Provider value={{ toTop, lock: setLocked }}>{children}</ScrollContext.Provider>
}

export const useScrollApi = () => useContext(ScrollContext)
