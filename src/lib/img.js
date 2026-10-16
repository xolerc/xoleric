/* XOLERIC — rasm URL helper (site.js dagi yagona bazadan).
   Nisbiy "./images/..." subroute'larda (/work, /about) 404 berardi —
   shu helper hamma joyda to'g'ri absolut yo'l beradi. */
import { SITE_BASE } from './site.js'

export function img(file) {
  const clean = String(file || '').replace(/^\.?\//, '')
  const path = clean.startsWith('images/') ? clean : `images/${clean}`
  return `${SITE_BASE || ''}/${path}`
}
