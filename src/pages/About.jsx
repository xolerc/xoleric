import { Link } from 'react-router-dom'
import SectionHead from '../components/SectionHead.jsx'
import Reveal from '../components/Reveal.jsx'
import ContactPanel from '../components/ContactPanel.jsx'
import Counter from '../components/Counter.jsx'
import { img } from '../lib/img.js'
import { aboutBio, aboutLead, blurbs, journey, skills, stats } from '../data.js'

export default function About() {
  return (
    <>
      <div className="mx-auto max-w-[1200px] px-5 pt-32 pb-8">
        <Link to="/" className="font-head text-xs font-medium tracking-[0.2em] text-[#9b978e] uppercase hover:text-[#c9a86a]">
          ← Bosh sahifa
        </Link>
        <h1 className="font-display mt-4 text-6xl text-[#f2f0ea] sm:text-7xl">
          Men <em className="text-[#c9a86a] not-italic">haqimda</em>
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#9b978e]">
          Frontend dasturchi, kreativ kod muallifi — tezlik, ritm va harakat intizomi bilan.
        </p>
      </div>

      <section aria-label="Batafsil" className="mx-auto max-w-[1200px] px-5 py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Reveal>
              <div className="relative overflow-hidden rounded-[6px] border border-[rgba(201,168,106,0.22)] bg-gradient-to-br from-[#1a1a1e] to-[#0e0e11]">
                <img
                  src={img('main.webp')}
                  alt="Xoleric portreti"
                  loading="lazy"
                  decoding="async"
                  width="640"
                  height="426"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                  className="relative block aspect-[3/2] w-full object-cover object-center grayscale"
                />
              </div>
            </Reveal>
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-[rgba(242,240,234,0.12)] pt-5" aria-label="Statistika">
              {stats.map((s) => (
                <div key={s.l}>
                  <b className="font-head text-2xl font-bold text-[#f2f0ea]">
                    <Counter to={s.v} suffix={s.suffix} />
                  </b>
                  <span className="mt-1 block text-xs leading-snug text-[#9b978e]">{s.l}</span>
                </div>
              ))}
            </div>
            <Reveal delay={0.1}>
              <div className="mt-6 border border-[rgba(201,168,106,0.35)] bg-[rgba(201,168,106,0.07)] p-4 text-sm text-[#f2f0ea]">
                <span className="font-head text-xs font-semibold tracking-[0.2em] text-[#c9a86a] uppercase">
                  Mavjudlik
                </span>
                <p className="mt-1 text-[#9b978e]">
                  Freelance loyihalar uchun ochiqman — Telegram yoki email orqali tez javob
                  beraman.
                </p>
              </div>
            </Reveal>
          </div>
          <div>
            <Reveal>
              <p className="text-lg leading-relaxed font-medium text-[#f2f0ea]">{aboutLead}</p>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-4 text-sm leading-relaxed text-[#9b978e]">
                <strong className="text-[#f2f0ea]">Xoleric kim?</strong> {aboutBio}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-head mt-8 text-xl font-bold text-[#f2f0ea]">Ko‘nikmalar</h2>
              <div className="mt-3 flex flex-wrap gap-2" aria-label="Ko‘nikmalar">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-[2px] border border-[rgba(242,240,234,0.12)] px-3 py-1.5 font-head text-xs font-medium tracking-wide text-[#9b978e]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
            <div className="mt-8 space-y-6">
              {blurbs.map((b, i) => (
                <Reveal key={b.n} delay={i * 0.06}>
                  <div className="flex gap-5 border-t border-[rgba(242,240,234,0.12)] pt-5">
                    <span className="font-head text-xs font-semibold tracking-[0.2em] whitespace-nowrap text-[#c9a86a]">
                      {b.n}
                    </span>
                    <div>
                      <h3 className="font-head text-lg font-bold text-[#f2f0ea]">{b.h}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#9b978e]">{b.p}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Yo‘lim" className="mx-auto max-w-[1200px] px-5 py-16">
        <SectionHead num="03 — Yo‘lim" eyebrow="yo‘lim" title="2023 → 2026: o‘sish xaritasi" />
        <div className="mt-8 space-y-0 border-t border-[rgba(242,240,234,0.12)]">
          {journey.map((j, i) => (
            <Reveal key={j.year} delay={i * 0.05}>
              <div className="grid gap-2 border-b border-[rgba(242,240,234,0.12)] py-6 sm:grid-cols-[100px_1fr_2fr] sm:items-baseline">
                <span className="font-display text-3xl text-[#c9a86a]">{j.year}</span>
                <h3 className="font-head text-lg font-bold text-[#f2f0ea]">{j.title}</h3>
                <p className="text-sm leading-relaxed text-[#9b978e]">{j.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <ContactPanel num="04 — Aloqa" />
    </>
  )
}
