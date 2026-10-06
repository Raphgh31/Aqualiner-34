// Génère les images du site : AVIF + WebP en plusieurs largeurs, couleur dominante,
// dimensions, date de prise de vue, masques WebGL et fichiers de provenance.
// Usage : npm run images  (options : --force pour tout régénérer)

import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { MASKS, MEDIA } from './media.config.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const CACHE = join(ROOT, '.cache', 'media')
const OUT = join(ROOT, 'public', 'media')
const MANIFEST = join(ROOT, 'src', 'content', 'media.generated.json')
const STAMPS = join(CACHE, 'stamps.json')
const FORCE = process.argv.includes('--force')

export const SIZES = {
  plein: [640, 1024, 1600, 2400],
  large: [640, 1024, 1600],
  moyen: [480, 960],
  natif: [640],
}
const AVIF = { quality: 50, effort: 5 }
const WEBP = { quality: 72, effort: 5 }

/** Largeurs effectivement générées : jamais d'agrandissement, au moins une largeur. */
export function widthsFor(set, sourceWidth) {
  const kept = SIZES[set].filter((w) => w < sourceWidth)
  if (kept.length === 0 || SIZES[set].some((w) => w >= sourceWidth)) kept.push(sourceWidth)
  return [...new Set(kept)].sort((a, b) => a - b)
}

/** Date AAAA-MM-JJ lue dans le bloc EXIF brut (la plus ancienne trouvée), sinon null. */
export function exifDate(exif) {
  if (!exif) return null
  const found = exif.toString('latin1').match(/\d{4}:\d{2}:\d{2} \d{2}:\d{2}:\d{2}/g)
  if (!found) return null
  const [first] = found.sort()
  return first.split(' ')[0].replaceAll(':', '-')
}

const hex = ({ r, g, b }) => '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')

async function source(entry) {
  const file = join(CACHE, entry.uri)
  if (!existsSync(file)) {
    const response = await fetch(entry.source)
    if (!response.ok) throw new Error(`Téléchargement impossible (${response.status}) : ${entry.source}`)
    await writeFile(file, Buffer.from(await response.arrayBuffer()))
  }
  return file
}

function cropBox(meta, crop) {
  if (!crop) return null
  const left = Math.round(crop.left * meta.width)
  const top = Math.round(crop.top * meta.height)
  return {
    left,
    top,
    width: Math.min(meta.width - left, Math.round(crop.width * meta.width)),
    height: Math.min(meta.height - top, Math.round(crop.height * meta.height)),
  }
}

async function provenance(file, origin) {
  await writeFile(`${file}.json`, JSON.stringify({ prompt: `Origine : ${origin}`, createdAt: new Date().toISOString() }, null, 2) + '\n')
}

async function buildEntry(entry, stamps) {
  const input = await source(entry)
  const stamp = createHash('sha1').update(JSON.stringify({ entry, SIZES: SIZES[entry.sizes], AVIF, WEBP })).digest('hex')
  const base = sharp(input).rotate()
  const meta = await sharp(input).metadata()
  const oriented = meta.orientation && meta.orientation >= 5 ? { width: meta.height, height: meta.width } : meta
  const box = cropBox(oriented, entry.crop)
  const width = box ? box.width : oriented.width
  const height = box ? box.height : oriented.height
  const widths = widthsFor(entry.sizes, width)

  const pipeline = () => {
    const cropped = box ? base.clone().extract(box) : base.clone()
    // Un dessin transparent est posé sur le fond du site (sinon l'aplat de chargement le masquerait).
    return entry.flatten ? cropped.flatten({ background: entry.flatten }) : cropped
  }
  // Couleur d'attente calculée sur une vignette du rendu final (recadrage et aplat compris).
  const thumb = await pipeline().resize({ width: 64 }).toBuffer()
  const { channels } = await sharp(thumb).stats()
  const average = { r: Math.round(channels[0].mean), g: Math.round(channels[1].mean), b: Math.round(channels[2].mean) }
  const date = entry.date !== undefined ? entry.date : exifDate(meta.exif)

  const outputs = widths.flatMap((w) => [join(OUT, `${entry.id}-${w}.avif`), join(OUT, `${entry.id}-${w}.webp`)])
  const fresh = !FORCE && stamps[entry.id] === stamp && outputs.every((f) => existsSync(f) && existsSync(`${f}.json`))
  if (!fresh) {
    for (const w of widths) {
      const resized = pipeline().resize({ width: w, withoutEnlargement: true })
      const avif = join(OUT, `${entry.id}-${w}.avif`)
      const webp = join(OUT, `${entry.id}-${w}.webp`)
      await resized.clone().avif(AVIF).toFile(avif)
      await resized.clone().webp(WEBP).toFile(webp)
      await provenance(avif, entry.origin)
      await provenance(webp, entry.origin)
    }
    stamps[entry.id] = stamp
  }

  return {
    files: outputs,
    record: { w: width, h: height, color: hex(average), widths, alt: entry.alt, date, origin: entry.origin },
  }
}

async function buildMask(mask) {
  const entry = MEDIA.find((m) => m.id === mask.id)
  const meta = await sharp(await source(entry)).metadata()
  const W = 1024
  const H = Math.round((W * meta.height) / meta.width)
  const points = mask.polygon.map(([x, y]) => `${(x * W).toFixed(1)},${(y * H).toFixed(1)}`).join(' ')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="100%" height="100%" fill="#000"/><polygon points="${points}" fill="#fff"/></svg>`
  const full = await sharp(Buffer.from(svg)).blur(6).greyscale().png().toBuffer()
  const files = []
  // Le masque suit les variantes recadrées de la même photo (même source, recadrage appliqué).
  for (const variant of MEDIA.filter((m) => m.uri === entry.uri)) {
    const box = cropBox({ width: W, height: H }, variant.crop)
    const out = join(OUT, `masque-${variant.id}.png`)
    await (box ? sharp(full).extract(box) : sharp(full)).png({ palette: true, colours: 16 }).toFile(out)
    await sharp(out).png().withMetadata().toBuffer() // vérifie la lisibilité
    await provenance(out, `Masque de la surface de l'eau dessiné d'après la photo « ${entry.id} » (polygone dans scripts/media.config.mjs)`)
    files.push(out)
  }
  return files
}

async function main() {
  await mkdir(CACHE, { recursive: true })
  await mkdir(OUT, { recursive: true })
  const stamps = existsSync(STAMPS) ? JSON.parse(await readFile(STAMPS, 'utf8')) : {}
  const ids = new Set()
  const manifest = {}
  const keep = new Set()

  for (const entry of MEDIA) {
    if (ids.has(entry.id)) throw new Error(`Identifiant en double : ${entry.id}`)
    ids.add(entry.id)
    const { files, record } = await buildEntry(entry, stamps)
    files.forEach((f) => keep.add(f))
    manifest[entry.id] = record
    process.stdout.write(`${entry.id} ${record.widths.join('/')}\n`)
  }
  for (const mask of MASKS) (await buildMask(mask)).forEach((f) => keep.add(f))

  for (const name of await readdir(OUT)) {
    const file = join(OUT, name)
    const raster = file.endsWith('.json') ? file.slice(0, -5) : file
    if (!keep.has(raster)) await rm(file)
  }
  await writeFile(MANIFEST, JSON.stringify(manifest, null, 1) + '\n')
  await writeFile(STAMPS, JSON.stringify(stamps, null, 1))
  console.log(`${Object.keys(manifest).length} images, ${keep.size} fichiers.`)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
