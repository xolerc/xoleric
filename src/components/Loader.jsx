import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Loader() {
  const [done, setDone] = useState(false)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    let raf = 0
    const t0 = performance.now()
    const total = 1200
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / total)
      setPct(Math.round(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setDone(true)
    }
    raf = requestAnimationFrame(tick)
    // Failsafe: hech qachon ekranda qotib qolmasin
    const failsafe = setTimeout(() => setDone(true), 2500)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(failsafe)
    }
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-[#060607]"
          aria-hidden="true"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="font-display text-4xl tracking-wide text-[#f2f0ea]">
            XOLERIC<span className="text-[#c9a86a]">.</span>
          </div>
          <div className="mt-5 h-px w-52 bg-[rgba(242,240,234,0.12)]">
            <div
              className="h-px bg-[#c9a86a] transition-[width] duration-75"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mt-3 font-head text-xs tracking-[0.2em] text-[#9b978e]">{pct}%</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
