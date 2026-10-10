import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setP(max > 0 ? h.scrollTop / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="no-print fixed inset-x-0 top-0 z-[80] h-[2px] bg-transparent" aria-hidden="true">
      <div className="h-full bg-[#c9a86a]" style={{ width: `${p * 100}%` }} />
    </div>
  )
}
