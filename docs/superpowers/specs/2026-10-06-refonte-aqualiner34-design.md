# Refonte aqualiner34.fr — Spécification de design

*6 octobre 2026. Préalable : [audit du site actuel](../../audit/2026-10-06-audit-site-actuel.md).*

## 1. Compréhension du besoin

**Ce que demande le brief** : une refonte complète, haut de gamme, humaine et éditoriale, qui « vend une sensation avant de vendre un service ». Pages distinctes, réalisations au centre, 3 à 5 moments mémorables, aucune information inventée, mobile conçu pour lui-même, SEO et accessibilité sérieux.

**Ce que l'audit ajoute** : Aqualiner 34 est un petit atelier d'étanchéité et de rénovation (Abeilhan, près de Béziers) dont la vraie singularité est invisible sur le site actuel : la membrane soudée à la main, les motifs découpés dans la membrane, une histoire de fondateurs très humaine, et 90 % de rénovation.

**Hypothèses prises (à valider par le client)**
- Site de démonstration publié sur GitHub Pages (`HashRouter`, `base: './'`, `noindex`) en attendant une mise en production sur le domaine.
- Les réalisations sont reconstituées à partir des photos datées (EXIF) et regroupées quand plusieurs clichés montrent le même bassin. Commune et nature des travaux restent « à préciser » quand on ne les connaît pas.
- Le logotype est une proposition typographique provisoire ; le logo officiel peut le remplacer.

## 2. Concept : « De fond en comble »

Ce que l'on voit d'une piscine, c'est l'eau. Ce qu'Aqualiner fait, c'est ce qui la retient : une membrane de 1,5 mm posée et soudée au fond du bassin. Le site part de ce paradoxe et fait des allers-retours entre **la surface** (la sensation, le jardin, la lumière) et **le fond** (le geste, la matière, le motif).

Trois fils narratifs, repris de page en page :
1. **L'eau** : sa couleur dépend de la membrane.
2. **La main** : la soudure à l'air chaud, lé après lé.
3. **La signature** : la croix occitane, le gecko, le motif sur mesure.

Ton : précis, chaleureux, sans superlatifs. Des phrases courtes, des faits, le vocabulaire du métier (lé, margelle, skimmer, refoulement) expliqué sans jargon.

## 3. Direction artistique — « Signalétique de bassin »

*Révisée le 6 octobre 2026 après calibrage avec les skills frontend-design et impeccable : la première version (fond crème, serif éditoriale, accent terre cuite, filets fins, étiquettes en capitales) correspondait aux réflexes typiques des sites générés. La direction ci-dessous est issue du tirage impeccable (clé 6bdecbdf) parmi sept pistes tirées du monde du bassin ; contrat détaillé dans `.impeccable/surfaces/`.*

Le site emprunte la signalétique d'un bassin : marquages de profondeur, ligne d'eau, ligne de fond. On descend de la surface (0,00 m) jusqu'au fond, là où Aqualiner travaille.

### Palette

| Jeton | Valeur | Origine | Usage |
|---|---|---|---|
| `--email` | `#EFF2F1` | Blanc émaillé des carreaux de marquage | Fond principal |
| `--ardoise` | `#232A30` | Membrane ardoise / anthracite à sec | Texte (12,9:1), grands aplats sombres |
| `--fond` | `#13303D` | Membrane anthracite vue sous 1,5 m d'eau | Sections « profondes », pied de page |
| `--gris` | `#5A6369` | — | Texte secondaire (5,4:1 sur émail) |
| `--rouge` | `#C42B2E` | Rouge du logo, chiffres de profondeur | Marquages et état actif près de la surface (5,0:1) |
| `--eau` | `#5CC9C6` | Turquoise d'un bassin éclairé | Marquages dans les sections profondes (7,0:1 sur fond), lumière |

Détail physique assumé : sous l'eau, le rouge disparaît le premier. Les marquages sont rouges dans les sections claires (surface) et deviennent turquoise dans les sections profondes.

### Typographie

