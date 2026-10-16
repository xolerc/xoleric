/* XOLERIC — rasm URL helper.
   Muammo: "./images/..." nisbiy yo'l /work, /about kabi subroute'larda
   "/work/images/..." ga aylanib 404 berardi — shuning uchun mobil/ichki
   sahifalarda rasm chiqmay qolardi.
   Prod (GitHub Pages /xoleric) va dev uchun to'g'ri baza. */
export function img(file) {
  const base = import.meta.env.PROD ? '/xoleric/' : '/'
  const clean = String(file || '').replace(/^\.?\//, '')
  const path = clean.startsWith('images/') ? clean : `images/${clean}`
  return `${base}${path}`
}
