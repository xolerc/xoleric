import { Link } from 'react-router-dom'
import { Printer } from 'lucide-react'
import { contacts, curated, journey, skills } from '../data.js'

export default function Cv() {
  return (
    <>
      <div className="no-print mx-auto max-w-[1200px] px-5 pt-32 pb-8">
        <Link to="/" className="font-head text-xs font-medium tracking-[0.2em] text-[#9b978e] uppercase hover:text-[#c9a86a]">
          ← Portfolioga qaytish
        </Link>
        <h1 className="font-display mt-4 text-6xl text-[#f2f0ea] sm:text-7xl">
          CV / <em className="text-[#c9a86a] not-italic">Rezyume</em>
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#9b978e]">
          Chop etishda toza oq qog‘oz — pastdagi tugmani bosing.
        </p>
      </div>

      <div className="mx-auto max-w-[1200px] px-5 pb-24">
        <div className="print-white border border-[rgba(242,240,234,0.12)] bg-[#0e0e11] p-6 sm:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-head text-2xl font-bold text-[#f2f0ea]">
                xoleric<span className="text-[#c9a86a]">.</span>
              </p>
              <p className="font-head mt-1 text-sm font-semibold text-[#f2f0ea]">
                Frontend Dasturchi va Kreativ Kod Muallifi
              </p>
            </div>
            <div className="no-print flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-[3px] border border-[rgba(242,240,234,0.25)] px-4 py-2 font-head text-xs font-semibold tracking-wide text-[#f2f0ea] uppercase hover:border-[#c9a86a] hover:text-[#c9a86a]"
              >
                <Printer size={14} />
                Chop etish / PDF saqlash
              </button>
              <Link
                to="/"
                className="rounded-[3px] bg-[#c9a86a] px-4 py-2 font-head text-xs font-semibold tracking-wide text-[#060607] uppercase hover:bg-[#d0b47c]"
              >
                ← Portfolioga qaytish
              </Link>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-y border-[rgba(242,240,234,0.12)] py-4 text-sm">
            <a href={contacts.telegram} target="_blank" rel="noopener noreferrer" className="text-[#c9a86a] hover:underline">
              Telegram: @Wxoleric
            </a>
            <a href={contacts.emailHref} className="text-[#c9a86a] hover:underline">
              {contacts.email}
            </a>
            <a href={contacts.github} target="_blank" rel="noopener noreferrer" className="text-[#c9a86a] hover:underline">
              github.com/xolerc
            </a>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-[#9b978e]">
            Interaktiv va tez interfeyslarga ixtisoslashgan frontend dasturchiman. Toza
            muhandislikni kreativ kod bilan birlashtiraman — oddiy sahifalarni jonli,
            animatsiyali tajribaga aylantiraman va har qanday qurilmada 60fps ni saqlayman.
          </p>

          <section aria-label="Ko‘nikmalar" className="mt-8">
            <h3 className="font-head border-b border-[rgba(242,240,234,0.12)] pb-2 text-lg font-bold tracking-wide text-[#f2f0ea] uppercase">
              Ko‘nikmalar
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="border border-[rgba(242,240,234,0.12)] p-4">
                <h4 className="font-head text-sm font-bold text-[#f2f0ea]">Frontend</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {skills.slice(0, 6).map((s) => (
                    <span key={s} className="rounded-[2px] border border-[rgba(242,240,234,0.12)] px-2.5 py-1 font-head text-xs text-[#9b978e]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border border-[rgba(242,240,234,0.12)] p-4">
                <h4 className="font-head text-sm font-bold text-[#f2f0ea]">Kreativ va Uskunalar</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {skills.slice(6).map((s) => (
                    <span key={s} className="rounded-[2px] border border-[rgba(242,240,234,0.12)] px-2.5 py-1 font-head text-xs text-[#9b978e]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section aria-label="Tajriba" className="mt-8">
            <h3 className="font-head border-b border-[rgba(242,240,234,0.12)] pb-2 text-lg font-bold tracking-wide text-[#f2f0ea] uppercase">
              Tajriba
            </h3>
            <div className="mt-4 border border-[rgba(242,240,234,0.12)] p-4">
              <h4 className="font-head text-base font-bold text-[#f2f0ea]">Frontend Dasturchi</h4>
              <div className="mt-1 font-head text-xs tracking-wide text-[#c9a86a] uppercase">
                Freelance · Masofaviy · 2023 — hozirgacha
              </div>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#9b978e]">
                <li>Scroll-hikoyali va canvas effektli interaktiv saytlar hamda veb-ilovalarni topshirdim.</li>
                <li>Interfeyslarni izchil va mavzuli saqlaydigan dizayn-token tizimlarini qurdum.</li>
                <li>Lighthouse byudjetlarini saqladim — 200KB dan kam JS, o‘rta telefonlarda 90+ tezlik.</li>
                <li>PWA imkoniyatlarini (offlayn, o‘rnatiladigan) mijozlar uchun mahsulot yutug‘iga aylantirdim.</li>
              </ul>
            </div>
          </section>

          <section aria-label="Tanlangan loyihalar" className="mt-8">
            <h3 className="font-head border-b border-[rgba(242,240,234,0.12)] pb-2 text-lg font-bold tracking-wide text-[#f2f0ea] uppercase">
              Tanlangan Loyihalar
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {curated.map((c) => (
                <div key={c.name} className="border border-[rgba(242,240,234,0.12)] p-4">
                  <h4 className="font-head text-base font-bold text-[#f2f0ea]">{c.name}</h4>
                  <div className="mt-1 font-head text-xs tracking-wide text-[#c9a86a] uppercase">{c.stack}</div>
                  <p className="mt-2 text-sm leading-relaxed text-[#9b978e]">
                    {c.desc} <strong className="text-[#f2f0ea]">{c.impact}</strong>
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section aria-label="Yo‘lim" className="mt-8">
            <h3 className="font-head border-b border-[rgba(242,240,234,0.12)] pb-2 text-lg font-bold tracking-wide text-[#f2f0ea] uppercase">
              Yo‘lim
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {journey.map((j) => (
                <div key={j.year} className="border border-[rgba(242,240,234,0.12)] p-4">
                  <span className="font-display text-2xl text-[#c9a86a]">{j.year}</span>
                  <h4 className="font-head mt-1 text-sm font-bold text-[#f2f0ea]">{j.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-[#9b978e]">{j.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-label="Ta‘lim" className="mt-8">
            <h3 className="font-head border-b border-[rgba(242,240,234,0.12)] pb-2 text-lg font-bold tracking-wide text-[#f2f0ea] uppercase">
              Ta‘lim
            </h3>
            <div className="mt-4 border border-[rgba(242,240,234,0.12)] p-4">
              <h4 className="font-head text-base font-bold text-[#f2f0ea]">
                Mustaqil o‘rgangan va doim yaratuvchi
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-[#9b978e]">
                Real loyihalar orqali uzluksiz o‘rganaman — kreativ kod, veb-tezlik va zamonaviy
                JS ekotizimi.
              </p>
            </div>
          </section>

          <div className="mt-8 border-t border-[rgba(242,240,234,0.12)] pt-4 text-center text-xs text-[#9b978e]">
            © 2026 xoleric · freelance va hamkorlik uchun ochiqman —{' '}
            <a href={contacts.telegram} target="_blank" rel="noopener noreferrer" className="text-[#c9a86a] hover:underline">
              Telegram
            </a>
            da yozing
          </div>
        </div>
      </div>
    </>
  )
}
