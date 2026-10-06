// @vitest-environment jsdom
import { afterEach, expect, test, vi } from 'vitest'
import { canUseWebGL } from './support'

afterEach(() => vi.restoreAllMocks())

test('sans contexte WebGL, le rendu se replie sur les images', () => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
  expect(canUseWebGL()).toBe(false)
})

test('avec un contexte WebGL, le rendu peut démarrer', () => {
  const fake = { getExtension: () => null } as unknown as WebGLRenderingContext
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(fake as never)
  expect(canUseWebGL()).toBe(true)
})

test("une exception à la création du contexte ne casse pas la page", () => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(() => {
    throw new Error('GPU indisponible')
  })
  expect(canUseWebGL()).toBe(false)
})