- **Archivo** seule, variable, en trois largeurs : **étendue** (125 %) pour les titres, en casse de phrase, ce qui prolonge le lettrage étendu du site actuel ; **condensée** et grasse (62-70 %) pour les chiffres de profondeur et les mesures, en chiffres tabulaires ; **normale** pour le texte courant (17-18 px, interlignage 1,55, 65-75 caractères).
- Un seul fichier de police auto-hébergé, réduit au latin + français.
- Pas d'étiquette en surtitre au-dessus des titres, pas de capitales espacées en guise de décor, pas de numérotation de sections : seules les vraies séquences (étapes de chantier, chronologie) sont numérotées.

### Grille et composition

- 12 colonnes, marges `clamp(20px, 4vw, 64px)`, compositions asymétriques, texte aligné à gauche, aucune section entièrement centrée.
- Une **jauge de profondeur** graduée sur le bord gauche (ordinateur) indique où l'on est dans la page, en mètres.
- Les séparations sont des **lignes de soudure** (double trait fin), jamais des ombres ni des cartes.
- Les **actions** sont des plaques émaillées : rectangles pleins à angles vifs, rouges ou ardoise.
- **Photographies annotées** : des lignes de rappel nomment les parties des vrais bassins (lé, soudure, margelle, skimmer, motif).

### Photographie

- Uniquement des photos de chantiers réels. Les images de banque, la réalisation d'une autre entreprise (photo n° 3), le rendu de fabricant (n° 4) et l'aperçu Adobe Stock filigrané (n° 5) sont écartés.
- Recadrages serrés pour les photos au smartphone : la ligne d'eau, l'arête d'une marche, un motif, une soudure. Les vues larges sont réservées aux photos qui les supportent.
- Hiérarchie : croix occitane anthracite (hero), soudure à l'air chaud (savoir-faire), bassin aux tonneaux jour/nuit, série du château (avant/après), nuit turquoise, couloir de nage.

### Mouvement

- Motion (ex-Framer Motion), `MotionConfig reducedMotion="user"`, courbe `[0.22, 1, 0.36, 1]`, 0,4 à 0,8 s.
- **Un seul moment orchestré** au chargement : la surface de l'eau qui se pose dans le hero. Pas d'apparition en fondu sur chaque section ; le mouvement répond surtout aux gestes du visiteur (glisser, choisir une finition, survoler un projet) et au défilement dans les séquences qui le justifient.
- Défilement doux (Lenis) sur ordinateur uniquement, désactivé si « réduire les animations ».
- Curseur système conservé ; une étiquette discrète l'accompagne sur les médias interactifs. Rien sur écran tactile.

## 4. Les cinq moments signatures

