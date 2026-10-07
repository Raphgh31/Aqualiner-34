/** Au-delà de cette durée moyenne par image (moins de 25 images par seconde), l'eau ralentit la page. */
export const SLOW_FRAME_MS = 40

/** Définitions de rendu essayées tour à tour, en fraction de la densité de pixels. */
const STEPS = [1, 0.75, 0.5]

/** Au-delà, même en baissant la définition, l'eau ne redeviendrait pas fluide (rendu logiciel). */
const HOPELESS_FRAME_MS = SLOW_FRAME_MS * 3

/** Définition suivante selon la durée moyenne mesurée ; null : mieux vaut figer l'eau. */
export function nextScale(averageMs: number, scale: number): number | null {
  if (averageMs <= SLOW_FRAME_MS) return scale
  if (averageMs > HOPELESS_FRAME_MS) return null
  return STEPS.find((step) => step < scale) ?? null
}
