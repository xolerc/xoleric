import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { RotateCcw, Search, X } from 'lucide-react'
import SectionHead from '../components/SectionHead.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Reveal from '../components/Reveal.jsx'
import SkeletonGrid from '../components/Skeleton.jsx'
import Button from '../components/Button.jsx'
import { curated } from '../data.js'
import { fallbackRepos, fetchRepos, getCachedRepos } from '../lib/github.js'

export default function Work() {
  const [repos, setRepos] = useState(() => getCachedRepos() || null)
  const [error, setError] = useState('')
  const [usedFallback, setUsedFallback] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [q, setQ] = useState('')
  const [lang, setLang] = useState('Barchasi')
  const deferredQ = useDeferredValue(q)

  useEffect(() => {
    const ctrl = new AbortController()
    setError('')
    // Kesh bo'lsa fonda yangilaymiz (stale-while-revalidate)
    fetchRepos(ctrl.signal)
      .then((live) => {
        if (!ctrl.signal.aborted) {
          setRepos(live)
          setUsedFallback(false)
        }
      })
      .catch((e) => {
        if (ctrl.signal.aborted) return
        if (e?.name === 'AbortError') return
        if (!repos) {
          setRepos(fallbackRepos())
          setUsedFallback(true)
        }
        setError('GitHub‘ga ulanib bo‘lmadi — saqlangan ro‘yxat ko‘rsatilmoqda.')
      })
    return () => ctrl.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt])

  const langs = useMemo(() => {
    if (!repos) return ['Barchasi']
    const set = new Set(repos.map((r) => r.language || 'Code'))
    return ['Barchasi', ...[...set].sort()]
  }, [repos])

  const filtered = useMemo(() => {
    if (!repos) return []
    const needle = deferredQ.trim().toLowerCase()
    return repos.filter((r) => {
      const okLang = lang === 'Barchasi' || (r.language || 'Code') === lang
      if (!okLang) return false
      if (!needle) return true
      return (
        (r.name || '').toLowerCase().includes(needle) ||
        (r.description || '').toLowerCase().includes(needle)
      )
    })
  }, [repos, deferredQ, lang])

  return (
    <>
      <div className="mx-auto max-w-[1200px] px-5 pt-28 pb-6 sm:pt-32 sm:pb-8">
        <Link
          to="/"
          className="font-head inline-flex min-h-[44px] items-center text-xs font-medium tracking-[0.2em] text-[#9b978e] uppercase transition-colors hover:text-[#c9a86a]"
        >
          ← Bosh sahifa
        </Link>
        <h1 className="font-display mt-3 text-6xl text-balance text-[#f2f0ea] sm:text-7xl">
          Ish<em className="text-[#c9a86a] not-italic">lar</em>
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-pretty text-[#9b978e]">
          Tanlangan loyihalar va GitHub‘dan jonli — har push bilan yangilanadi.
        </p>
      </div>

      <section aria-label="Tanlangan" className="mx-auto max-w-[1200px] px-5 py-6 sm:py-8">
        <p className="font-head text-xs font-medium tracking-[0.25em] text-[#9b978e] uppercase">
          Tanlangan — CV dan
        </p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {curated.map((c, i) => (
            <Reveal key={c.name} delay={Math.min(i * 0.06, 0.18)}>
              <ProjectCard curated={c} />
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-label="GitHub jonli" className="mx-auto max-w-[1200px] px-5 py-10 sm:py-12">
        <SectionHead
          num="02 — Jonli"
          eyebrow="github‘dan jonli"
          title="So‘nggi 6 ta repo"
          side="api.github.com/users/xolerc/repos"
        />
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <Search
              size={17}
              className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[#9b978e]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Qidiruv — nom yoki tavsif…"
              aria-label="Loyihalarni qidirish"
              enterKeyHint="search"
              className="min-h-[52px] w-full rounded-[4px] border border-[rgba(242,240,234,0.14)] bg-[#0e0e11] py-3 pr-11 pl-11 text-[16px] text-[#f2f0ea] transition-colors outline-none placeholder:text-[#6f6c66] focus:border-[#c9a86a] sm:text-sm"
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ('')}
                aria-label="Qidiruvni tozalash"
                className="absolute top-1/2 right-2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-[3px] text-[#9b978e] hover:text-[#f2f0ea]"
              >
                <X size={16} />
              </button>
            )}
          </label>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            aria-label="Til bo‘yicha filter"
            className="font-head min-h-[52px] rounded-[4px] border border-[rgba(242,240,234,0.14)] bg-[#0e0e11] px-4 text-sm font-medium text-[#f2f0ea] outline-none focus:border-[#c9a86a] sm:min-h-[52px] sm:w-48"
          >
            {langs.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        {/* Mobil chip-filtr — barmoqqa qulay */}
        {langs.length > 2 && (
          <div
            className="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1 sm:hidden"
            role="group"
            aria-label="Til filtri (tezkor)"
          >
            {langs.slice(0, 8).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`font-head flex min-h-[40px] shrink-0 items-center rounded-full border px-4 text-[12px] font-semibold tracking-wide uppercase transition-all ${
                  lang === l
                    ? 'border-[#c9a86a] bg-[#c9a86a] text-[#060607]'
                    : 'border-[rgba(242,240,234,0.16)] text-[#9b978e]'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        )}

        <p className="font-head mt-4 text-[12px] tracking-wide text-[#6f6c66]" aria-live="polite">
          {repos === null
            ? 'Yuklanmoqda…'
            : `${filtered.length} ta loyiha topildi${lang !== 'Barchasi' ? ` · ${lang}` : ''}${
                deferredQ.trim() ? ` · “${deferredQ.trim()}”` : ''
              }`}
        </p>

        <div className="mt-4" aria-live="polite">
          {repos === null && <SkeletonGrid count={6} />}
          {repos !== null && filtered.length === 0 && (
            <div className="border border-[rgba(242,240,234,0.12)] bg-[#0e0e11] p-8 text-center sm:p-10">
              <p className="text-sm text-[#9b978e]">Hech narsa topilmadi — qidiruvni tozalab ko‘ring.</p>
              <button
                type="button"
                onClick={() => {
                  setQ('')
                  setLang('Barchasi')
                }}
                className="font-head mx-auto mt-4 flex min-h-[48px] items-center gap-2 rounded-[3px] border border-[rgba(242,240,234,0.2)] px-6 text-[13px] font-semibold tracking-wide text-[#f2f0ea] uppercase hover:border-[#c9a86a] hover:text-[#c9a86a]"
              >
                <X size={15} /> Tozalash
              </button>
            </div>
          )}
          {repos !== null && filtered.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((r) => (
                <ProjectCard key={r.id || r.name} repo={r} />
              ))}
            </div>
          )}
          {error && (
            <div className="mt-5 flex flex-col gap-3 rounded-[4px] border border-[rgba(201,168,106,0.35)] bg-[rgba(201,168,106,0.07)] p-4 text-sm text-[#f2f0ea] sm:flex-row sm:items-center sm:justify-between">
              <span>{error}</span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setAttempt((a) => a + 1)}
                className="shrink-0"
              >
                <RotateCcw size={14} aria-hidden="true" /> Qayta urinish
              </Button>
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
