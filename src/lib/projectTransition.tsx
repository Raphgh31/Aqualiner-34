import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import Flight, { type FlightPlan } from '../components/Flight/Flight'
import { useScrollApi } from './scroll'

type ProjectTransition = {
  /** Agrandit la photo de `plan.from` à `plan.to`, puis appelle `go` (la navigation). */
  fly: (plan: FlightPlan, go: () => void) => void
  /** La page d'arrivée affiche sa photo : la photo agrandie peut s'effacer. */
  land: () => void
  flying: boolean
}

const Context = createContext<ProjectTransition>({ fly: (_plan, go) => go(), land: () => {}, flying: false })

/**
 * « Projet suivant » : la photo du projet suivant s'agrandit au-dessus de la page jusqu'à la place exacte
 * qu'elle occupera dans le hero de la fiche suivante. Elle reste posée pendant le changement de page,
 * puis s'efface quand la nouvelle fiche affiche la même photo dessous.
 */
export function ProjectTransitionProvider({ children }: { children: ReactNode }) {
  const { lock } = useScrollApi()
  const [plan, setPlan] = useState<FlightPlan | null>(null)
  const [landing, setLanding] = useState(false)
  const go = useRef<() => void>(() => {})
  const safety = useRef(0)

  const fly = useCallback(
    (next: FlightPlan, navigate: () => void) => {
      go.current = navigate
      setLanding(false)
      setPlan(next)
      lock(true)
    },
    [lock],
  )

  const land = useCallback(() => setLanding(true), [])

  const arrived = useCallback(() => {
    go.current()
    // Filet de sécurité : si la nouvelle fiche ne signale rien, la photo s'efface quand même.
    window.clearTimeout(safety.current)
    safety.current = window.setTimeout(() => setLanding(true), 1500)
  }, [])

  const done = useCallback(() => {
    window.clearTimeout(safety.current)
    setPlan(null)
    setLanding(false)
    lock(false)
  }, [lock])

  useEffect(() => () => window.clearTimeout(safety.current), [])

  return (
    <Context.Provider value={{ fly, land, flying: plan !== null }}>
      {children}
      {plan && <Flight plan={plan} landing={landing} onArrived={arrived} onDone={done} />}
    </Context.Provider>
  )
}

export const useProjectTransition = () => useContext(Context)
