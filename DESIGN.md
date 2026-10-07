---
name: Aqualiner 34
description: Rénovation et construction de piscines en membrane armée, Abeilhan (Hérault) — la signalétique d'un bassin, de la surface au fond.
colors:
  email: "#eff2f1"
  email-ombre: "#e3e8e7"
  ardoise: "#232a30"
  fond: "#13303d"
  gris: "#5a6369"
  gris-fond: "#9fb0b6"
  rouge: "#c42b2e"
  rouge-clair: "#f56b6e"
  rouge-survol: "#a92225"
  blanc: "#ffffff"
  eau: "#5cc9c6"
  eau-encre: "#047270"
  voile: "#0c212b"
  joint: "#c9d1d0"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 1.6rem + 4.4vw, 6rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 1.5rem + 3vw, 4.4rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.028em"
    fontVariation: "'wdth' 125"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 1.35rem + 1.9vw, 3.1rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.024em"
    fontVariation: "'wdth' 125"
  callout:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 1.6rem + 2vw, 3.4rem)"
    fontWeight: 500
    lineHeight: 1
  menu:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 9vw, 3.4rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 125"
  value:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 1.3rem + 1vw, 2.3rem)"
    fontWeight: 650
    lineHeight: 0.9
    fontFeature: "'tnum' 1, 'lnum' 1"
    fontVariation: "'wdth' 66"
  subtitle:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.3rem, 1.12rem + 0.7vw, 1.75rem)"
    fontWeight: 550
    lineHeight: 1.15
    letterSpacing: "-0.012em"
    fontVariation: "'wdth' 112"
  lead:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.18rem, 1.06rem + 0.45vw, 1.42rem)"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1.02rem + 0.15vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.6
  control:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.1
    fontVariation: "'wdth' 112"
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.45
  note:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 600
    lineHeight: 1.2
  scale:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.66rem"
    fontWeight: 600
    lineHeight: 1
    fontFeature: "'tnum' 1"
    fontVariation: "'wdth' 66"
  measure:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 650
    lineHeight: 0.9
    letterSpacing: "-0.01em"
    fontFeature: "'tnum' 1, 'lnum' 1"
    fontVariation: "'wdth' 66"
rounded:
  none: "0px"
  plaque: "2px"
spacing:
  e-1: "0.25rem"
  e-2: "0.5rem"
  e-3: "0.75rem"
  e-4: "1rem"
  e-5: "1.5rem"
  e-6: "2rem"
  e-7: "3rem"
  e-8: "4rem"
  e-9: "6rem"
  e-10: "8rem"
  section: "clamp(6rem, 4rem + 8vw, 12rem)"
  gutter: "clamp(16px, 1.8vw, 32px)"
components:
  plaque-rouge:
    backgroundColor: "{colors.rouge}"
    textColor: "{colors.blanc}"
    rounded: "{rounded.plaque}"
    padding: "0.85em 1.35em 0.9em"
    height: "52px"
  plaque-rouge-hover:
    backgroundColor: "{colors.rouge-survol}"
    textColor: "{colors.blanc}"
  plaque-ardoise:
    backgroundColor: "{colors.ardoise}"
    textColor: "{colors.blanc}"
    rounded: "{rounded.plaque}"
    padding: "0.85em 1.35em 0.9em"
    height: "52px"
  plaque-email:
    backgroundColor: "{colors.email}"
    textColor: "{colors.ardoise}"
    rounded: "{rounded.plaque}"
    padding: "0.85em 1.35em 0.9em"
    height: "52px"
  champ:
    backgroundColor: "#ffffff"
    textColor: "{colors.ardoise}"
    rounded: "{rounded.none}"
    padding: "0.7rem 0.85rem"
    height: "48px"
  choix-plaque:
    backgroundColor: "{colors.email}"
    textColor: "{colors.ardoise}"
    rounded: "{rounded.none}"
    padding: "0.55rem 0.95rem"
    height: "48px"
  choix-plaque-actif:
    backgroundColor: "{colors.ardoise}"
    textColor: "{colors.email}"
  repere-jauge:
    backgroundColor: "{colors.rouge}"
    textColor: "{colors.email}"
    rounded: "{rounded.none}"
  repere-jauge-profond:
    backgroundColor: "{colors.eau}"
    textColor: "{colors.fond}"
---

# Design System: Aqualiner 34

## Overview

**Creative North Star: "La signalétique de bassin"**

