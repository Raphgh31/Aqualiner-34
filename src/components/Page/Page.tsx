import type { ReactNode } from 'react'
import Footer from '../Footer/Footer'
import PageTransition from '../PageTransition/PageTransition'

/** Une page du site : son contenu, puis le fond (pied de page), dans la même transition. */
export default function Page({ children }: { children: ReactNode }) {
  return (
    <PageTransition>
      {children}
      <Footer />
    </PageTransition>
  )
}
