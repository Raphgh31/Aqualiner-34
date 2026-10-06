import { createProgram, createTexture, startLoop } from './gl'
import { CAUSTICS, NOISE, WAVES } from './glsl'
import { heroState } from './heroState'

const FRAGMENT = /* glsl */ `
precision highp float;
varying vec2 v_uv;
uniform sampler2D u_image0;
uniform sampler2D u_image1;
uniform sampler2D u_mask0;
uniform sampler2D u_mask1;
uniform vec2 u_resolution;
uniform vec2 u_size0;
uniform vec2 u_size1;
uniform vec2 u_focus0;
uniform vec2 u_focus1;
uniform float u_zoom0;
uniform float u_zoom1;
uniform float u_mix;
uniform float u_time;
uniform float u_motion;

${NOISE}
${WAVES}
${CAUSTICS}

// Cadrage « cover » centré sur un point d'intérêt, avec zoom.
vec2 coverUv(vec2 uv, vec2 size, vec2 focus, float zoom) {
  float k = max(u_resolution.x / size.x, u_resolution.y / size.y);
  vec2 visible = u_resolution / (size * k) / zoom;
  vec2 center = clamp(focus, visible * 0.5, 1.0 - visible * 0.5);
  return center + (uv - 0.5) * visible;
}

// La photo vue à travers une eau vivante : réfraction et caustiques, seulement là où il y a de l'eau.
vec3 water(sampler2D image, sampler2D mask, vec2 uv, vec2 size, float zoom) {
  vec2 aspect = vec2(size.x / size.y, 1.0);
  float m = texture2D(mask, uv).r;
  vec2 p = uv * aspect;
  vec2 grad = waveGradient(p * 1.6, u_time) * u_motion;
  vec2 offset = grad * 0.0022 * m / aspect;
  vec3 color = texture2D(image, uv + offset).rgb;
  float lum = dot(color, vec3(0.299, 0.587, 0.114));
  float c = caustics(p * 9.0 + grad * 0.12, u_time * 0.7);
  color += vec3(0.8, 0.96, 1.0) * c * 0.085 * m * (0.15 + lum * 1.6) * u_motion;
  return color;
}

void main() {
  vec2 uv0 = coverUv(v_uv, u_size0, u_focus0, u_zoom0);
  vec3 color = water(u_image0, u_mask0, uv0, u_size0, u_zoom0);
  if (u_mix > 0.0) {
    vec2 uv1 = coverUv(v_uv, u_size1, u_focus1, u_zoom1);
    vec3 next = water(u_image1, u_mask1, uv1, u_size1, u_zoom1);
    // Fondu « liquide » : la nouvelle vue gagne par plaques, comme une eau qui se trouble puis s'éclaircit.
    vec2 q = v_uv * vec2(u_resolution.x / u_resolution.y, 1.0);
    float n = valueNoise(q * 3.2 + u_time * 0.05) * 0.65 + valueNoise(q * 9.0) * 0.35;
    float edge = u_mix * 1.3 - 0.15;
    float k = smoothstep(n - 0.14, n + 0.14, edge);
    color = mix(color, next, k);
  }
  gl_FragColor = vec4(color, 1.0);
}
`

export type WaterHeroOptions = {
  images: [HTMLImageElement, HTMLImageElement]
  masks: [HTMLImageElement, HTMLImageElement]
  /** Points d'intérêt (fractions de chaque image) : la croix, puis l'angle de l'escalier. */
  focus: [[number, number], [number, number]]
  reducedMotion: boolean
  onContextLost?: () => void
}

export type WaterHero = { setProgress: (progress: number) => void; destroy: () => void }

export function createWaterHero(canvas: HTMLCanvasElement, options: WaterHeroOptions): WaterHero | null {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, preserveDrawingBuffer: false })
  if (!gl) return null
  const { uniform } = createProgram(gl, FRAGMENT)
  const textures = [...options.images, ...options.masks].map((image) => createTexture(gl, image))
  ;['u_image0', 'u_image1', 'u_mask0', 'u_mask1'].forEach((name, unit) => {
    gl.activeTexture(gl.TEXTURE0 + unit)
    gl.bindTexture(gl.TEXTURE_2D, textures[unit])
    gl.uniform1i(uniform(name), unit)
  })
  gl.uniform2f(uniform('u_size0'), options.images[0].naturalWidth, options.images[0].naturalHeight)
  gl.uniform2f(uniform('u_size1'), options.images[1].naturalWidth, options.images[1].naturalHeight)
  gl.uniform2f(uniform('u_focus0'), ...options.focus[0])
  gl.uniform2f(uniform('u_focus1'), ...options.focus[1])
  gl.uniform1f(uniform('u_motion'), options.reducedMotion ? 0 : 1)

  let state = heroState(0)

  const loop = startLoop({
    canvas,
    gl,
    reducedMotion: options.reducedMotion,
    onContextLost: options.onContextLost,
    draw: (time, width, height) => {
      gl.uniform2f(uniform('u_resolution'), width, height)
      gl.uniform1f(uniform('u_time'), time)
      gl.uniform1f(uniform('u_zoom0'), state.zoom0)
      gl.uniform1f(uniform('u_zoom1'), state.zoom1)
      gl.uniform1f(uniform('u_mix'), state.mix)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    },
  })

  return {
    setProgress: (progress) => {
      state = heroState(progress)
      loop.invalidate()
    },
    destroy: () => {
      loop.stop()
      textures.forEach((texture) => gl.deleteTexture(texture))
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    },
  }
}
