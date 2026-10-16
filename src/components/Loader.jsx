import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Loader() {
  const [done, setDone] = useState(() => {
    try {
      // Takroriy tashrifda kutiktirmaymiz — aqlli
      return sessionStorage.getItem('xoleric-loaded') === '1'
    } catch {
      return false
    }
  })
  const [pct, setPct] = useState(0)

  useEffect(() => {
    if (done) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setDone(true)
      try {
        sessionStorage.setItem('xoleric-loaded', '1')
      } catch {}
      return
    }
    let raf = 0
    const t0 = performance.now()
    const total = 850 // 1200 → 850: tezroq ilk ko'rinish
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / total)
      // Ease-out: boshida tez, oxirida sekin
      const eased = 1 - Math.pow(1 - p, 2)
      setPct(Math.round(eased * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else {
        setDone(true)
        try {
          sessionStorage.setItem('xoleric-loaded', '1')
        } catch {}
      }
    }
    raf = requestAnimationFrame(tick)
    const failsafe = setTimeout(() => {
      setDone(true)
      try {
        sessionStorage.setItem('xoleric-loaded', '1')
      } catch {}
    }, 1800)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(failsafe)
    }
  }, [done])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-[#060607]"
          role="status"
          aria-label="Sahifa yuklanmoqda"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="font-display text-4xl tracking-wide text-[#f2f0ea]">
            XOLERIC<span className="text-[#c9a86a]">.</span>
          </div>
          <div
            className="mt-5 h-px w-52 overflow-hidden bg-[rgba(242,240,234,0.12)]"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-px bg-gradient-to-r from-[#c9a86a] to-[#e8cf9a]"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="font-head mt-3 text-xs tracking-[0.2em] text-[#9b978e] tabular-nums">{pct}%</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
