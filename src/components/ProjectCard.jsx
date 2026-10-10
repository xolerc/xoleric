import { langColor } from '../lib/github.js'

function artLetter(name) {
  const ch = (name || 'X').trim().charAt(0).toUpperCase()
  return /[A-Z0-9]/.test(ch) ? ch : 'X'
}

export default function ProjectCard({ repo, curated: c }) {
  if (c) {
    return (
      <article className="group flex flex-col border border-[rgba(242,240,234,0.12)] bg-[#0e0e11]">
        <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-[rgba(242,240,234,0.12)] bg-[#141417]">
          <span className="font-display text-[7rem] leading-none text-[rgba(242,240,234,0.08)] select-none">
            {artLetter(c.name)}
          </span>
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 border border-[rgba(242,240,234,0.12)] bg-[rgba(6,6,7,0.85)] px-2 py-1 font-head text-[11px] font-medium tracking-wide text-[#9b978e] uppercase">
            <i className="inline-block h-2 w-2 rounded-full bg-[#c9a86a]" aria-hidden="true" />
            {c.lang}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <span className="font-head text-[11px] font-medium tracking-[0.18em] text-[#9b978e] uppercase">
            {c.stack}
          </span>
          <h3 className="font-head mt-2 text-xl font-bold text-[#f2f0ea]">{c.name}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-[#9b978e]">
            {c.desc} <strong className="text-[#c9a86a]">{c.impact}</strong>
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
    <article className="group flex flex-col border border-[rgba(242,240,234,0.12)] bg-[#0e0e11] transition-colors hover:border-[rgba(201,168,106,0.5)]">
      <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-[rgba(242,240,234,0.12)] bg-[#141417]">
        <span className="font-display text-[7rem] leading-none text-[rgba(242,240,234,0.08)] select-none">
          {artLetter(name)}
        </span>
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 border border-[rgba(242,240,234,0.12)] bg-[rgba(6,6,7,0.85)] px-2 py-1 font-head text-[11px] font-medium tracking-wide text-[#9b978e] uppercase">
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
          <span>★ {stars}</span>
          <span>⑂ {forks}</span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-head mt-4 inline-block text-[13px] font-semibold tracking-wide text-[#c9a86a] uppercase hover:text-[#d0b47c]"
        >
          GitHub da ochish →
        </a>
      </div>
    </article>
  )
}
