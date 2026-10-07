/** Position de défilement quittée, par entrée d'historique (clé de location). */
export const scrollPositions = new Map<string, number>()

/** Où ouvrir une page : en haut, sauf au retour arrière (ou avant) vers une position connue. */
export function scrollTarget(navigationType: 'POP' | 'PUSH' | 'REPLACE', key: string, memory: Map<string, number> = scrollPositions): number {
  if (navigationType !== 'POP') return 0
  return memory.get(key) ?? 0
}
