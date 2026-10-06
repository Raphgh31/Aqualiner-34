let cached: boolean | undefined

/** Le navigateur peut-il créer un contexte WebGL ? (sinon : images fixes) */
export function canUseWebGL(): boolean {
  if (import.meta.env.MODE !== 'test' && cached !== undefined) return cached
  try {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('webgl', { failIfMajorPerformanceCaveat: true }) ?? canvas.getContext('webgl')
    cached = Boolean(context)
  } catch {
    cached = false
  }
  return cached
}
