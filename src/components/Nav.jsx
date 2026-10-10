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

  return (
    <header className="no-print fixed inset-x-0 top-0 z-[70] border-b border-[rgba(242,240,234,0.12)] bg-[rgba(6,6,7,0.88)] backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-5">
        <Link to="/" className="font-head text-xl font-bold tracking-tight text-[#f2f0ea]" aria-label="xoleric — bosh sahifa">
          xoleric<span className="text-[#c9a86a]">.</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Asosiy">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `font-head text-[13px] font-medium tracking-[0.12em] uppercase transition-colors ${
                  isActive ? 'text-[#c9a86a]' : 'text-[#9b978e] hover:text-[#f2f0ea]'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden rounded-[3px] bg-[#c9a86a] px-4 py-2 font-head text-[13px] font-semibold tracking-wide text-[#060607] uppercase transition-colors hover:bg-[#d0b47c] md:inline-block"
          >
            Meni yolla
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[3px] border border-[rgba(242,240,234,0.12)] text-[#f2f0ea] md:hidden"
            aria-label={open ? 'Menyuni yopish' : 'Menyuni ochish'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-[rgba(242,240,234,0.12)] bg-[#0e0e11] md:hidden"
            aria-label="Mobil"
          >
            <div className="flex flex-col px-5 py-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `border-b border-[rgba(242,240,234,0.07)] py-3 font-head text-sm font-medium tracking-[0.12em] uppercase ${
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
                    `border-b border-[rgba(242,240,234,0.07)] py-3 font-head text-sm font-medium tracking-[0.12em] uppercase ${
                      isActive ? 'text-[#c9a86a]' : 'text-[#f2f0ea]'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                className="mt-4 rounded-[3px] bg-[#c9a86a] px-4 py-3 text-center font-head text-sm font-semibold tracking-wide text-[#060607] uppercase"
              >
                Meni yolla
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
