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

## 3. Direction artistique

### Palette (tirée des matériaux visibles sur les photos et du rouge du logo)

| Jeton | Valeur | Origine | Usage |
|---|---|---|---|
| `--chaux` | `#F2EEE6` | Murs enduits à la chaux du Biterrois | Fond principal |
| `--pierre` | `#E3DCCD` | Margelles en pierre claire | Surfaces secondaires, filets |
| `--encre` | `#151A1C` | Noir teinté de bleu-vert | Texte |
| `--anthracite` | `#1C2427` | Membrane gris anthracite | Sections sombres, pied de page |
| `--gris` | `#59605F` | — | Texte secondaire (contraste 5,6:1 sur chaux) |
| `--brique` | `#A3402A` | Rouge du logo, terres et tuiles du Languedoc | Accent rare (5,5:1 sur chaux) : le « cordon de soudure », les étiquettes actives, le focus ; variante éclaircie sur fond anthracite |

Le bleu de l'eau n'apparaît **que** dans les photos et dans le rendu WebGL : l'interface reste minérale pour ne pas concurrencer les images.

### Typographie

- **Newsreader** (variable, axe de taille optique 24-72) : énoncés, titres, légendes en italique. Éditoriale, tranchante, peu vue.
- **Archivo** (variable, largeur 100-125 %) : texte courant en largeur normale ; étiquettes, numéros et métadonnées en **largeur étendue, capitales espacées**, comme le lettrage d'un plan d'architecte.
- Polices auto-hébergées, réduites au latin + français, axes limités : 53 Ko (Archivo) + 84 Ko (Newsreader) + 94 Ko (italique, chargé seulement s'il sert).
- Titres en casse de phrase, jamais en capitales. Tailles mesurées : le plus grand titre du site est celui du hero.

### Grille et composition

- 12 colonnes, marges `clamp(20px, 4vw, 64px)`. Mises en page **asymétriques** : texte sur 4-5 colonnes, image sur 7-8, décalages verticaux ; aucune section entièrement centrée.
- Des **filets** d'un pixel structurent les pages (cartouches de section « 03 — Le geste »), à la manière d'un plan.
- Angles vifs, aucune ombre, aucun dégradé décoratif, aucun verre dépoli, aucune carte arrondie.
- Légendes de type « Fig. 04 » en italique sous les images, avec date de prise de vue.

### Photographie

- Uniquement des photos de chantiers réels. Les images de banque, la réalisation d'une autre entreprise (photo n° 3), le rendu de fabricant (n° 4) et l'aperçu Adobe Stock filigrané (n° 5) sont écartés.
- Recadrages serrés pour les photos au smartphone : la ligne d'eau, l'arête d'une marche, un motif, une soudure. Les vues larges sont réservées aux photos qui les supportent.
- Hiérarchie : croix occitane anthracite (hero), soudure à l'air chaud (savoir-faire), bassin aux tonneaux jour/nuit, série du château (avant/après), nuit turquoise, couloir de nage.

### Mouvement

- Framer Motion, `MotionConfig reducedMotion="user"`. Courbe maison `[0.22, 1, 0.36, 1]`, durées de 0,5 à 0,9 s, décalages de 60 à 90 ms : rapide, jamais languissant.
- Révélations : lignes de texte qui montent depuis un masque, images dévoilées par `clip-path` avec léger dézoom. Parallaxe limitée à ±6 %.
- Défilement doux (Lenis) sur ordinateur uniquement, désactivé si « réduire les animations ».
- Curseur système conservé ; sur les médias interactifs, une étiquette discrète l'accompagne (« Voir », « Glisser »). Rien sur écran tactile.

## 4. Les cinq moments signatures

1. **Hero « De fond en comble »** (accueil) : la croix occitane sous une eau vivante (WebGL : réfraction et caustiques masquées sur la seule surface de l'eau). Au défilement, la caméra plonge vers le motif, le cadre se resserre, une légende apparaît ; puis le plan s'ouvre sur le même bassin vu depuis l'escalier. Le zoom se fait dans le shader pour rester net. Image statique si WebGL est absent ou si l'animation est réduite.
2. **Avant / après** (accueil, projet « Au pied du château ») : comparaison glissable entre le bassin vidé et la membrane posée. Accessible au clavier (`input range`).
3. **Le geste** (accueil, savoir-faire) : section sombre, photo de la soudure épinglée, cinq étapes du chantier qui s'allument au défilement le long d'un cordon brique qui se dessine.
4. **Le nuancier de l'eau** (accueil) : une piscine vue du ciel, rendue en WebGL (absorption de la lumière selon la profondeur, caustiques animées, ondes au passage du pointeur). On choisit une finition (sable, gris clair, anthracite, bleu, ardoise 3D…) et l'eau change de teinte ; des photos de vrais bassins dans cette finition accompagnent le rendu. Mention : simulation indicative.
5. **Index des réalisations et transition de projet** : liste numérotée dont l'image suit le curseur ; « Projet suivant » agrandit l'image jusqu'à devenir le hero de la page suivante.

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

- Contrastes AA vérifiés, focus visible (anneau brique), lien d'évitement, navigation clavier complète, `aria-live` sur le formulaire, textes alternatifs rédigés.
- `prefers-reduced-motion` : pas de défilement doux, pas de zoom ni de parallaxe, WebGL figé.
- Mobile : hero plus court et moins zoomé, index des projets en liste illustrée, nuancier en pleine largeur, bandeau d'appel en bas d'écran après le hero, cibles tactiles de 44 px minimum.

## 8. Critères de validation

- `npm run build` sans erreur ni avertissement TypeScript.
- Contrôle visuel dans Chromium à 1440 px et 390 px de chaque page, console sans erreur.
- Aucune information non sourcée ; chaque inconnue est signalée.
- Poids de l'accueil hors images différées : moins de 300 Ko de JS compressé.
