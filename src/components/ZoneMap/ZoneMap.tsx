import { company } from '../../content/company'
import styles from './ZoneMap.module.css'

/** Cadre de la carte (degrés) et projection équirectangulaire corrigée à la latitude de l'atelier. */
const WEST = 2.86
const EAST = 3.96
const NORTH = 43.79
const SOUTH = 43.08
const COS = Math.cos((company.workshop.lat * Math.PI) / 180)
const W = 640
const SCALE = W / ((EAST - WEST) * COS)
const H = Math.round((NORTH - SOUTH) * SCALE)
const KM = SCALE / 111.2

const x = (lon: number) => (lon - WEST) * COS * SCALE
const y = (lat: number) => (NORTH - lat) * SCALE

/** Trait de côte simplifié, de Gruissan à Palavas (points relevés approximativement). */
const COAST: [number, number][] = [
  [43.08, 3.085],
  [43.11, 3.11],
  [43.155, 3.165],
  [43.185, 3.195],
  [43.215, 3.235],
  [43.248, 3.291],
  [43.265, 3.335],
  [43.29, 3.415],
  [43.284, 3.448],
  [43.276, 3.512],
  [43.32, 3.555],
  [43.362, 3.62],
  [43.398, 3.698],
  [43.43, 3.765],
  [43.485, 3.86],
  [43.53, 3.935],
  [43.545, 3.96],
]

/** Position de chaque nom par rapport à son point, pour qu'aucun ne se chevauche. */
const LABELS: Record<string, { dx: number; dy: number; anchor: 'start' | 'end' | 'middle' }> = {
  Béziers: { dx: -10, dy: 4, anchor: 'end' },
  Agde: { dx: 9, dy: 14, anchor: 'start' },
  Pézenas: { dx: 10, dy: 4, anchor: 'start' },
  Narbonne: { dx: 10, dy: 4, anchor: 'start' },
  "Clermont-l'Hérault": { dx: 10, dy: 4, anchor: 'start' },
  Sète: { dx: 9, dy: -6, anchor: 'start' },
  'Saint-Chinian': { dx: 0, dy: -11, anchor: 'middle' },
  'Valras-Plage': { dx: -9, dy: 4, anchor: 'end' },
  Vias: { dx: -8, dy: -7, anchor: 'end' },
  Marseillan: { dx: 9, dy: -2, anchor: 'start' },
  Gignac: { dx: 9, dy: 4, anchor: 'start' },
  Lodève: { dx: 9, dy: 4, anchor: 'start' },
  Montpellier: { dx: 6, dy: 20, anchor: 'end' },
}

const RINGS = [20, 40]
/** Les distances se lisent le long d'un même rayon, comme les cotes d'un sondage. */
const RAYON = (130 * Math.PI) / 180

/**
 * Carte schématique du secteur : les communes citées par l'entreprise, à leur place réelle, autour de l'atelier
 * d'Abeilhan, avec des cercles de distance comme des courbes de profondeur.
 */
export default function ZoneMap() {
  const ax = x(company.workshop.lon)
  const ay = y(company.workshop.lat)
  const coast = COAST.map(([lat, lon]) => `${x(lon).toFixed(1)},${y(lat).toFixed(1)}`).join(' ')
  const sea = `${coast} ${W},${H} ${x(COAST[0][1]).toFixed(1)},${H}`

  return (
    <figure className={styles.carte}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.svg} role="img" aria-labelledby="zone-carte-titre">
        <title id="zone-carte-titre">Carte schématique du secteur d’intervention autour de l’atelier d’Abeilhan</title>
        <polygon points={sea} className={styles.mer} />
        <polyline points={coast} className={styles.cote} />
        <text x={x(3.62)} y={y(43.2)} className={styles.merNom}>
          Méditerranée
        </text>
        {RINGS.map((km) => (
          <g key={km}>
            <circle cx={ax} cy={ay} r={km * KM} className={styles.anneau} />
            <text
              x={ax + Math.cos(RAYON) * km * KM}
              y={ay - Math.sin(RAYON) * km * KM}
              dy="-6"
              className={`${styles.distance} mesure`}
              textAnchor="middle"
            >
              {km} km
            </text>
          </g>
        ))}
        {company.towns.map((town) => {
          const label = LABELS[town.name] ?? { dx: 9, dy: 4, anchor: 'start' as const }
          const limit = town.name === 'Montpellier'
          return (
            <g key={town.name} className={town.main ? styles.principale : styles.commune} data-limite={limit || undefined}>
              <circle cx={x(town.lon)} cy={y(town.lat)} r={town.main ? 4.5 : 3} />
              <text x={x(town.lon) + label.dx} y={y(town.lat) + label.dy} textAnchor={label.anchor}>
                {limit ? 'Abords de Montpellier' : town.name.replace("'", '’')}
              </text>
            </g>
          )
        })}
        <g className={styles.atelier}>
          <rect x={ax - 6} y={ay - 6} width="12" height="12" />
          <text x={ax - 12} y={ay - 10} textAnchor="end">
            Abeilhan, l’atelier
          </text>
        </g>
      </svg>
    </figure>
  )
}
