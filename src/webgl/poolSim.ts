import type { Finish } from '../content/finishes'
import { createProgram, createTexture, startLoop } from './gl'
import { CAUSTICS, NOISE, WAVES } from './glsl'

const FRAGMENT = /* glsl */ `
precision highp float;
varying vec2 v_uv;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_motion;
uniform vec3 u_colorA;
uniform vec3 u_colorB;
uniform sampler2D u_texA;
uniform sampler2D u_texB;
uniform float u_hasTexA;
uniform float u_hasTexB;
uniform float u_blend;
uniform vec4 u_ripples[4];

${NOISE}
${WAVES}
${CAUSTICS}

const float L = 9.0;      // longueur du bassin (m)
const float W = 4.4;      // largeur (m)
const float COPING = 0.34; // margelle (m)
const float DECK = 0.3;    // plage autour (m)
const vec3 DECK_COLOR = vec3(0.937, 0.949, 0.945);
const vec3 STONE = vec3(0.885, 0.87, 0.835);

float portrait() { return u_resolution.x < u_resolution.y ? 1.0 : 0.0; }

// Pixel → plan en mètres (axe x dans la longueur du bassin).
vec2 toPlan(vec2 uv) {
  vec2 scene = portrait() > 0.5 ? vec2(W, L) : vec2(L, W);
  scene += 2.0 * (COPING + DECK);
  float scale = min(u_resolution.x / scene.x, u_resolution.y / scene.y);
  vec2 m = (uv - 0.5) * u_resolution / scale;
  return portrait() > 0.5 ? vec2(-m.y, m.x) : m;
}

// Profondeur : trois marches à l'entrée, puis le fond qui descend vers la fosse.
float depthAt(float x) {
  float t = x + L * 0.5;
  if (t < 1.2) return 0.25 * (floor(t / 0.4) + 1.0);
  return mix(1.05, 1.75, smoothstep(1.2, L, t));
}

vec3 floorColor(vec2 p) {
  vec2 tuv = p / 1.25;
  vec3 a = mix(u_colorA, texture2D(u_texA, tuv).rgb, u_hasTexA);
  vec3 b = mix(u_colorB, texture2D(u_texB, tuv).rgb, u_hasTexB);
  vec3 c = mix(a, b, u_blend);
  // grain léger de la membrane
  c *= 0.97 + 0.06 * valueNoise(p * 9.0);
  return c;
}

vec2 rippleGradient(vec2 p, float t) {
  vec2 g = vec2(0.0);
  for (int i = 0; i < 4; i++) {
    vec4 r = u_ripples[i];
    float age = t - r.z;
    if (r.w <= 0.0 || age < 0.0 || age > 5.0) continue;
    vec2 d = p - toPlan(r.xy);
    float dist = length(d) + 1e-4;
    float front = smoothstep(age * 1.9 + 0.25, age * 1.9 - 0.35, dist);
    float env = r.w * exp(-age * 1.05) * exp(-dist * 0.35) * front;
    g += (d / dist) * cos(dist * 15.0 - age * 10.0) * env * 2.4;
  }
  return g;
}

void main() {
  vec2 p = toPlan(v_uv);
  vec2 inner = abs(p) - vec2(L, W) * 0.5;
  float outside = max(inner.x, inner.y);

  if (outside > COPING) {
    gl_FragColor = vec4(DECK_COLOR, 1.0);
    return;
  }
  if (outside > 0.0) {
    // Margelle : pierre claire, arête intérieure éclairée côté soleil, joints réguliers.
    float joint = step(0.985, fract((p.x + p.y * 0.0) / 0.6)) * step(0.0, inner.y) + step(0.985, fract(p.y / 0.6)) * step(0.0, inner.x);
    vec3 stone = STONE * (0.96 + 0.05 * valueNoise(p * 14.0));
    stone *= 1.0 - joint * 0.08;
    float bevel = smoothstep(0.05, 0.0, outside);
    stone *= 1.0 - bevel * 0.12;
    float outer = smoothstep(COPING - 0.012, COPING, outside);
    stone = mix(stone, DECK_COLOR * 0.93, outer);
    gl_FragColor = vec4(stone, 1.0);
    return;
  }

  float t = u_time;
  float depth = depthAt(p.x);
  vec2 grad = (waveGradient(p * 0.55, t) * 0.55 + rippleGradient(p, t)) * u_motion;

  // Le fond vu à travers l'eau : réfraction proportionnelle à la profondeur.
  vec2 fp = p + grad * 0.035 * depth;
  vec3 base = floorColor(fp);

  // Nez de marche et ombre portée des parois (soleil en haut à gauche).
  float tStep = p.x + L * 0.5;
  float nosing = tStep < 1.25 ? smoothstep(0.03, 0.0, abs(fract(tStep / 0.4) - 0.0) * 0.4) : 0.0;
  base = mix(base, base * 1.25 + 0.04, nosing * 0.6);
  float distLeft = p.x + L * 0.5;
  float distTop = p.y + W * 0.5;
  float distWall = min(min(distLeft, L * 0.5 - p.x), min(distTop, W * 0.5 - p.y));
  float shadow = 1.0 - 0.38 * (1.0 - smoothstep(0.0, depth * 0.42, min(distLeft * 1.4, distTop)));
  float ao = 0.82 + 0.18 * smoothstep(0.0, 0.35, distWall);

  float c = caustics(fp * 1.35 + grad * 0.4, t * 0.85);
  float causticStrength = mix(1.0, 0.5, clamp(depth / 1.8, 0.0, 1.0)) * shadow;
  vec3 lit = base * ao * shadow * (0.88 + 0.6 * c * causticStrength);

  // Absorption (aller-retour de la lumière) et diffusion de l'eau.
  vec3 absorb = vec3(0.4, 0.075, 0.09);
  vec3 transmit = exp(-absorb * depth * 2.0);
  float lumFloor = dot(base, vec3(0.299, 0.587, 0.114));
  vec3 scatter = vec3(0.012, 0.125, 0.215) * (1.0 - exp(-depth * 0.9)) * (1.0 - lumFloor * 0.45);
  vec3 color = lit * transmit + scatter;

  // Surface : reflets du ciel et éclats de soleil sur les vagues.
  vec3 n = normalize(vec3(-grad * 0.09, 1.0));
  vec3 r = reflect(vec3(0.0, 0.0, -1.0), n);
  float glint = pow(max(dot(r, normalize(vec3(-0.32, -0.42, 1.0))), 0.0), 220.0);
  color += vec3(1.0, 0.99, 0.95) * glint * 0.55 * u_motion;
  color = mix(color, vec3(0.78, 0.87, 0.92), 0.035);

  // Liseré sombre au pied de la margelle, puis tonalité douce (pas de turquoise criard).
  color *= 0.9 + 0.1 * smoothstep(0.0, 0.03, -outside);
  color = 1.0 - exp(-color * 1.55);
  color = mix(vec3(dot(color, vec3(0.299, 0.587, 0.114))), color, 0.94);
  gl_FragColor = vec4(color, 1.0);
}
`

