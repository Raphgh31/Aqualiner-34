export type HeroState = {
  /** Zoom sur la première photo (la croix). */
  zoom0: number
  /** Zoom sur la seconde photo (l'angle de l'escalier), qui se relâche quand la vue s'ouvre. */
  zoom1: number
  /** Passage de la première à la seconde photo. */
  mix: number
  /** Resserrement du cadre (0 : plein écran, 1 : cadre le plus serré). */
  frame: number
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a))
  return t * t * (3 - 2 * t)
}
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3
const round = (v: number) => Math.round(v * 1e4) / 1e4

/**
 * Chorégraphie du hero selon la progression du défilement (0 → 1) :
 * la caméra plonge vers la croix pendant que le cadre se resserre,
 * puis la vue s'ouvre sur le même bassin vu depuis l'escalier.
 */
export function heroState(progress: number): HeroState {
  const p = clamp01(progress)
  return {
    zoom0: round(1 + 1.5 * easeInOutSine(clamp01(p / 0.52))),
    zoom1: round(1.35 - 0.35 * easeOutCubic(clamp01((p - 0.42) / 0.5))),
    mix: round(smoothstep(0.42, 0.7, p)),
    frame: round(smoothstep(0.05, 0.38, p) * (1 - smoothstep(0.55, 0.85, p))),
  }
}
