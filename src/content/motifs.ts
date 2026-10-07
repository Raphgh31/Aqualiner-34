import type { MediaId } from './media'

export type Motif = { image: MediaId; title: string; text: string }

/** Du dessin au bassin : les motifs découpés et soudés dans la membrane. */
export const motifs: Motif[] = [
  { image: 'motif-lion', title: 'Le dessin', text: 'Un lion tribal, dessiné pour être découpé dans la membrane.' },
  { image: 'soudure-mains', title: 'La soudure', text: 'Le motif est soudé à l’air chaud, pièce par pièce, sur la membrane du fond ou d’une paroi.' },
  { image: 'gecko-paroi', title: 'Avant l’eau', text: 'Un gecko en membrane marbrée sur une paroi ardoise, avant la mise en eau.' },
  { image: 'motif-croix-noire', title: 'Croix occitane', text: 'Blanche sur une membrane noire, sous les reflets.' },
  { image: 'motif-croix-blanche', title: 'Croix occitane', text: 'Claire, au fond d’un bassin bleu à escalier roman.' },
  { image: 'motif-poisson', title: 'Poisson', text: 'Un motif stylisé, clair sur fond bleu.' },
  { image: 'gecko-tonneaux-eau', title: 'Gecko', text: 'Au fond d’un bassin sombre, sous la lame d’eau.' },
  { image: 'motif-croix-bleue', title: 'Croix occitane', text: 'Bleu soutenu sur bleu clair, avant la mise en eau.' },
]