Le site emprunte le langage graphique d'une piscine : marquages de profondeur, ligne d'eau, carreaux émaillés, membrane anthracite, cordons de soudure. On descend de la surface (0,00 m) jusqu'au fond (2,20 m), là où l'entreprise travaille : chaque page se lit comme une plongée, les sections claires sont la surface, les sections sombres sont l'eau profonde, et le pied de page est le fond, où la lumière joue encore un peu.

Les photographies des vrais chantiers portent le récit ; l'interface reste en retrait, plate, à angles vifs, sans ombre. La personnalité vient de la typographie (une seule famille en trois largeurs), d'instruments de mesure honnêtes (jauge, cotes, fiches techniques) et d'une eau rendue en WebGL là où il y a vraiment de l'eau. Le mouvement est rare et lié au geste ou à la plongée : un moment orchestré par page, le reste répond au visiteur.

Refus confirmés : brochure bleu piscine (photo carte postale, trois cartes de services, galerie en grille), studio de luxe noir et minimal, dégradés décoratifs, verre dépoli, ombres, coins arrondis, émojis, surtitres au-dessus des titres, mise en page entièrement centrée.

**Key Characteristics:**
- Émail froid et ardoise de membrane ; rouge de marquage près de la surface, turquoise d'eau en profondeur.
- Archivo seule, en trois largeurs : étendue pour les titres, condensée pour les chiffres, normale pour le texte.
- Jauge de profondeur fixe à gauche, du 0,00 m au 2,20 m du pied de page.
- Séparations en lignes de soudure (double trait fin), jamais d'ombre.
- Photographies annotées par des lignes de rappel ; dates de prise de vue réelles.

## Colors

Une palette de matériaux : l'émail des carreaux, l'ardoise de la membrane à sec, la même membrane vue sous l'eau, le rouge du logo et le turquoise d'un bassin éclairé.

### Primary
- **Rouge de marquage** (rouge) : les chiffres de profondeur, l'état actif de la navigation, l'action principale (plaque rouge), les repères des photographies annotées. Réservé aux sections claires, près de la surface.
- **Rouge clair du logo** (rouge-clair) : le « 34 » du logotype et le rouge partout où il passe sur un fond profond, pour rester lisible (4,7:1 sur le fond).
- **Rouge de survol** (rouge-survol) : le niveau qui monte dans la plaque rouge au survol.

### Secondary
- **Turquoise d'eau** (eau) : les marquages des sections profondes (repère de la jauge, numéros d'étapes, années de la chronologie), le trait de côte de la carte, la lumière du WebGL. Jamais en aplat décoratif sur l'émail.
- **Turquoise lisible** (eau-encre) : le turquoise quand il devient texte sur l'émail, comme le nom de la mer sur la carte (5,1:1).

