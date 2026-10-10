import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { profile, stats } from '../data.js'
import Counter from './Counter.jsx'

export default function Hero() {
  return (
    <section aria-label="Kirish" className="mx-auto max-w-[1200px] px-5 pt-32 pb-16 sm:pt-36">
      <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 border border-[rgba(242,240,234,0.12)] px-3 py-1.5 font-head text-xs font-medium tracking-[0.2em] text-[#9b978e] uppercase"
          >
            <i className="inline-block h-1.5 w-1.5 rounded-full bg-[#c9a86a]" aria-hidden="true" />
            {profile.available}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display mt-6 text-[clamp(4.5rem,14vw,11rem)] leading-[0.9] text-[#f2f0ea]"
          >
            {profile.name}
          </motion.h1>
          <div className="mt-4 h-px w-full bg-[#c9a86a]" aria-hidden="true" />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="font-head mt-5 text-lg font-semibold text-[#f2f0ea]"
          >
            {profile.role}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-2 max-w-xl text-base leading-relaxed text-[#9b978e]"
          >
            {profile.title}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/work"
              className="rounded-[3px] bg-[#c9a86a] px-7 py-3.5 font-head text-sm font-semibold tracking-wide text-[#060607] uppercase transition-colors hover:bg-[#d0b47c]"
            >
              Ishlarni ko‘rish
            </Link>
            <Link
              to="/contact"
              className="rounded-[3px] border border-[rgba(242,240,234,0.25)] px-7 py-3.5 font-head text-sm font-semibold tracking-wide text-[#f2f0ea] uppercase transition-colors hover:border-[#c9a86a] hover:text-[#c9a86a]"
            >
              Bog‘lanish
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.36 }}
            className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-[rgba(242,240,234,0.12)] pt-6"
            aria-label="Statistika"
          >
            {stats.map((s) => (
              <div key={s.l}>
                <b className="font-head text-2xl font-bold text-[#f2f0ea] sm:text-3xl">
                  <Counter to={s.v} suffix={s.suffix} />
                </b>
                <span className="mt-1 block text-xs leading-snug text-[#9b978e]">{s.l}</span>
              </div>
            ))}
          </motion.div>
        </div>
        <motion.figure
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mx-auto w-full max-w-[380px] border border-[rgba(242,240,234,0.12)] bg-[#0e0e11] p-3"
        >
          <img
            src="./images/main.webp"
            alt="Xoleric portreti"
            fetchpriority="high"
            width="640"
            height="800"
            className="block aspect-[4/5] w-full rounded-[2px] object-cover grayscale"
          />
          <figcaption className="font-head px-1 pt-3 pb-1 text-[11px] font-medium tracking-[0.25em] text-[#9b978e] uppercase">
            FIG. 01 — XOLERIC, 35MM
          </figcaption>
        </motion.figure>
      </div>
      <p className="font-head mt-14 text-[11px] font-medium tracking-[0.3em] text-[#6f6c66] uppercase">
        SCROLL — 01/04
      </p>
    </section>
  )
}
