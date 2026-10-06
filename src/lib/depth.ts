/** « 1,23 m » (repère) ou « 1,5 » (graduation), virgule décimale française. */
export function formatDepth(meters: number, withUnit = true): string {
  const value = Math.max(0, meters)
  const text = value.toFixed(withUnit ? 2 : 1).replace('.', ',')
  return withUnit ? `${text} m` : text
}
