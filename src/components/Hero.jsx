import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Send } from 'lucide-react'
import { profile, stats } from '../data.js'
import { img } from '../lib/img.js'
import Counter from './Counter.jsx'
import Button from './Button.jsx'

export default function Hero() {
  return (
    <section aria-label="Kirish" className="mx-auto max-w-[1200px] px-5 pt-28 pb-14 sm:pt-36 sm:pb-16">
      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
        <div className="min-w-0">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-head inline-flex min-h-[36px] items-center gap-2 rounded-full border border-[rgba(201,168,106,0.3)] bg-[rgba(201,168,106,0.07)] px-3.5 py-1.5 text-xs font-medium tracking-[0.16em] text-[#c9a86a] uppercase"
          >
            <i
              className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#c9a86a]"
              aria-hidden="true"
            />
            {profile.available}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display mt-5 text-[clamp(3.8rem,15vw,11rem)] leading-[0.9] text-balance text-[#f2f0ea]"
          >
            {profile.name}
          </motion.h1>
          <div className="mt-4 h-px w-full bg-gradient-to-r from-[#c9a86a] via-[#c9a86a]/60 to-transparent" aria-hidden="true" />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="font-head mt-5 text-lg font-semibold text-pretty text-[#f2f0ea] sm:text-xl"
          >
            {profile.role}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-2 max-w-xl text-[15px] leading-relaxed text-pretty text-[#9b978e] sm:text-base"
          >
            {profile.title}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-7 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap"
          >
            <Button to="/work" variant="primary" size="md" fullMobile={true}>
              Ishlarni ko‘rish <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button to="/contact" variant="secondary" size="md" fullMobile={true}>
              <Send size={15} aria-hidden="true" /> Bog‘lanish
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.36 }}
            className="mt-9 grid max-w-xl grid-cols-3 gap-4 border-t border-[rgba(242,240,234,0.12)] pt-6 sm:gap-6"
            aria-label="Statistika"
          >
            {stats.map((s) => (
              <div key={s.l} className="min-w-0">
                <b className="font-head text-2xl font-bold text-[#f2f0ea] tabular-nums sm:text-3xl">
                  <Counter to={s.v} suffix={s.suffix} />
                </b>
                <span className="mt-1 block text-[11px] leading-snug text-[#9b978e] sm:text-xs">{s.l}</span>
              </div>
            ))}
          </motion.div>
        </div>
        <motion.figure
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="card-smart w-full overflow-hidden rounded-[6px] border border-[rgba(201,168,106,0.28)] bg-[#0e0e11] p-2.5 shadow-[0_24px_70px_rgba(0,0,0,0.55),0_0_0_1px_rgba(201,168,106,0.06),0_0_44px_rgba(201,168,106,0.08)] sm:mx-auto sm:max-w-[420px] lg:max-w-[380px]"
        >
          <div className="relative overflow-hidden rounded-[4px] bg-gradient-to-br from-[#1a1a1e] to-[#0e0e11]">
            <span
              aria-hidden="true"
              className="font-display absolute inset-0 flex items-center justify-center text-[6rem] leading-none text-[rgba(242,240,234,0.07)] select-none"
            >
              X
            </span>
            <img
              src={img('main.webp')}
              alt="Xoleric portreti"
              fetchPriority="high"
              decoding="async"
              width="640"
              height="426"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
              className="relative block aspect-[3/2] w-full rounded-[4px] object-cover object-center grayscale"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/45 to-transparent"
            />
          </div>
          <figcaption className="font-head flex items-center justify-between px-1.5 pt-2.5 pb-1 text-[11px] font-medium tracking-[0.25em] text-[#9b978e] uppercase">
            <span>FIG. 01 — XOLERIC, 35MM</span>
            <i aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-[#c9a86a]" />
          </figcaption>
        </motion.figure>
      </div>
      <p className="font-head mt-12 text-[11px] font-medium tracking-[0.3em] text-[#6f6c66] uppercase">
        SCROLL — 01/04
      </p>
    </section>
  )
}
