import type { MediaId } from './media'

/** Repère posé sur une photo : x et y en fractions de l'image. */
export type Annotation = { x: number; y: number; label: string; side?: 'gauche' | 'droite' }

export type ProjectBlock =
  | { kind: 'plein'; image: MediaId; caption?: string }
  | { kind: 'paire'; images: [MediaId, MediaId]; caption?: string }
  | { kind: 'texte'; title: string; text: string }
  | { kind: 'decale'; image: MediaId; text: string; side: 'gauche' | 'droite'; caption?: string }
  | { kind: 'annote'; image: MediaId; notes: Annotation[]; caption?: string }

export type Project = {
  slug: string
  title: string
  cover: MediaId
  /** Une phrase pour l'index. */
  summary: string
  intro: string
  /** null : le client n'a pas encore précisé s'il s'agit d'une rénovation ou d'une construction. */
  nature: 'Rénovation' | 'Construction' | null
  commune: string | null
  /** Finition visible sur les photos ; null si on ne peut pas l'affirmer. */
  finish: string | null
  features: string[]
  /** Date de prise de vue (EXIF) ; null si inconnue. */
  photographed: string | null
  blocks: ProjectBlock[]
  beforeAfter?: { before: MediaId; after: MediaId; caption: string }
}

export const projects: Project[] = [
  {
    slug: 'croix-occitane',
    title: 'Croix occitane',
    cover: 'croix-occitane',
    summary: 'Un bassin en membrane anthracite, une croix occitane soudée au fond.',
    intro:
      'Un bassin tout en longueur, habillé d’une membrane anthracite qui assombrit l’eau et lui donne une profondeur presque minérale. Au fond, une croix occitane découpée dans une membrane claire, puis soudée sur place.',
    nature: null,
    commune: null,
    finish: 'Membrane armée anthracite',
    features: ['Croix occitane soudée en fond de bassin', 'Banquette et marches immergées', 'Margelles en pierre claire'],
    photographed: '2018-07-31',
    blocks: [
      {
        kind: 'annote',
        image: 'croix-occitane',
        notes: [
          { x: 0.56, y: 0.67, label: 'Croix occitane : membrane claire soudée sur le fond', side: 'droite' },
          { x: 0.5, y: 0.1, label: 'Banquette et marches habillées de membrane', side: 'droite' },
          { x: 0.235, y: 0.445, label: 'Skimmer', side: 'gauche' },
          { x: 0.8, y: 0.62, label: 'Margelle en pierre claire', side: 'droite' },
        ],
        caption: 'Vue d’ensemble, juillet 2018.',
      },
      {
        kind: 'texte',
        title: 'Une eau couleur d’ardoise',
        text: 'Une membrane sombre change la couleur de l’eau : au lieu du bleu lagon, un bleu profond qui renvoie le ciel et le jardin. La croix claire ressort d’autant mieux.',
      },
      {
        kind: 'plein',
        image: 'croix-occitane-escalier',
        caption: 'Le même bassin depuis l’angle de l’escalier : banquette et marches dans la même membrane, sans rupture de teinte.',
      },
    ],
  },
  {
    slug: 'au-pied-du-chateau',
    title: 'Au pied du château',
    cover: 'chateau-apres',
    summary: 'Un ancien bassin vidé, une membrane neuve posée, la même vue sur les tours.',
    intro:
      'Le bassin était fatigué : revêtement décoloré, taché, à bout de souffle. Il n’a pas été démoli. Vidé, préparé, il a été entièrement habillé d’une membrane armée bleu foncé.',
    nature: 'Rénovation',
    commune: null,
    finish: 'Membrane armée bleu foncé',
    features: ['Bassin conservé', 'Membrane posée sur le fond et les parois', 'Ancien revêtement remplacé'],
    photographed: null,
    beforeAfter: {
      before: 'chateau-avant',
      after: 'chateau-pose',
      caption: 'Le bassin vidé, puis la membrane posée, avant la mise en eau.',
    },
    blocks: [
      {
        kind: 'paire',
        images: ['chateau-ancien', 'chateau-membrane'],
        caption: 'L’ancien revêtement, puis la membrane bleu foncé sur le fond et les parois.',
      },
      {
        kind: 'decale',
        image: 'chateau-apres',
        side: 'droite',
        text: 'Une fois rempli, le bassin retrouve sa place dans le parc. La membrane foncée donne à l’eau un bleu soutenu, en accord avec les arbres et la pierre du château.',
        caption: 'Après la mise en eau.',
      },
    ],
  },
  {
    slug: 'gecko-et-tonneaux',
    title: 'Gecko et tonneaux',
    cover: 'gecko-tonneaux',
    summary: 'Une banquette au décor bois, un gecko au fond, une lame d’eau qui s’éclaire le soir.',
    intro:
      'Une terrasse meublée de tonneaux, un bassin à membrane sombre. Dans l’eau, une banquette au décor bois et un gecko clair soudé au fond ; au bout, une lame d’eau qui s’éclaire à la nuit tombée.',
    nature: null,
    commune: null,
    finish: 'Membrane sombre, banquette au décor bois',
    features: ['Gecko soudé en fond de bassin', 'Lame d’eau', 'Éclairage du bassin'],
    photographed: '2022-04-08',
    blocks: [
      {
        kind: 'annote',
        image: 'gecko-tonneaux-eau',
        notes: [
          { x: 0.66, y: 0.24, label: 'Gecko soudé au fond', side: 'droite' },
          { x: 0.72, y: 0.08, label: 'Lame d’eau', side: 'droite' },
          { x: 0.3, y: 0.55, label: 'Banquette au décor bois', side: 'gauche' },
        ],
        caption: 'Le bassin vu depuis la terrasse, avril 2022.',
      },
      { kind: 'plein', image: 'gecko-tonneaux', caption: 'La terrasse et ses tonneaux.' },
      {
        kind: 'decale',
        image: 'gecko-tonneaux-nuit',
        side: 'gauche',
        text: 'Le soir, l’éclairage du bassin et de la lame d’eau prend le relais. La membrane sombre renvoie les couleurs comme un miroir.',
        caption: 'De nuit, mars 2022.',
      },
    ],
  },
  {
    slug: 'couloir-de-nage',
    title: 'Couloir de nage',
    cover: 'couloir',
    summary: 'Un long bassin étroit au ras de la pelouse, l’eau turquoise d’une membrane claire.',
    intro:
      'Un bassin long et étroit, posé au ras de la pelouse entre un olivier et une haie de végétation méditerranéenne. La membrane claire donne à l’eau ce turquoise lumineux que l’on voit de loin.',
    nature: null,
    commune: null,
    finish: 'Membrane armée claire',
    features: ['Bassin long et étroit', 'Marches sur toute la largeur', 'Margelles au ras de la pelouse'],
    photographed: '2018-06-28',
    blocks: [
      { kind: 'plein', image: 'couloir', caption: 'Juin 2018.' },
      {
        kind: 'decale',
        image: 'couloir-plage',
        side: 'gauche',
        text: 'À une extrémité, des marches sur toute la largeur : on entre dans l’eau comme sur une plage. Elles sont habillées de la même membrane que le reste du bassin.',
      },
    ],
  },
  {
    slug: 'escalier-d-angle',
    title: 'Escalier d’angle',
    cover: 'angle-apres',
    summary: 'Une mosaïque délavée remplacée par une membrane gris-bleu, marche après marche.',
    intro:
      'Un bassin en forme libre et son escalier d’angle en mosaïque, délavés par les années. Le bassin a été vidé, les lés de membrane posés sur les parois puis sur l’escalier, jusqu’à la remise en eau.',
    nature: 'Rénovation',
    commune: null,
    finish: 'Membrane armée gris-bleu',
    features: ['Escalier d’angle habillé de membrane', 'Ancien revêtement en mosaïque remplacé', 'Forme libre conservée'],
    photographed: null,
    blocks: [
      {
        kind: 'paire',
        images: ['angle-avant', 'angle-escalier'],
        caption: 'L’escalier d’angle avant les travaux, puis sous l’eau, habillé de membrane.',
      },
      {
        kind: 'texte',
        title: 'Lé après lé',
        text: 'La membrane arrive en rouleaux. Chaque lé est découpé et ajusté sur place, puis soudé à l’air chaud au lé voisin. Sur un escalier, chaque marche demande sa découpe.',
      },
      { kind: 'paire', images: ['angle-vide', 'angle-pose'], caption: 'Le bassin vidé, puis les premiers lés sur les parois.' },
      {
        kind: 'decale',
        image: 'angle-apres',
        side: 'droite',
        text: 'Remis en eau, le bassin garde sa forme et son escalier. Seule l’étanchéité a changé, et avec elle la couleur de l’eau.',
        caption: 'Après la remise en eau.',
      },
      { kind: 'paire', images: ['angle-reflets', 'angle-fontaine'] },
    ],
  },
  {
    slug: 'nuit-turquoise',
    title: 'Nuit turquoise',
    cover: 'nuit-turquoise',
    summary: 'Un bassin aux courbes libres entre palmiers et oranger, éclairé de nuit.',
    intro:
      'Un bassin aux courbes libres glissé entre les palmiers, les cycas et un oranger, avec un escalier immergé qui suit la courbe. La nuit, l’éclairage le fait sortir du jardin.',
    nature: null,
    commune: null,
    finish: null,
    features: ['Forme libre', 'Escalier immergé', 'Éclairage du bassin'],
    photographed: null,
    blocks: [{ kind: 'plein', image: 'nuit-turquoise' }],
  },
  {
    slug: 'escalier-roman',
    title: 'Escalier roman',
    cover: 'roman',
    summary: 'Un escalier roman en demi-cercle, une membrane bleu foncé qui en dessine chaque marche.',
    intro:
      'Les formes arrondies sont celles où la membrane armée montre le mieux son intérêt : découpée et soudée sur place, elle épouse l’escalier roman marche après marche.',
    nature: null,
    commune: null,
    finish: 'Membrane armée bleu foncé',
    features: ['Escalier roman en demi-cercle', 'Bouts arrondis', 'Margelles couleur sable'],
    photographed: '2018-06-27',
    blocks: [
      { kind: 'plein', image: 'roman', caption: 'Juin 2018.' },
      {
        kind: 'decale',
        image: 'roman-bassin',
        side: 'droite',
        text: 'Vu de côté, le bassin aux bouts arrondis reflète les arbres. La membrane bleu foncé suit les courbes sans rupture.',
      },
    ],
  },
  {
    slug: 'nocturne',
    title: 'Nocturne',
    cover: 'nocturne',
    summary: 'Le même bassin à midi et à la nuit : jets d’eau, éclairage et bordure lumineuse.',
    intro:
      'Photographié le même jour, en début d’après-midi puis à la nuit : une membrane sombre, une bordure noire, des jets d’eau. Le soir, l’éclairage change tout.',
    nature: null,
    commune: null,
    finish: 'Membrane sombre',
    features: ['Jets d’eau', 'Éclairage du bassin', 'Ruban lumineux en bordure'],
    photographed: '2018-04-15',
    blocks: [{ kind: 'paire', images: ['nocturne-jour', 'nocturne'], caption: 'Le 15 avril 2018, en début d’après-midi puis à 22 heures.' }],
  },
  {
    slug: 'bleu-profond',
    title: 'Bleu profond',
    cover: 'bleu',
    summary: 'Une membrane bleu foncé, un escalier roman et un motif clair au fond.',
    intro: 'Une membrane bleu foncé, un escalier roman immergé et, au fond, un motif clair qui accroche la lumière.',
    nature: null,
    commune: null,
    finish: 'Membrane armée bleu foncé',
    features: ['Escalier roman immergé', 'Motif clair au fond', 'Échelle inox'],
    photographed: '2018-06-04',
    blocks: [{ kind: 'paire', images: ['bleu', 'bleu-escalier'], caption: 'Juin 2018.' }],
  },
]

