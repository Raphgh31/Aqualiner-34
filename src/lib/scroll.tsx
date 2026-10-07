import Lenis from 'lenis'
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router'
import { scrollPositions } from './scrollMemory'
import { useFinePointer, useReducedMotion } from './useMediaQuery'

type ScrollApi = {
  /** Remonte en haut de page sans animation (changement de page). */
  toTop: () => void
  /** Place la page à une position donnée, sans animation (retour arrière). */
  jump: (y: number) => void
  /** Bloque le défilement (menu ouvert, visionneuse, transition). */
  lock: (locked: boolean) => void
}

const ScrollContext = createContext<ScrollApi>({ toTop: () => window.scrollTo(0, 0), jump: (y) => window.scrollTo(0, y), lock: () => {} })

/** Défilement doux sur ordinateur seulement ; jamais si « réduire les animations » est actif. */
export function ScrollProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const lenis = useRef<Lenis | null>(null)
  const [locked, setLocked] = useState(false)
  const { key } = useLocation()
  const lastY = useRef(0)
  const lastKey = useRef(key)

  // Le site rétablit lui-même la position au retour arrière, une fois l'ancienne page couverte.
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    const onScroll = () => {
      lastY.current = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Au changement d'entrée d'historique, on retient où l'on était sur la page quittée.
  useEffect(() => {
    if (lastKey.current === key) return
    scrollPositions.set(lastKey.current, lastY.current)
    lastKey.current = key
  }, [key])

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

  const jump = useCallback((y: number) => {
    if (lenis.current) lenis.current.scrollTo(y, { immediate: true, force: true })
    window.scrollTo(0, y)
    lastY.current = window.scrollY
  }, [])

  const toTop = useCallback(() => jump(0), [jump])

  return <ScrollContext.Provider value={{ toTop, jump, lock: setLocked }}>{children}</ScrollContext.Provider>
}

export const useScrollApi = () => useContext(ScrollContext)
