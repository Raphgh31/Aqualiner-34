import type { MediaId } from './media'

export type Finish = {
  id: string
  name: string
  family: 'unie' | 'relief'
  /** Teinte de la membrane à sec, en sRGB 0-1 (pour le rendu de l'eau). */
  color: [number, number, number]
  /** Photo de la texture à sec (finitions en relief). */
  texture?: MediaId
  /** Photo de la même texture sous l'eau, tirée du nuancier fabricant. */
  textureWet?: MediaId
  /** Ce que la teinte fait à l'eau, en une phrase. */
  water: string
  /** Bassins réels photographiés dans une teinte proche. */
  seen: { image: MediaId; label: string }[]
}

const rgb = (hex: string): [number, number, number] => {
  const n = parseInt(hex.slice(1), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

/**
 * Teintes du nuancier de l'eau. Les finitions unies sont celles que l'on voit sur les chantiers ;
 * les finitions en relief sont celles du nuancier 3D Touch publié sur le site actuel.
 * La liste exacte des teintes disponibles reste à confirmer avec l'entreprise.
 */
export const finishes: Finish[] = [
  {
    id: 'claire',
    name: 'Claire',
    family: 'unie',
    color: rgb('#e4e7e4'),
    water: 'Une eau turquoise, lumineuse, que l’on voit de loin.',
    seen: [
      { image: 'couloir', label: 'Couloir de nage' },
      { image: 'carnet-lagon', label: 'Carnet de chantier' },
    ],
  },
  {
    id: 'gris-clair',
    name: 'Gris clair',
    family: 'unie',
    color: rgb('#a6adae'),
    water: 'Un bleu-vert doux, plus minéral que le turquoise.',
    seen: [
      { image: 'escalier-membrane', label: 'Escalier, avant la mise en eau' },
      { image: 'carnet-banquette', label: 'Carnet de chantier' },
    ],
  },
  {
    id: 'bleu',
    name: 'Bleu foncé',
    family: 'unie',
    color: rgb('#25507a'),
    water: 'Un bleu soutenu, classique, qui garde de la profondeur.',
    seen: [
      { image: 'chateau-apres', label: 'Au pied du château' },
      { image: 'bleu', label: 'Bleu profond' },
    ],
  },
  {
    id: 'anthracite',
    name: 'Anthracite',
    family: 'unie',
    color: rgb('#3b4246'),
    water: 'Un bleu profond, presque minéral, qui reflète le ciel.',
    seen: [
      { image: 'croix-occitane', label: 'Croix occitane' },
      { image: 'croix-occitane-escalier', label: 'Le même bassin, depuis l’escalier' },
    ],
  },
  {
    id: 'ardoise',
    name: 'Ardoise',
    family: 'relief',
    color: rgb('#3d4655'),
    texture: 'texture-ardoise',
    textureWet: 'texture-ardoise-eau',
    water: 'Un bleu nuit veiné, qui bouge avec la lumière.',
    seen: [{ image: 'gecko-paroi', label: 'Membrane ardoise, avant la mise en eau' }],
  },
  {
    id: 'beton-gris',
    name: 'Béton gris',
    family: 'relief',
    color: rgb('#8a8f93'),
    texture: 'texture-beton-gris',
    textureWet: 'texture-beton-gris-eau',
    water: 'Un gris perle, très architectural.',
    seen: [],
  },
  {
    id: 'sable',
    name: 'Sable',
    family: 'relief',
    color: rgb('#cdbfa5'),
    texture: 'texture-sable',
    textureWet: 'texture-sable-eau',
    water: 'Une eau claire aux reflets dorés, comme une crique.',
    seen: [],
  },
  {
    id: 'pierre',
    name: 'Pierre',
    family: 'relief',
    color: rgb('#9a7d63'),
    texture: 'texture-pierre',
    textureWet: 'texture-pierre-eau',
    water: 'Un vert d’eau mêlé d’ocre, proche d’un bassin naturel.',
    seen: [],
  },
  {
    id: 'pierre-jaune',
    name: 'Pierre jaune',
    family: 'relief',
    color: rgb('#d5c29a'),
    texture: 'texture-pierre-jaune',
    textureWet: 'texture-pierre-jaune-eau',
    water: 'Un vert d’eau lumineux.',
    seen: [],
  },
  {
    id: 'marbre-blanc',
    name: 'Marbre blanc',
    family: 'relief',
    color: rgb('#e6e8e7'),
    texture: 'texture-marbre-blanc',
    textureWet: 'texture-marbre-blanc-eau',
    water: 'Un bleu très pâle, presque blanc au soleil.',
    seen: [],
  },
]
