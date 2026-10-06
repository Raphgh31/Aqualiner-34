import manifest from './media.generated.json'

export type MediaId = keyof typeof manifest

export type Media = {
  id: MediaId
  w: number
  h: number
  color: string
  widths: number[]
  alt: string
  date: string | null
  origin: string
}

type Format = 'avif' | 'webp'

const records = manifest as Record<MediaId, Omit<Media, 'id'>>

export const allMedia: Media[] = (Object.keys(records) as MediaId[]).map((id) => ({ id, ...records[id] }))

export function getMedia(id: MediaId): Media {
  const record = records[id]
  if (!record) throw new Error(`Image inconnue : ${id}`)
  return { id, ...record }
}

export function mediaUrl(id: MediaId, width: number, format: Format): string {
  return `${import.meta.env.BASE_URL}media/${id}-${width}.${format}`
}

export function srcSet(media: Media, format: Format): string {
  return media.widths.map((w) => `${mediaUrl(media.id, w, format)} ${w}w`).join(', ')
}

/** Largeur la plus proche (par excès) d'une largeur cible, pour les usages hors <picture> (WebGL). */
export function closestWidth(media: Media, target: number): number {
  return media.widths.find((w) => w >= target) ?? media.widths[media.widths.length - 1]
}
