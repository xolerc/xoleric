import { useEffect } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import Loader from './components/Loader.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import { ToastProvider } from './components/Toast.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Work from './pages/Work.jsx'
import Store from './pages/Store.jsx'
import Cv from './pages/Cv.jsx'
import Contact from './pages/Contact.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}

function NotFound() {
  return (
    <div className="mx-auto max-w-[1200px] px-5 pt-40 pb-32 text-center">
      <p className="font-head text-xs font-semibold tracking-[0.3em] text-[#c9a86a] uppercase">
        404
      </p>
      <h1 className="font-display mt-3 text-7xl text-[#f2f0ea]">Topilmadi</h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#9b978e]">
        Bu manzil mavjud emas. Bosh sahifaga qayting yoki ishlarni ko‘ring.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="rounded-[3px] bg-[#c9a86a] px-6 py-3 font-head text-sm font-semibold tracking-wide text-[#060607] uppercase hover:bg-[#d0b47c]"
        >
          Bosh sahifa
        </Link>
        <Link
          to="/work"
          className="rounded-[3px] border border-[rgba(242,240,234,0.25)] px-6 py-3 font-head text-sm font-semibold tracking-wide text-[#f2f0ea] uppercase hover:border-[#c9a86a] hover:text-[#c9a86a]"
        >
          Ishlar
        </Link>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.PROD ? '/xoleric' : undefined}>
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
          <main id="main">
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/work" element={<Work />} />
              <Route path="/store" element={<Store />} />
              <Route path="/cv" element={<Cv />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ToastProvider>
    </BrowserRouter>
  )
}
