import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Send } from 'lucide-react'

/* Aqlli mobil CTA: 400px scrolldan keyin chiqadi, contact sahifada yashirinadi.
   Thumb-zone: pastda, 2 katta tugma, safe-area bilan. */
export default function MobileCTA() {
  const [show, setShow] = useState(false)
  const [hide, setHide] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const saved = sessionStorage.getItem('xoleric-cta-hide')
    if (saved) setHide(true)
  }, [])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setShow(window.scrollY > 420)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (pathname === '/contact' || hide || !show) return null

  return (
    <div className="mobile-cta no-print fixed inset-x-0 bottom-0 z-[65] px-4 pb-[calc(0.9rem+env(safe-area-inset-bottom))] md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-2.5 rounded-[6px] border border-[rgba(201,168,106,0.3)] bg-[rgba(10,10,12,0.92)] p-2.5 shadow-[0_16px_48px_rgba(0,0,0,0.6)] backdrop-blur-md">
        <button
          type="button"
          aria-label="Pastki panelni yopish"
          onClick={() => {
            setHide(true)
            sessionStorage.setItem('xoleric-cta-hide', '1')
          }}
          className="flex h-11 w-9 shrink-0 items-center justify-center rounded-[4px] text-[#6f6c66]"
        >
          ✕
        </button>
        <a
          href="https://t.me/Wxoleric"
          target="_blank"
          rel="noopener noreferrer"
          className="font-head flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-[4px] border border-[rgba(242,240,234,0.2)] text-[13px] font-semibold tracking-wide text-[#f2f0ea] uppercase"
        >
          <Send size={15} />
          Telegram
        </a>
        <Link
          to="/contact"
          className="font-head flex min-h-[48px] flex-1 items-center justify-center rounded-[4px] bg-[#c9a86a] text-[13px] font-semibold tracking-wide text-[#060607] uppercase active:scale-[0.98]"
        >
          Meni yolla
        </Link>
      </div>
    </div>
  )
}
