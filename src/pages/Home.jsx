import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import SectionHead from '../components/SectionHead.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Reveal from '../components/Reveal.jsx'
import StoreTeaser from '../components/StoreTeaser.jsx'
import ContactPanel from '../components/ContactPanel.jsx'
import { aboutBio, aboutLead, blurbs, curated, journey, skills } from '../data.js'

export default function Home() {
  return (
    <>
      <Hero />

      {/* 01 About preview */}
      <section aria-label="Men haqimda" className="mx-auto max-w-[1200px] px-5 py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead num="01 — Men haqimda" eyebrow="men haqimda" title="G‘oyalarni jonli interfeysga aylantiraman" />
          </div>
          <div>
            <Reveal>
              <p className="text-lg leading-relaxed font-medium text-[#f2f0ea]">{aboutLead}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 text-sm leading-relaxed text-[#9b978e]">
                <strong className="text-[#f2f0ea]">Xoleric kim?</strong>{' '}
                {aboutBio.replace(/^Xoleric — O‘zbekistonlik frontend dasturchi va kreativ kod muallifi\. /, '')}
              </p>
            </Reveal>
            <div className="mt-6 flex flex-wrap gap-2" aria-label="Ko‘nikmalar">
              {skills.slice(0, 8).map((s) => (
                <span
                  key={s}
                  className="rounded-[2px] border border-[rgba(242,240,234,0.12)] px-3 py-1.5 font-head text-xs font-medium tracking-wide text-[#9b978e]"
                >
                  {s}
                </span>
              ))}
            </div>
            <Reveal delay={0.1}>
              <Link
                to="/about"
                className="font-head mt-6 inline-block text-sm font-semibold tracking-wide text-[#c9a86a] uppercase hover:text-[#d0b47c]"
              >
                Batafsil →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 02 Featured */}
      <section aria-label="Loyihalar" className="mx-auto max-w-[1200px] px-5 py-10">
        <SectionHead
          num="02 — Loyihalar"
          eyebrow="tanlangan ishlar"
          title="Loyihalar"
          side="GitHub‘dan jonli — har push bilan yangilanadi"
        />
        <p className="font-head mt-8 text-xs font-medium tracking-[0.25em] text-[#9b978e] uppercase">
          Tanlangan — CV dan
        </p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {curated.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.07}>
              <ProjectCard curated={c} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <Link
            to="/work"
            className="font-head mt-6 inline-block text-sm font-semibold tracking-wide text-[#c9a86a] uppercase hover:text-[#d0b47c]"
          >
            Barcha ishlar →
          </Link>
        </Reveal>
      </section>

      {/* 03 Journey preview */}
      <section aria-label="Yo‘lim" className="mx-auto max-w-[1200px] px-5 py-20">
        <SectionHead num="03 — Yo‘lim" eyebrow="yo‘lim" title="2023 → 2026: o‘sish xaritasi" />
        <div className="mt-8 grid gap-px border border-[rgba(242,240,234,0.12)] bg-[rgba(242,240,234,0.12)] sm:grid-cols-2 lg:grid-cols-4">
          {journey.map((j, i) => (
            <Reveal key={j.year} delay={i * 0.07} className="bg-[#0e0e11]">
              <div className="h-full p-6">
                <span className="font-display text-4xl text-[#c9a86a]">{j.year}</span>
                <h3 className="font-head mt-2 text-lg font-bold text-[#f2f0ea]">{j.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9b978e]">{j.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {blurbs.map((b) => (
            <div key={b.n} className="border-t border-[rgba(242,240,234,0.12)] pt-4">
              <span className="font-head text-xs font-semibold tracking-[0.2em] text-[#c9a86a]">{b.n}</span>
              <h3 className="font-head mt-1 text-lg font-bold text-[#f2f0ea]">{b.h}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#9b978e]">{b.p}</p>
            </div>
          ))}
        </div>
      </section>

      <StoreTeaser />
      <ContactPanel />
    </>
  )
}
