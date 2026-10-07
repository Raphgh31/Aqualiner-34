import { createContext, useContext } from 'react'

/**
 * Comment la page affichée est arrivée. React Router annonce toujours « POP » sous un `<Routes location>`
 * (ce que demandent les transitions animées) : l'application lit le vrai type de navigation et le fige
 * avec chaque page, y compris pendant sa sortie.
 */
export type Arrival = { navigationType: 'POP' | 'PUSH' | 'REPLACE'; flight: boolean }

export const ArrivalContext = createContext<Arrival>({ navigationType: 'POP', flight: false })

export const useArrival = () => useContext(ArrivalContext)