type FloorSource = TexImageSource | null

export type PoolSim = {
  setFinish: (finish: Finish, texture: FloorSource) => void
  /** Pointeur en fractions du canevas : fait naître une onde. */
  pointer: (x: number, y: number, strength?: number) => void
  destroy: () => void
}

const BLANK = new Uint8Array([128, 128, 128, 255])

export function createPoolSim(
  canvas: HTMLCanvasElement,
  options: { finish: Finish; texture: FloorSource; reducedMotion: boolean; onSlow?: () => void },
): PoolSim | null {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, failIfMajorPerformanceCaveat: true })
  if (!gl) return null
  const { uniform } = createProgram(gl, FRAGMENT)

  const blankTexture = () => {
    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, BLANK)
    return texture
  }

  type Slot = { color: [number, number, number]; texture: WebGLTexture | null; hasTexture: boolean }
  const toSlot = (finish: Finish, source: FloorSource): Slot => ({
    color: finish.color,
    texture: source ? createTexture(gl, source, true) : blankTexture(),
    hasTexture: Boolean(source),
  })

  let a = toSlot(options.finish, options.texture)
  let b = a
  let blend = 1
  let blendStart = 0
  const ripples = new Float32Array(16)
  let rippleIndex = 0
  let clock = 0
  let lastPointer = 0

  const bindSlot = (slot: Slot, unit: number, prefix: 'A' | 'B') => {
    gl.activeTexture(gl.TEXTURE0 + unit)
    gl.bindTexture(gl.TEXTURE_2D, slot.texture)
    gl.uniform1i(uniform(`u_tex${prefix}`), unit)
    gl.uniform3f(uniform(`u_color${prefix}`), ...slot.color)
    gl.uniform1f(uniform(`u_hasTex${prefix}`), slot.hasTexture ? 1 : 0)
  }

  const loop = startLoop({
    canvas,
    gl,
    reducedMotion: options.reducedMotion,
    onSlow: options.onSlow,
    maxPixelRatio: 1.25,
    draw: (time, width, height) => {
      clock = time
      const elapsed = options.reducedMotion ? 1 : Math.min(1, (performance.now() - blendStart) / 650)
      blend = 1 - (1 - elapsed) ** 3
      bindSlot(a, 0, 'A')
      bindSlot(b, 1, 'B')
      gl.uniform1f(uniform('u_blend'), blend)
      gl.uniform2f(uniform('u_resolution'), width, height)
      gl.uniform1f(uniform('u_time'), time)
      gl.uniform1f(uniform('u_motion'), options.reducedMotion ? 0 : 1)
      gl.uniform4fv(uniform('u_ripples'), ripples)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    },
  })

  return {
    setFinish: (finish, source) => {
      if (a !== b && a.texture) gl.deleteTexture(a.texture)
      a = b
      b = toSlot(finish, source)
      blendStart = performance.now()
      loop.invalidate()
      if (options.reducedMotion) window.setTimeout(loop.invalidate, 30)
    },
    pointer: (x, y, strength = 0.6) => {
      if (options.reducedMotion) return
      const now = performance.now()
      if (now - lastPointer < 140) return
      lastPointer = now
      ripples.set([x, y, clock, strength], rippleIndex * 4)
      rippleIndex = (rippleIndex + 1) % 4
    },
    destroy: () => {
      loop.stop()
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    },
  }
}
