const monthYear = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric', timeZone: 'UTC' })

/** « juillet 2018 » à partir d'une date ISO (AAAA-MM-JJ), ou null. */
export function formatMonthYear(iso: string | null): string | null {
  if (!iso) return null
  return monthYear.format(new Date(`${iso}T12:00:00Z`))
}

/** Valeur affichée pour une information que le client doit encore fournir. */
export const A_PRECISER = 'À préciser'