1. **Hero « De fond en comble »** (accueil) : la croix occitane sous une eau vivante (WebGL : réfraction et caustiques masquées sur la seule surface de l'eau). Au défilement, la caméra plonge vers le motif, le cadre se resserre, une légende apparaît ; puis le plan s'ouvre sur le même bassin vu depuis l'escalier. Le zoom se fait dans le shader pour rester net. Image statique si WebGL est absent ou si l'animation est réduite.
2. **Avant / après** (accueil, projet « Au pied du château ») : comparaison glissable entre le bassin vidé et la membrane posée. Accessible au clavier (`input range`).
3. **Le geste** (accueil, savoir-faire) : section profonde, photo de la soudure épinglée, cinq étapes du chantier qui s'allument au défilement le long d'une soudure tracée d'un seul trait.
4. **Le nuancier de l'eau** (accueil) : une piscine vue du ciel, rendue en WebGL (absorption de la lumière selon la profondeur, caustiques animées, ondes au passage du pointeur). On choisit une finition (sable, gris clair, anthracite, bleu, ardoise 3D…) et l'eau change de teinte ; des photos de vrais bassins dans cette finition accompagnent le rendu. Mention : simulation indicative.
5. **Index des réalisations et transition de projet** : liste dont l'image suit le curseur et qui isole le projet survolé ; « Projet suivant » agrandit l'image jusqu'à devenir le hero de la page suivante.

## 5. Architecture

Navigation : **Réalisations · Savoir-faire · Services · L'atelier · Contact**, avec le téléphone toujours visible. En-tête transparent sur les visuels, opaque ensuite, masqué en descendant et rappelé en remontant. Menu plein écran sur mobile.

| Route | Rôle | Contenu clé |
|---|---|---|
| `/` | Accueil narratif | Hero, manifeste et 4 faits, rénover (avant/après), le geste, réalisations choisies, signature (motifs), nuancier, l'atelier, contact |
| `/realisations` | Portfolio | Index des projets racontés, carnet de chantier (autres photos, visionneuse) |
| `/realisations/:slug` | Fiche projet | Hero, fiche technique, texte, compositions d'images, avant/après éventuel, projet suivant |
| `/savoir-faire` | La matière et la méthode | Éclaté de la membrane, avantages, méthode en 5 étapes, matières 3D Touch (à sec / sous l'eau), motifs sur mesure, garanties |
| `/services` | Les prestations | 7 services numérotés, zone d'intervention (carte), questions fréquentes |
| `/atelier` | L'humain | De la pizzeria à 2008, chronologie, équipe, engagements, presse, labels |
| `/contact` | Prise de contact | Formulaire guidé (projet, bassin, commune, coordonnées), téléphone, adresse |
| `/mentions-legales` | Obligations | Éditeur, hébergeur, données, crédits |
| `*` | 404 | « Ce bassin est vide. » |

Projets racontés (photos réelles, regroupées par date de prise de vue) : Croix occitane (2018), Gecko et tonneaux (2022), Au pied du château (rénovation), Escalier d'angle (rénovation), Couloir de nage (2018), Escalier roman (2018), Nocturne (2018), Bleu profond (2018), Nuit turquoise.

## 6. Architecture technique

- **Vite + React + TypeScript + React Router (`HashRouter`) + Framer Motion**, conformément aux préférences du projet. Pages chargées à la demande (`lazy`), sauf l'accueil.
- **WebGL natif** (sans Three.js) : deux shaders plein cadre suffisent ; aucune scène 3D ni modèle à charger. Rendu suspendu hors écran et onglet masqué, densité de pixels plafonnée, repli sur image.
- **CSS Modules** + jetons CSS globaux. Pas de framework CSS.
- **Images** : script `sharp` qui télécharge les originaux, recadre, génère AVIF + WebP en plusieurs largeurs, un aplat de couleur dominante et les dimensions (anti-décalage de mise en page). `<picture>` + `srcset`/`sizes`, chargement différé hors écran.
- **Contenus** dans `src/content/*.ts` : une seule source de vérité pour les faits, avec les champs inconnus à `null` (rendus « À préciser »).
- **SEO** : titre et description par route, Open Graph, JSON-LD `HomeAndConstructionBusiness` et `FAQPage`, coordonnées en texte, un H1 par page, textes alternatifs descriptifs. `noindex` tant que le site est une préversion.
- **Formulaire** : pas de serveur sur GitHub Pages, donc la demande est mise en forme puis ouverte dans la messagerie (`mailto:`), avec repli « copier le texte » et téléphone. Un service de formulaire sera à brancher en production.
- **Déploiement** : workflow GitHub Actions vers GitHub Pages (source « GitHub Actions » dans *Settings → Pages*).

## 7. Accessibilité et mobile

- Contrastes AA vérifiés, focus visible (anneau rouge de marquage, turquoise sur fond profond), lien d'évitement, navigation clavier complète, `aria-live` sur le formulaire, textes alternatifs rédigés.
- `prefers-reduced-motion` : pas de défilement doux, pas de zoom ni de parallaxe, WebGL figé.
- Mobile : hero plus court et moins zoomé, index des projets en liste illustrée, nuancier en pleine largeur, bandeau d'appel en bas d'écran après le hero, cibles tactiles de 44 px minimum.

## 8. Critères de validation

- `npm run build` sans erreur ni avertissement TypeScript.
- Contrôle visuel dans Chromium à 1440 px et 390 px de chaque page, console sans erreur.
- Aucune information non sourcée ; chaque inconnue est signalée.
- Poids de l'accueil hors images différées : moins de 300 Ko de JS compressé.
