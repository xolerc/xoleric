/* XOLERIC — sayt bazasi (bitta manba).
   - `vite build --base=/mydrime/` → SITE_BASE = '/mydrime' (jonli)
   - `vite build --base=/xoleric/` → SITE_BASE = '/xoleric'
   - default build (base './') + PROD → '/mydrime' (asosiy jonli manzil)
   - dev → '' (ildiz)
*/
function computeBase() {
  const b = import.meta.env.BASE_URL || '/'
  if (b.startsWith('/')) return b.replace(/\/$/, '')
  return import.meta.env.PROD ? '/mydrime' : ''
}

export const SITE_BASE = computeBase()