### Neutral
- **Émail** (email) : le sol des pages, la plaque claire, le texte sur fond profond.
- **Émail à l'ombre** (email-ombre) : les sections claires en retrait (avant/après, presse, carnet de chantier).
- **Ardoise de membrane** (ardoise) : le texte courant (12,9:1 sur l'émail), les grands aplats sombres, la plaque ardoise.
- **Membrane sous l'eau** (fond) : les sections profondes, le rideau des transitions, le pied de page et sa lumière WebGL.
- **Gris galet** (gris) : le texte secondaire sur émail (5,4:1).
- **Gris d'eau** (gris-fond) : le texte secondaire sur fond profond (6,2:1).
- **Joint** (joint) : les lignes de soudure et les filets sur émail ; sur fond profond, l'émail à 16 %.
- **Voile** (voile) : l'eau la plus profonde, posée en voile de lisibilité sur le haut, le bas et le bord gauche des photographies de hero, sous les titres. Fonctionnel, jamais en aplat ni en dégradé décoratif.

### Named Rules
**The Red Drowns Rule.** Sous l'eau, le rouge disparaît le premier : sur une section profonde, chaque marquage passe au turquoise, et le seul rouge admis est le rouge clair du logo.
**The Water Is Water Rule.** Le turquoise n'apparaît que là où il y a de l'eau (rendu WebGL, carte, marquages profonds), jamais comme accent décoratif.

## Typography

**Display Font:** Archivo (variable, auto-hébergée, latin + français), largeur 125 %
**Body Font:** Archivo, largeur 100 %
**Label/Mono Font:** Archivo condensée (66 %), chiffres tabulaires — aucune police à chasse fixe

**Character:** une seule famille, trois voix : l'étendue grave et calme des titres prolonge le lettrage du site d'origine, la condensée grasse a la sécheresse des cotes peintes sur une margelle, la normale reste neutre et lisible.

### Hierarchy
- **Display** (500, clamp 3–6 rem, interligne 0,98) : le titre du hero de l'accueil et des fiches projets.
- **Headline** (500, clamp 2,4–4,4 rem, interligne 1) : le titre de chaque page ; aussi les années de la chronologie, en condensée.
- **Callout** (clamp 2,2–3,4 rem, interligne 1) : les numéros de téléphone en condensée, les noms de l'index des réalisations sur ordinateur.
- **Menu** (500, étendue, clamp 2,1–3,4 rem, proportionnel à la largeur de l'écran) : les liens du menu plein écran sur mobile.
- **Title** (500, clamp 1,9–3,1 rem, interligne 1,04) : les titres de section, en phrase terminée par un point.
- **Value** (650, condensée, clamp 1,6–2,3 rem) : les valeurs mises en avant d'une fiche (manifeste, matières).
- **Subtitle** (550, clamp 1,3–1,75 rem, largeur 112 %) : titres d'étapes, de services, de questions, noms propres.
- **Lead** (400, clamp 1,18–1,42 rem, interligne 1,45, 38 caractères max) : chapeaux.
- **Body** (400, clamp 1,06–1,125 rem, interligne 1,6, mesure 64 caractères) : texte courant.
- **Label** (400, 0,9 rem) : légendes, libellés de fiches, notes, petites plaques.
- **Control** (600, 1 rem, largeur 112 %) : libellés des plaques et liens de la navigation.
- **Note** (600, 0,78 rem) : repère de la jauge, annotations des photographies, étiquette du curseur.
- **Scale** (600, condensée, 0,66 rem) : graduations de la jauge, décoratives et masquées aux lecteurs d'écran.
- **Measure** (650, condensée, chiffres tabulaires) : un style plutôt qu'une taille, posé sur les profondeurs, cotes, numéros d'étapes, années, valeurs et téléphones.

La carte du secteur a sa propre échelle de texte, en unités du dessin SVG (13 à 25), pour grandir et rétrécir avec la carte.

### Named Rules
**The Sentence Case Rule.** Titres en casse de phrase, terminés par un point quand ils forment une phrase ; aucune capitale décorative, aucun surtitre au-dessus d'un titre.
**The No Fake Italic Rule.** La police n'a pas d'italique : `cite` et `em` restent romains, jamais d'oblique simulé.

## Layout

Grille de 12 colonnes, gouttière fluide (16–32 px), largeur maximale 1 760 px. Marge latérale fluide de 20 à 64 px sur mobile et tablette ; dès 1 024 px, la marge s'élargit (92–120 px) pour laisser la jauge de profondeur libre dans le bord gauche. Le texte commence en colonne 2 sur ordinateur, les photographies peuvent partir de la colonne 1 ou aller à fond perdu. Compositions asymétriques, texte aligné à gauche, aucune section entièrement centrée. Rythme vertical par paliers de 4 px (0,25 à 8 rem), sections espacées de 6 à 12 rem. Sous 1 024 px, tout passe en une colonne, la jauge disparaît et une barre d'appel apparaît en bas d'écran après le hero.

## Elevation & Depth

Aucune ombre portée. La profondeur est littérale : elle se lit dans la couleur des sections (émail en surface, membrane sous l'eau en profondeur), dans la jauge graduée qui suit le défilement, et dans l'eau WebGL du hero et du pied de page. Les superpositions (panneaux posés sur une photo, visionneuse, en-tête plein) utilisent des aplats, jamais d'ombre ni de flou.

### Named Rules
**The Seams Not Shadows Rule.** Toute séparation est une ligne de soudure : double trait fin (3 px, `double`, couleur joint) entre éléments d'une liste, trait plein de 2 px ardoise en tête d'une fiche technique.
**The Depth Is Content Rule.** Une section sombre signifie « plus profond », jamais « mise en avant » : on ne fonce pas un fond pour attirer l'œil.

## Shapes

Angles vifs partout (rayon 0) : champs, photographies, cadres, visionneuse ; seules les plaques d'action ont l'arête à peine adoucie (2 px) d'une plaque émaillée. Les seules formes rondes sont les points de repère des photographies annotées et les points de la carte. Les photographies gardent leurs proportions réelles quand elles sont montrées pour elles-mêmes ; les recadrages ne servent qu'à tenir une composition.

## Components

### Buttons
Des plaques émaillées : un aplat, un libellé qui dit ce qui va se passer.
- **Shape:** rectangle à l'arête adoucie (2 px), hauteur 52 px (44 px pour la petite plaque), libellé Archivo 600 en largeur 112 %.
- **Primary:** plaque rouge, texte blanc, flèche dessinée en SVG réservée à l'action principale d'une zone.
- **Hover / Focus:** un aplat plus sombre monte du bas comme l'eau qui remplit la plaque (0,45 s) ; focus visible par contour de 2 px de la couleur de marquage.
- **Secondary:** plaque ardoise (texte émail) ou plaque émail (texte ardoise) ; plaque « ligne » en contour pour les actions tertiaires.

### Chips
- **Style:** choix en plaques des formulaires et du nuancier : contour ardoise 1 px, fond émail.
- **State:** choisi = aplat ardoise, texte émail ; ce sont de vrais boutons radio, cochés au clavier.

### Cards / Containers
Pas de cartes. Les contenus se rangent en lignes séparées par des soudures (index des réalisations, services, questions fréquentes, engagements) ou en fiches techniques (libellé à gauche, valeur à droite, « À préciser » en gris pour toute information non fournie).

### Inputs / Fields
- **Style:** fond blanc, contour joint 1 px, trait ardoise de 2 px en bas, angles vifs, hauteur 48 px.
- **Focus:** contour rouge de 2 px décalé.
- **Error / Disabled:** trait du bas rouge, message d'erreur en rouge gras sous le champ, résumé annoncé, focus sur le premier champ à corriger.

### Navigation
En-tête fixe : transparent sur une photographie, plein (émail) une fois la photo passée, masqué en descendant et rappelé en remontant ou au clavier. Logotype à gauche (« aqualiner » étendu, « 34 » condensé rouge), cinq liens, téléphone et plaque « Votre projet » à droite ; lien actif souligné d'un trait rouge (turquoise sur fond sombre). Sur mobile, un menu plein écran sur fond profond.

### Jauge de profondeur
Signature du système : une échelle graduée fixe à gauche (ordinateur), de 0,00 m en haut à 2,20 m au pied de page, dont le repère suit le défilement et affiche la profondeur en chiffres condensés. Repère rouge sur émail, turquoise sur fond profond.

### Photographie annotée
Un point de repère sur la partie du bassin, une ligne de rappel, une étiquette émail. Sur mobile, les repères deviennent des numéros reportés en légende.

### Eau WebGL
Réfraction et caustiques sur la seule surface de l'eau des photographies (masques dessinés), lumière discrète au fond du pied de page, nuancier de l'eau. Toujours une image fixe de repli : sans WebGL, avec « réduire les animations », ou quand l'appareil ne tient pas 25 images par seconde.

## Do's and Don'ts

### Do:
- **Do** passer chaque marquage au turquoise sur une section profonde, et garder le rouge pour la surface.
- **Do** séparer les éléments d'une liste par une ligne de soudure (double trait fin), jamais par une ombre ou une carte.
- **Do** afficher « À préciser » pour toute information que l'entreprise n'a pas fournie, plutôt que de l'inventer.
- **Do** montrer les vraies photographies datées des chantiers, à leurs proportions, et les annoter quand une partie du bassin mérite d'être nommée.
- **Do** composer en asymétrie sur 12 colonnes, texte à gauche, et laisser la jauge libre dans la marge gauche sur ordinateur.
- **Do** garder un seul moment orchestré par page ; le reste du mouvement répond au geste du visiteur et respecte « réduire les animations ».

### Don't:
- **Don't** utiliser de dégradés violets, de verre dépoli, d'émojis en guise d'icônes, de coins arrondis ou d'ombres.
- **Don't** poser de surtitre au-dessus d'un titre, ni numéroter ce qui n'est pas une vraie séquence (étapes de pose, chronologie).
- **Don't** centrer une section entière.
- **Don't** utiliser le turquoise comme simple accent sur l'émail, ni le rouge du marquage sur un fond profond.
- **Don't** simuler un italique, une police à chasse fixe ou une matière (relief CSS, texture imitée).
- **Don't** afficher une image de banque ni la réalisation d'une autre entreprise.
