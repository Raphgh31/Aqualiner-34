import { createProgram, startLoop } from './gl'
import { CAUSTICS, NOISE } from './glsl'

/**
 * Le fond du bassin, sous le pied de page : la lumière qui joue sur la membrane, à peine,
 * plus présente vers le bas. Elle n'ajoute que 7 % de turquoise : le texte garde son contraste.
 */
const FRAGMENT = /* glsl */ `
precision mediump float;
varying vec2 v_uv;
uniform vec2 u_resolution;
uniform float u_time;

${NOISE}
${CAUSTICS}

void main() {
  vec2 p = v_uv * vec2(u_resolution.x / u_resolution.y, 1.0) * 3.4;
  float light = caustics(p, u_time * 0.55);
  float depth = smoothstep(0.15, 1.0, v_uv.y);
  vec3 fond = vec3(0.0745, 0.1882, 0.2392);
  vec3 eau = vec3(0.3608, 0.7882, 0.7765);
  gl_FragColor = vec4(fond + eau * light * 0.07 * depth, 1.0);
}
`

export type Floor = { destroy: () => void }

export function createFloor(canvas: HTMLCanvasElement, options: { reducedMotion: boolean; onSlow?: () => void }): Floor | null {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, failIfMajorPerformanceCaveat: true })
  if (!gl) return null
  const { uniform } = createProgram(gl, FRAGMENT)
  // Des caustiques douces n'ont pas besoin de la pleine définition.
  const loop = startLoop({
    canvas,
    gl,
    reducedMotion: options.reducedMotion,
    maxPixelRatio: 0.75,
    onSlow: options.onSlow,
    draw: (time, width, height) => {
      gl.uniform2f(uniform('u_resolution'), width, height)
      gl.uniform1f(uniform('u_time'), time)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    },
  })
  return {
    destroy: () => {
      loop.stop()
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    },
  }
}
