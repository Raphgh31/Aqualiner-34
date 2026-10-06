/** Petits outils WebGL 1 : programme plein cadre, textures, boucle de rendu économe. */

export const VERTEX = /* glsl */ `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  v_uv.y = 1.0 - v_uv.y;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type)
  if (!shader) throw new Error('Shader impossible à créer')
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(`Shader invalide : ${log}`)
  }
  return shader
}

export type Program = {
  program: WebGLProgram
  uniform: (name: string) => WebGLUniformLocation | null
}

/** Programme qui dessine un triangle couvrant tout le canevas. */
export function createProgram(gl: WebGLRenderingContext, fragment: string): Program {
  const program = gl.createProgram()
  if (!program) throw new Error('Programme impossible à créer')
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX))
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragment))
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(`Liaison impossible : ${gl.getProgramInfoLog(program)}`)
  gl.useProgram(program)

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const position = gl.getAttribLocation(program, 'a_position')
  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

  const cache = new Map<string, WebGLUniformLocation | null>()
  return {
    program,
    uniform: (name) => {
      if (!cache.has(name)) cache.set(name, gl.getUniformLocation(program, name))
      return cache.get(name) ?? null
    },
  }
}

/** Texture depuis une image chargée (dimensions quelconques : pas de mipmaps, bords bloqués ou répétés en miroir). */
export function createTexture(gl: WebGLRenderingContext, source: TexImageSource, repeat = false): WebGLTexture {
  const texture = gl.createTexture()
  if (!texture) throw new Error('Texture impossible à créer')
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source)
  const isPowerOfTwo = (n: number) => (n & (n - 1)) === 0
  const width = 'width' in source ? Number(source.width) : 0
  const height = 'height' in source ? Number(source.height) : 0
  const canRepeat = repeat && isPowerOfTwo(width) && isPowerOfTwo(height)
  const wrap = canRepeat ? gl.MIRRORED_REPEAT : gl.CLAMP_TO_EDGE
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  return texture
}

export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.decoding = 'async'
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`Image introuvable : ${url}`))
    image.src = url
  })
}

/** Redimensionne une image à des dimensions puissances de deux (pour la répétition en miroir). */
export function toPowerOfTwo(image: HTMLImageElement, size = 1024): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  canvas.getContext('2d')?.drawImage(image, 0, 0, size, size)
  return canvas
}

type LoopOptions = {
  canvas: HTMLCanvasElement
  gl: WebGLRenderingContext
  /** Dessine une image ; `time` en secondes (figé si le mouvement est réduit). */
  draw: (time: number, width: number, height: number) => void
  reducedMotion: boolean
  maxPixelRatio?: number
  onContextLost?: () => void
}

/**
 * Boucle de rendu : seulement quand le canevas est visible et l'onglet actif,
 * une seule image si le mouvement est réduit, densité de pixels plafonnée.
 */
export function startLoop({ canvas, gl, draw, reducedMotion, maxPixelRatio = 1.5, onContextLost }: LoopOptions) {
  let frame = 0
  let visible = false
  let running = false
  let lost = false
  const start = performance.now()

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, maxPixelRatio)
    const width = Math.max(1, Math.round(canvas.clientWidth * ratio))
    const height = Math.max(1, Math.round(canvas.clientHeight * ratio))
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
    }
    gl.viewport(0, 0, canvas.width, canvas.height)
  }

  const renderOnce = () => {
    if (lost) return
    resize()
    draw(reducedMotion ? 0 : (performance.now() - start) / 1000, canvas.width, canvas.height)
  }

  const tick = () => {
    renderOnce()
    frame = requestAnimationFrame(tick)
  }

  const update = () => {
    const shouldRun = visible && !document.hidden && !reducedMotion && !lost
    if (shouldRun && !running) {
      running = true
      frame = requestAnimationFrame(tick)
    } else if (!shouldRun && running) {
      running = false
      cancelAnimationFrame(frame)
    }
  }

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    if (visible) renderOnce()
    update()
  })
  observer.observe(canvas)

  const resizeObserver = new ResizeObserver(() => renderOnce())
  resizeObserver.observe(canvas)

  const onVisibility = () => update()
  document.addEventListener('visibilitychange', onVisibility)

  const onLost = (event: Event) => {
    event.preventDefault()
    lost = true
    update()
    onContextLost?.()
  }
  canvas.addEventListener('webglcontextlost', onLost)

  renderOnce()

  return {
    /** Redessine une fois (après un changement d'état, utile quand la boucle est arrêtée). */
    invalidate: () => {
      if (!running) requestAnimationFrame(renderOnce)
    },
    stop: () => {
      running = false
      cancelAnimationFrame(frame)
      observer.disconnect()
      resizeObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      canvas.removeEventListener('webglcontextlost', onLost)
    },
  }
}
