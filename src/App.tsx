import { AnimatePresence } from 'motion/react'
import { lazy, Suspense, useEffect, type MouseEvent, type ReactNode } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import CursorLabel from './components/CursorLabel/CursorLabel'
import DepthGauge from './components/DepthGauge/DepthGauge'
import Header from './components/Header/Header'
import MobileCallBar from './components/MobileCallBar/MobileCallBar'
import Page from './components/Page/Page'
import { LayoutProvider } from './lib/layout'
import { ScrollProvider } from './lib/scroll'
import Home from './pages/Home/Home'
import { pageLoaders, preloadPages } from './routes'
import './styles/type.css'

const Realisations = lazy(pageLoaders.realisations)
const Projet = lazy(pageLoaders.projet)
const SavoirFaire = lazy(pageLoaders.savoirFaire)
const Services = lazy(pageLoaders.services)
const Atelier = lazy(pageLoaders.atelier)
const Contact = lazy(pageLoaders.contact)
const MentionsLegales = lazy(pageLoaders.mentions)
const NotFound = lazy(pageLoaders.introuvable)

/** En attendant un chunk : le même aplat que le rideau de transition, sans saut visuel. */
function Attente() {
  return <div style={{ position: 'fixed', inset: 0, background: 'var(--fond)', zIndex: 45 }} aria-hidden="true" />
}

const page = (element: ReactNode) => (
  <Suspense fallback={<Attente />}>
    <Page>{element}</Page>
  </Suspense>
)

function focusMain(event: MouseEvent) {
  event.preventDefault()
  document.getElementById('contenu')?.focus()
}

export default function App() {
  const location = useLocation()

  useEffect(() => preloadPages(), [])

  return (
    <ScrollProvider>
      <LayoutProvider>
        <a className="evitement" href="#contenu" onClick={focusMain}>
          Aller au contenu
        </a>
        <Header />
        <DepthGauge />
        <CursorLabel />
        <main id="contenu" tabIndex={-1}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={page(<Home />)} />
              <Route path="/realisations" element={page(<Realisations />)} />
              <Route path="/realisations/:slug" element={page(<Projet />)} />
              <Route path="/savoir-faire" element={page(<SavoirFaire />)} />
              <Route path="/services" element={page(<Services />)} />
              <Route path="/atelier" element={page(<Atelier />)} />
              <Route path="/contact" element={page(<Contact />)} />
              <Route path="/mentions-legales" element={page(<MentionsLegales />)} />
              <Route path="*" element={page(<NotFound />)} />
            </Routes>
          </AnimatePresence>
        </main>
        <MobileCallBar />
      </LayoutProvider>
    </ScrollProvider>
  )
}
