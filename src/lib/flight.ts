/** État d'historique posé par « Projet suivant » quand sa photo s'agrandit jusqu'à la page suivante. */
export const FLIGHT_STATE = { transition: 'projet' } as const

/** La page arrive-t-elle par l'agrandissement ? Jamais lors d'un retour arrière ou avant dans l'historique. */
export function isFlight(navigationType: 'POP' | 'PUSH' | 'REPLACE', state: unknown): boolean {
  return navigationType === 'PUSH' && typeof state === 'object' && state !== null && (state as { transition?: unknown }).transition === 'projet'
}
