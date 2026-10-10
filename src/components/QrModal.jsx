import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function QrModal({ open, app, onClose }) {
  const boxRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const main = document.getElementById('main')
    const prevInert = main?.hasAttribute('inert')
    main?.setAttribute('inert', '')
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && boxRef.current) {
        const f = boxRef.current.querySelectorAll(
          'a[href], button:not([disabled])',
        )
        if (f.length === 0) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      if (!prevInert) main?.removeAttribute('inert')
    }
  }, [open, onClose])

  if (!open || !app) return null

  return (
    <div
      className="fixed inset-0 z-[88] flex items-center justify-center p-5"
      role="dialog"
      aria-modal="true"
      aria-label={`${app.name} — QR kod`}
    >
      <div className="absolute inset-0 bg-black/80" onClick={onClose} aria-hidden="true" />
      <motion.div
        ref={boxRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-sm border border-[rgba(242,240,234,0.12)] bg-[#0e0e11] p-6 text-center"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Yopish"
          className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-[2px] border border-[rgba(242,240,234,0.12)] text-[#9b978e] hover:border-[#c9a86a] hover:text-[#c9a86a]"
        >
          <X size={18} />
        </button>
        <img
          src={app.qr}
          alt={`${app.name} — yuklab olish QR kodi`}
          width="320"
          height="320"
          className="mx-auto h-64 w-64 rounded-[2px] border border-[rgba(242,240,234,0.12)] object-cover"
        />
        <b className="font-head mt-4 block text-xl font-bold text-[#f2f0ea]">{app.name}</b>
        <p className="mt-1 text-sm text-[#9b978e]">{app.sub}</p>
        <a
          href={app.releases}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 block rounded-[3px] bg-[#c9a86a] px-6 py-3 font-head text-sm font-semibold tracking-wide text-[#060607] uppercase transition-colors hover:bg-[#d0b47c]"
        >
          GitHub Releases da ochish
        </a>
      </motion.div>
    </div>
  )
}
