/* XOLERIC — GitHub live: cache + timeout + aqlli ranglar. */
import { curated, githubUser } from '../data.js'

/* Noir palitraga mos, lekin farqlanadigan til ranglari (kontrastni buzmaydi) */
export const langColors = {
  JavaScript: '#e8c15a',
  TypeScript: '#6aa9e8',
  HTML: '#e07a5f',
  CSS: '#7a9cc6',
  Dart: '#4fc3d8',
  Python: '#7fb069',
  SCSS: '#c98bb9',
  Vue: '#63c184',
  'C++': '#e08bb0',
  Java: '#e09a5a',
  PHP: '#9a8cd0',
  Shell: '#9b978e',
  Dockerfile: '#6aa9e8',
  Rust: '#e07a5f',
}

export const langDefault = '#c9a86a'

export function langColor(lang) {
  return langColors[lang] || langDefault
}

function curatedAsRepos() {
  const mapped = curated.map((c) => ({
    id: `curated-${c.name}`,
    name: c.name,
    description: `${c.desc} ${c.impact || ''}`.trim(),
    language: (c.stack || '').split('·')[0].trim() || 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    html_url: `https://github.com/${githubUser}`,
    pushed_at: '',
  }))
  const extra = [
    {
      id: 'curated-mydrime',
      name: 'mydrime',
      description: 'Ushbu portfolio — Noir nashri, toza statik.',
      language: 'HTML',
      stargazers_count: 0,
      forks_count: 0,
      html_url: `https://github.com/${githubUser}/mydrime`,
      pushed_at: '',
    },
    {
      id: 'curated-savodhon',
      name: 'Savodhon',
      description: 'Savodhon Super — Flutter offlayn lug‘at ilovasi.',
      language: 'Dart',
      stargazers_count: 0,
      forks_count: 0,
      html_url: `https://github.com/${githubUser}/Savodhon`,
      pushed_at: '',
    },
  ]
  return [...mapped, ...extra].slice(0, 6)
}

export function fallbackRepos() {
  return curatedAsRepos()
}

const CACHE_KEY = 'xoleric-repos-v2'
const CACHE_TTL = 6 * 60 * 60 * 1000 // 6 soat

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { at, data } = JSON.parse(raw)
    if (!Array.isArray(data) || Date.now() - at > CACHE_TTL) return null
    return data
  } catch {
    return null
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }))
  } catch {
    /* sig'im to'lsa jim o't */
  }
}

export async function fetchRepos(signal) {
  // Tezkor: kesh bo'lsa darhol qaytar, fonda yangilash Work.jsx da
  const url = `https://api.github.com/users/${encodeURIComponent(githubUser)}/repos?sort=pushed&per_page=20`
  const timeout = AbortSignal.timeout ? AbortSignal.timeout(8000) : undefined
  const combined = signal
    ? signal
    : timeout
      ? timeout
      : undefined
  // Ikkala signalni birlashtirish: tashqi abort ustun
  let ctrl
  if (signal && timeout) {
    ctrl = new AbortController()
    const onAbort = () => ctrl.abort(signal.reason)
    signal.addEventListener('abort', onAbort, { once: true })
    // timeout o'zi abort qiladi
    timeout.addEventListener?.('abort', () => ctrl.abort(), { once: true })
    setTimeout(() => {
      if (!ctrl.signal.aborted) ctrl.abort(new Error('timeout'))
    }, 8000)
  }
  const res = await fetch(url, {
    headers: { Accept: 'application/vnd.github+json' },
    signal: ctrl ? ctrl.signal : combined,
  })
  if (res.status === 403) throw new Error('GitHub limit (403)')
  if (!res.ok) throw new Error(`GitHub HTTP ${res.status}`)
  const list = await res.json()
  if (!Array.isArray(list) || list.length === 0) throw new Error('GitHub empty')
  const live = list.filter((x) => !x.fork).slice(0, 6)
  if (live.length === 0) throw new Error('GitHub all-forks')
  writeCache(live)
  return live
}

export function getCachedRepos() {
  return readCache()
}
