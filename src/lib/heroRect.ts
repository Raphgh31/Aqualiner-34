/** Dimensions utiles d'une photo du manifeste. */
type Picture = { w: number; h: number; widths: number[] }
export type Rect = { top: number; left: number; width: number; height: number }

/** Au-delà de cette largeur de fenêtre, la fiche projet s'ouvre sur une photo plein écran. */
export const DESKTOP = 1024

/** Une photo déclinée jusqu'à 1600 px tient le plein écran ; en deçà, elle reste encadrée pour rester nette. */
export function heroLayout(picture: Picture): 'plein' | 'cadre' {
  return Math.max(...picture.widths) >= 1600 ? 'plein' : 'cadre'
}

/**
 * Place occupée par la photo du hero d'une fiche projet, pour que « Projet suivant » s'agrandisse exactement
 * jusqu'à elle. null : pas d'agrandissement (photo encadrée sur ordinateur).
 */
export function projectHeroRect(picture: Picture, viewport: { width: number; height: number }, header: number): Rect | null {
  if (viewport.width >= DESKTOP) {
    return heroLayout(picture) === 'plein' ? { top: 0, left: 0, width: viewport.width, height: viewport.height } : null
  }
  return { top: header, left: 0, width: viewport.width, height: Math.round((viewport.width * picture.h) / picture.w) }
}
