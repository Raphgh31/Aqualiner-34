/** Index circulaire : après la dernière photo vient la première, et inversement. */
export function wrapIndex(index: number, length: number): number {
  return ((index % length) + length) % length
}
