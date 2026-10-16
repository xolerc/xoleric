import { memo } from 'react'
import { ArrowUpRight, GitFork, Star } from 'lucide-react'
import { langColor } from '../lib/github.js'

function artLetter(name) {
  const ch = (name || 'X').trim().charAt(0).toUpperCase()
  return /[A-Z0-9]/.test(ch) ? ch : 'X'
}

function ProjectCard({ repo, curated: c }) {
  if (c) {
    return (
      <article className="card-smart group flex h-full flex-col border border-[rgba(242,240,234,0.12)] bg-[#0e0e11] focus-within:border-[rgba(201,168,106,0.55)] hover:border-[rgba(201,168,106,0.45)]">
        <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-[rgba(242,240,234,0.12)] bg-[#141417]">
          <span
            aria-hidden="true"
            className="font-display text-[7rem] leading-none text-[rgba(242,240,234,0.08)] transition-transform duration-300 select-none group-hover:scale-110"
          >
            {artLetter(c.name)}
          </span>
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 border border-[rgba(242,240,234,0.12)] bg-[rgba(6,6,7,0.85)] px-2 py-1 font-head text-[11px] font-medium tracking-wide text-[#9b978e] uppercase backdrop-blur-sm">
            <i className="inline-block h-2 w-2 rounded-full bg-[#c9a86a]" aria-hidden="true" />
            {c.lang}
          </span>
          <span className="absolute right-3 bottom-3 hidden rounded-[3px] bg-[#c9a86a] px-2.5 py-1 font-head text-[11px] font-semibold tracking-wide text-[#060607] uppercase opacity-0 transition-opacity group-hover:opacity-100">
            Tanlangan
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <span className="font-head text-[11px] font-medium tracking-[0.18em] text-[#9b978e] uppercase">
            {c.stack}
          </span>
          <h3 className="font-head mt-2 text-xl font-bold text-[#f2f0ea]">{c.name}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-[#9b978e]">
            {c.desc} <strong className="font-semibold text-[#c9a86a]">{c.impact}</strong>
          </p>
        </div>
      </article>
    )
  }
  const name = repo?.name || 'Untitled'
  const desc = repo?.description || 'Tavsif yozilmagan — kodning o‘zi gapiradi.'
  const lang = repo?.language || 'Code'
  const stars = repo?.stargazers_count ?? 0
  const forks = repo?.forks_count ?? 0
  const url = repo?.html_url || 'https://github.com/xolerc'
  return (
    <article className="card-smart group flex h-full flex-col border border-[rgba(242,240,234,0.12)] bg-[#0e0e11] focus-within:border-[rgba(201,168,106,0.55)] hover:border-[rgba(201,168,106,0.5)]">
      <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-[rgba(242,240,234,0.12)] bg-[#141417]">
        <span
          aria-hidden="true"
          className="font-display text-[7rem] leading-none text-[rgba(242,240,234,0.08)] transition-transform duration-300 select-none group-hover:scale-110"
        >
          {artLetter(name)}
        </span>
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 border border-[rgba(242,240,234,0.12)] bg-[rgba(6,6,7,0.85)] px-2 py-1 font-head text-[11px] font-medium tracking-wide text-[#9b978e] uppercase backdrop-blur-sm">
          <i
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: langColor(lang) }}
            aria-hidden="true"
          />
          {lang}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-head text-xl font-bold break-words text-[#f2f0ea]">{name}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[#9b978e]">{desc}</p>
        <div className="mt-3 flex items-center gap-4 font-head text-xs font-medium tracking-wide text-[#9b978e]">
          <span className="inline-flex items-center gap-1.5">
            <Star size={13} className="text-[#c9a86a]" aria-hidden="true" /> {stars}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <GitFork size={13} aria-hidden="true" /> {forks}
          </span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} — GitHub da ochish`}
          className="font-head mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-[13px] font-semibold tracking-wide text-[#c9a86a] uppercase transition-colors hover:gap-2.5 hover:text-[#d0b47c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a86a]"
        >
          GitHub da ochish <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}

export default memo(ProjectCard)
