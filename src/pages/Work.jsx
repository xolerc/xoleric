import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import SectionHead from '../components/SectionHead.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Reveal from '../components/Reveal.jsx'
import { curated } from '../data.js'
import { fallbackRepos, fetchRepos } from '../lib/github.js'

function Skeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="Yuklanmoqda">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse border border-[rgba(242,240,234,0.12)] bg-[#0e0e11] p-5"
        >
          <div className="h-24 rounded-[2px] bg-[#141417]" />
          <div className="mt-4 h-4 w-2/3 rounded-[2px] bg-[#141417]" />
          <div className="mt-2 h-3 w-full rounded-[2px] bg-[#141417]" />
          <div className="mt-2 h-3 w-5/6 rounded-[2px] bg-[#141417]" />
        </div>
      ))}
    </div>
  )
}

export default function Work() {
  const [repos, setRepos] = useState(null)
  const [error, setError] = useState('')
  const [usedFallback, setUsedFallback] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [q, setQ] = useState('')
  const [lang, setLang] = useState('Barchasi')

  useEffect(() => {
    const ctrl = new AbortController()
    setRepos(null)
    setError('')
    setUsedFallback(false)
    fetchRepos(ctrl.signal)
      .then((live) => {
        if (!ctrl.signal.aborted) setRepos(live)
      })
      .catch((e) => {
        if (ctrl.signal.aborted) return
        if (e?.name === 'AbortError') return
        setRepos(fallbackRepos())
        setUsedFallback(true)
        setError('GitHub‘ga ulanib bo‘lmadi — saqlangan ro‘yxat ko‘rsatilmoqda.')
      })
    return () => ctrl.abort()
  }, [attempt])

  const langs = useMemo(() => {
    if (!repos) return ['Barchasi']
    const set = new Set(repos.map((r) => r.language || 'Code'))
    return ['Barchasi', ...[...set].sort()]
  }, [repos])

  const filtered = useMemo(() => {
    if (!repos) return []
    const needle = q.trim().toLowerCase()
    return repos.filter((r) => {
      const okLang = lang === 'Barchasi' || (r.language || 'Code') === lang
      if (!okLang) return false
      if (!needle) return true
      return (
        (r.name || '').toLowerCase().includes(needle) ||
        (r.description || '').toLowerCase().includes(needle)
      )
    })
  }, [repos, q, lang])

  return (
    <>
      <div className="mx-auto max-w-[1200px] px-5 pt-32 pb-8">
        <Link to="/" className="font-head text-xs font-medium tracking-[0.2em] text-[#9b978e] uppercase hover:text-[#c9a86a]">
          ← Bosh sahifa
        </Link>
        <h1 className="font-display mt-4 text-6xl text-[#f2f0ea] sm:text-7xl">
          Ish<em className="text-[#c9a86a] not-italic">lar</em>
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#9b978e]">
          Tanlangan loyihalar va GitHub‘dan jonli — har push bilan yangilanadi.
        </p>
      </div>

      <section aria-label="Tanlangan" className="mx-auto max-w-[1200px] px-5 py-8">
        <p className="font-head text-xs font-medium tracking-[0.25em] text-[#9b978e] uppercase">
          Tanlangan — CV dan
        </p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {curated.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.06}>
              <ProjectCard curated={c} />
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-label="GitHub jonli" className="mx-auto max-w-[1200px] px-5 py-12">
        <SectionHead
          num="02 — Jonli"
          eyebrow="github‘dan jonli"
          title="So‘nggi 6 ta repo"
          side="api.github.com/users/xolerc/repos"
        />
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-[#9b978e]" aria-hidden="true" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Qidiruv — nom yoki tavsif…"
              aria-label="Loyihalarni qidirish"
              className="w-full rounded-[3px] border border-[rgba(242,240,234,0.12)] bg-[#0e0e11] py-3 pr-3 pl-10 text-sm text-[#f2f0ea] placeholder:text-[#6f6c66]"
            />
          </label>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            aria-label="Til bo‘yicha filter"
            className="rounded-[3px] border border-[rgba(242,240,234,0.12)] bg-[#0e0e11] px-3 py-3 font-head text-sm font-medium text-[#f2f0ea]"
          >
            {langs.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6" aria-live="polite">
          {repos === null && <Skeleton />}
          {repos !== null && filtered.length === 0 && (
            <p className="border border-[rgba(242,240,234,0.12)] bg-[#0e0e11] p-8 text-center text-sm text-[#9b978e]">
              Hech narsa topilmadi — qidiruvni tozalab ko‘ring.
            </p>
          )}
          {repos !== null && filtered.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((r) => (
                <ProjectCard key={r.id || r.name} repo={r} />
              ))}
            </div>
          )}
          {error && (
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border border-[rgba(201,168,106,0.35)] bg-[rgba(201,168,106,0.07)] p-4 text-sm text-[#f2f0ea]">
              <span>{error}</span>
              <button
                type="button"
                onClick={() => setAttempt((a) => a + 1)}
                className="rounded-[3px] bg-[#c9a86a] px-4 py-2 font-head text-xs font-semibold tracking-wide text-[#060607] uppercase hover:bg-[#d0b47c]"
              >
                Qayta urinish
              </button>
            </div>
          )}
          {usedFallback && !error && (
            <p className="mt-4 text-xs text-[#6f6c66]">Saqlangan ro‘yxat ko‘rsatilmoqda.</p>
          )}
        </div>
      </section>
    </>
  )
}
