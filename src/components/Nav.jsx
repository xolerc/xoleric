import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/work', label: 'ishlar' },
  { to: '/store', label: 'store' },
  { to: '/about', label: 'men haqimda' },
  { to: '/contact', label: 'aloqa' },
  { to: '/cv', label: 'CV' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [loc.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // ESC bilan yopish — aqlli mobil
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open ])

  return (
    <header className="no-print fixed inset-x-0 top-0 z-[70] border-b border-[rgba(242,240,234,0.12)] bg-[rgba(6,6,7,0.88)] backdrop-blur-md supports-[backdrop-filter]:bg-[rgba(6,6,7,0.78)]">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-5">
        <Link
          to="/"
          className="font-head flex min-h-[44px] items-center text-xl font-bold tracking-tight text-[#f2f0ea]"
          aria-label="xoleric — bosh sahifa"
        >
          xoleric<span className="text-[#c9a86a]">.</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Asosiy">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `font-head relative flex min-h-[44px] items-center text-[13px] font-medium tracking-[0.12em] uppercase transition-colors ${
                  isActive ? 'text-[#c9a86a]' : 'text-[#9b978e] hover:text-[#f2f0ea]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <i
                      aria-hidden="true"
                      className="absolute -bottom-0.5 left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-[#c9a86a]"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="font-head hidden min-h-[44px] items-center rounded-[3px] bg-[#c9a86a] px-5 text-[13px] font-semibold tracking-wide text-[#060607] uppercase shadow-[0_2px_12px_rgba(201,168,106,0.2)] transition-all hover:bg-[#d0b47c] hover:shadow-[0_8px_28px_rgba(201,168,106,0.3)] active:scale-[0.98] md:inline-flex"
          >
            Meni yolla
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[4px] border border-[rgba(242,240,234,0.14)] text-[#f2f0ea] transition-colors active:bg-[rgba(242,240,234,0.08)] md:hidden"
            aria-label={open ? 'Menyuni yopish' : 'Menyuni ochish'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
              onClick={() => setOpen(false)}
              className="fixed inset-0 top-16 bg-black/55 backdrop-blur-[2px] md:hidden"
            />
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.24, ease: [0.22, 0.8, 0.28, 1] }}
              className="relative overflow-hidden border-t border-[rgba(242,240,234,0.12)] bg-[#0e0e11]/98 backdrop-blur-md md:hidden"
              aria-label="Mobil"
            >
              <div className="flex max-h-[calc(100dvh-4rem)] flex-col overflow-y-auto px-5 py-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex min-h-[52px] items-center border-b border-[rgba(242,240,234,0.07)] font-head text-[15px] font-medium tracking-[0.1em] uppercase ${
                      isActive ? 'text-[#c9a86a]' : 'text-[#f2f0ea]'
                    }`
                  }
                >
                  bosh sahifa
                </NavLink>
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    className={({ isActive }) =>
                      `flex min-h-[52px] items-center justify-between border-b border-[rgba(242,240,234,0.07)] font-head text-[15px] font-medium tracking-[0.1em] uppercase ${
                        isActive ? 'text-[#c9a86a]' : 'text-[#f2f0ea]'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {l.label}
                        <span aria-hidden="true" className={isActive ? 'text-[#c9a86a]' : 'text-[#3a3a3e]'}>
                          →
                        </span>
                      </>
                    )}
                  </NavLink>
                ))}
                <Link
                  to="/contact"
                  className="font-head mt-4 flex min-h-[52px] items-center justify-center rounded-[4px] bg-[#c9a86a] text-sm font-semibold tracking-wide text-[#060607] uppercase active:scale-[0.98]"
                >
                  Meni yolla →
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
