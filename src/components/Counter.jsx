import { useEffect, useState } from 'react'

export default function Counter({ to, duration = 1400, suffix = '' }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (typeof to !== 'number' || Number.isNaN(to)) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setN(to)
      return
    }
    let raf = 0
    const t0 = performance.now()
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(eased * to))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, duration])
  return (
    <span>
      {n}
      {suffix}
    </span>
  )
}
