import { motion } from 'motion/react'
import { membrane } from '../../content/services'
import styles from './MembraneDiagram.module.css'

const H = 440
const LEFT = 40
const RIGHT = 460
const MID = (LEFT + RIGHT) / 2
const DEPTH = 66

type Layer = { top: string; left: string; right: string; thickness: number; y: number; packed: number; trame?: boolean; edge: string }

/** Les quatre couches, du côté de l'eau vers le support : position éclatée (y) et position serrée (packed). */
const LAYERS: Layer[] = [
  { top: 'rgb(92 201 198 / 0.3)', left: 'rgb(92 201 198 / 0.5)', right: 'rgb(92 201 198 / 0.4)', thickness: 4, y: 92, packed: 206, edge: 'rgb(92 201 198 / 0.95)' },
  { top: '#3b4a52', left: '#2a353b', right: '#222c31', thickness: 14, y: 186, packed: 210, edge: '#13303d' },
  { top: '#eef2f1', left: '#d3dbdb', right: '#c4cdcd', thickness: 8, y: 280, packed: 224, trame: true, edge: '#9fb0b6' },
  { top: '#9aa5aa', left: '#7f8a8f', right: '#727d82', thickness: 14, y: 368, packed: 232, edge: '#5a6369' },
]

const pts = (points: [number, number][]) => points.map(([x, y]) => `${x},${y}`).join(' ')

function Trame({ y }: { y: number }) {
  const A: [number, number] = [LEFT, y]
  const B: [number, number] = [MID, y - DEPTH]
  const C: [number, number] = [RIGHT, y]
  const D: [number, number] = [MID, y + DEPTH]
  const lerp = (p: [number, number], q: [number, number], t: number) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]
  const lines = []
  for (let i = 1; i < 16; i++) {
    const t = i / 16
    const [x1, y1] = lerp(A, B, t)
    const [x2, y2] = lerp(D, C, t)
    const [x3, y3] = lerp(A, D, t)
    const [x4, y4] = lerp(B, C, t)
    lines.push(<line key={`a${i}`} x1={x1} y1={y1} x2={x2} y2={y2} />, <line key={`b${i}`} x1={x3} y1={y3} x2={x4} y2={y4} />)
  }
  return <g className={styles.fils}>{lines}</g>
}

/**
 * Éclaté de la membrane armée : vernis, PVC, trame polyester, PVC. Les couches, serrées au départ,
 * s'écartent quand le schéma entre à l'écran (le moment orchestré de la page) ; immobile si l'animation est réduite.
 */
export default function MembraneDiagram() {
  return (
    <figure className={styles.eclate}>
      <div className={styles.schema}>
        <motion.svg viewBox={`0 0 520 ${H}`} className={styles.svg} aria-hidden="true" initial="serre" whileInView="eclate" viewport={{ once: true, amount: 0.6 }}>
          {LAYERS.map((layer, index) => {
            const { y, thickness: t } = layer
            const A: [number, number] = [LEFT, y]
            const B: [number, number] = [MID, y - DEPTH]
            const C: [number, number] = [RIGHT, y]
            const D: [number, number] = [MID, y + DEPTH]
            return (
              <motion.g
                key={index}
                variants={{
                  serre: { y: layer.packed - y },
                  eclate: { y: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 + (LAYERS.length - index) * 0.06 } },
                }}
              >
                <polygon points={pts([A, D, [MID, y + DEPTH + t], [LEFT, y + t]])} fill={layer.left} stroke={layer.edge} strokeWidth="0.75" />
                <polygon points={pts([D, C, [RIGHT, y + t], [MID, y + DEPTH + t]])} fill={layer.right} stroke={layer.edge} strokeWidth="0.75" />
                <polygon points={pts([A, B, C, D])} fill={layer.top} stroke={layer.edge} strokeWidth="0.75" />
                {layer.trame && <Trame y={y} />}
                <line className={styles.rappel} x1={RIGHT} y1={y} x2={520} y2={y} />
                <circle className={styles.point} cx={RIGHT} cy={y} r="3.5" />
              </motion.g>
            )
          })}
        </motion.svg>
        <ol className={styles.legende}>
          {membrane.layers.map((layer, index) => (
            <li key={index} style={{ top: `${(LAYERS[index].y / H) * 100}%` }}>
              <span className={styles.pastille} style={{ backgroundColor: LAYERS[index].top, borderColor: LAYERS[index].edge }} aria-hidden="true" />
              <span className={styles.nom}>{layer.name}</span>
              <span className={styles.detail}>{layer.detail}</span>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="legende">Éclaté de la membrane armée, du côté de l’eau (en haut) vers le support. Épaisseur totale : 1,5 mm.</figcaption>
    </figure>
  )
}