/** Photos du carnet de chantier : d'autres bassins, sans fiche détaillée. */
export const carnet: MediaId[] = [
  'carnet-lagon',
  'carnet-banquette',
  'carnet-mer',
  'carnet-terrasse-bois',
  'carnet-tomettes',
  'carnet-sureleve',
  'carnet-pinede',
  'carnet-banquette-sombre',
  'carnet-margelles-grises',
  'carnet-long',
  'carnet-abri',
  'carnet-plage',
  'carnet-bois-clair',
  'carnet-haricot',
  'carnet-marches',
  'carnet-residence',
  'carnet-rampe',
  'carnet-escalier-droit',
  'carnet-palmier',
  'carnet-transats',
  'carnet-colonnes',
  'carnet-lagon-2',
  'carnet-banquette-2',
  'carnet-matelas',
  'carnet-chantier',
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getNextProject(slug: string): Project {
  const index = projects.findIndex((p) => p.slug === slug)
  return projects[(index + 1) % projects.length]
}

/** Toutes les images utilisées par un projet. */
export function projectMedia(project: Project): MediaId[] {
  const ids: MediaId[] = [project.cover]
  for (const block of project.blocks) {
    if (block.kind === 'paire') ids.push(...block.images)
    else if (block.kind !== 'texte') ids.push(block.image)
  }
  if (project.beforeAfter) ids.push(project.beforeAfter.before, project.beforeAfter.after)
  return ids
}
