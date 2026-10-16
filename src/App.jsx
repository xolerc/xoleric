import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import Loader from './components/Loader.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import MobileCTA from './components/MobileCTA.jsx'
import { ToastProvider } from './components/Toast.jsx'
import { SITE_BASE } from './lib/site.js'

/* Aqlli code-split: har sahifa alohida chunk — ilk yuklanish yengil */
const Home = lazy(() => import('./pages/Home.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Work = lazy(() => import('./pages/Work.jsx'))
const Store = lazy(() => import('./pages/Store.jsx'))
const Cv = lazy(() => import('./pages/Cv.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

function PageFallback() {
  return (
    <div className="mx-auto max-w-[1200px] px-5 pt-32 pb-24" aria-busy="true" aria-label="Sahifa yuklanmoqda">
      <div className="skeleton-shimmer h-10 w-48" />
      <div className="skeleton-shimmer mt-4 h-6 w-full max-w-xl" />
      <div className="skeleton-shimmer mt-2 h-6 w-2/3 max-w-lg" />
    </div>
  )
}

function NotFound() {
  return (
    <div className="mx-auto max-w-[1200px] px-5 pt-36 pb-28 text-center sm:pt-40 sm:pb-32">
      <p className="font-head text-xs font-semibold tracking-[0.3em] text-[#c9a86a] uppercase">
        404
      </p>
      <h1 className="font-display mt-3 text-6xl text-[#f2f0ea] sm:text-7xl">Topilmadi</h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-pretty text-[#9b978e]">
        Bu manzil mavjud emas. Bosh sahifaga qayting yoki ishlarni ko‘ring.
      </p>
      <div className="mt-7 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:justify-center">
        <Link
          to="/"
          className="font-head flex min-h-[52px] items-center justify-center rounded-[3px] bg-[#c9a86a] px-6 text-sm font-semibold tracking-wide text-[#060607] uppercase transition-all hover:bg-[#d0b47c] active:scale-[0.98]"
        >
          Bosh sahifa
        </Link>
        <Link
          to="/work"
          className="font-head flex min-h-[52px] items-center justify-center rounded-[3px] border border-[rgba(242,240,234,0.25)] px-6 text-sm font-semibold tracking-wide text-[#f2f0ea] uppercase transition-colors hover:border-[#c9a86a] hover:text-[#c9a86a]"
        >
          Ishlar
        </Link>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={SITE_BASE || undefined}>
      <ToastProvider>
        <a className="skip-link" href="#main">
          Asosiy kontentga o‘tish
        </a>
        <Loader />
        <ScrollProgress />
        <div className="noir-lines-bg" aria-hidden="true" />
        <div className="noir-grain" aria-hidden="true" />
        <div id="top" className="relative z-10">
          <Nav />
          <main id="main" className="pb-20 md:pb-0">
            <ScrollToTop />
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/work" element={<Work />} />
                <Route path="/store" element={<Store />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cv" element={<Cv />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <MobileCTA />
        </div>
      </ToastProvider>
    </BrowserRouter>
  )
}
