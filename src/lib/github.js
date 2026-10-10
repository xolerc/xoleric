/* XOLERIC — GitHub live: forksiz so'nggi 6 repo + fallback. */
import { curated, githubUser } from '../data.js'

export const langColors = {
  JavaScript: '#c9a86a',
  TypeScript: '#c9a86a',
  HTML: '#c9a86a',
  CSS: '#c9a86a',
  Dart: '#c9a86a',
  Python: '#c9a86a',
  SCSS: '#c9a86a',
  Vue: '#c9a86a',
  'C++': '#c9a86a',
  Java: '#c9a86a',
  PHP: '#c9a86a',
  Shell: '#c9a86a',
  Dockerfile: '#c9a86a',
  Rust: '#c9a86a',
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

export async function fetchRepos(signal) {
  const url = `https://api.github.com/users/${encodeURIComponent(githubUser)}/repos?sort=pushed&per_page=20`
  const res = await fetch(url, {
    headers: { Accept: 'application/vnd.github+json' },
    signal,
  })
  if (!res.ok) throw new Error(`GitHub HTTP ${res.status}`)
  const list = await res.json()
  if (!Array.isArray(list) || list.length === 0) throw new Error('GitHub empty')
  const live = list.filter((x) => !x.fork).slice(0, 6)
  if (live.length === 0) throw new Error('GitHub all-forks')
  return live
}
