/** « 1,23 m » (repère) ou « 1,5 » (graduation), virgule décimale française. */
export function formatDepth(meters: number, withUnit = true): string {
  const value = Math.max(0, meters)
  const text = value.toFixed(withUnit ? 2 : 1).replace('.', ',')
  return withUnit ? `${text} m` : text
}

/** Profondeur lue sur la jauge pour une position de défilement : 0 en haut de page, `max` en bas. */
export function depthAt(scrollY: number, scrollHeight: number, viewportHeight: number, max: number): number {
  const range = scrollHeight - viewportHeight
  if (range <= 0) return 0
  return Math.min(1, Math.max(0, scrollY / range)) * max
}
