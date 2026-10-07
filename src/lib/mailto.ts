/** Ce que le formulaire de contact recueille. */
export type ContactData = {
  projet: string
  forme?: string
  revetement?: string
  dimensions?: string
  commune: string
  nom: string
  telephone?: string
  email?: string
  message?: string
}

/** Texte de la demande, tel qu'il partira par e-mail (et tel qu'on peut le copier). */
export function demandText(data: ContactData): string {
  const bassin = [data.forme, data.revetement, data.dimensions?.trim() && `environ ${data.dimensions.trim()}`].filter(Boolean).join(', ')
  const message = data.message?.trim()
  const telephone = data.telephone?.trim()
  const email = data.email?.trim()

  const lines = ['Bonjour,', '', `Projet : ${data.projet}`]
  if (bassin) lines.push(`Bassin : ${bassin}`)
  lines.push(`Commune : ${data.commune}`)
  if (message) lines.push('', 'Message :', message)
  lines.push('', `Nom : ${data.nom}`)
  if (telephone) lines.push(`Téléphone : ${telephone}`)
  if (email) lines.push(`E-mail : ${email}`)
  return lines.join('\n')
}

/** Lien mailto: avec sujet et corps encodés (les « & », « ? », « # » et retours à la ligne passent intacts). */
export function buildMailto(data: ContactData, to: string): string {
  const subject = `Demande de projet — ${data.projet} — ${data.commune}`
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(demandText(data))}`
}
