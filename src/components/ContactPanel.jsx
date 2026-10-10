import { Link } from 'react-router-dom'
import { contacts } from '../data.js'
import Reveal from './Reveal.jsx'

export default function ContactPanel({ num = '04 — Aloqa' }) {
  return (
    <section aria-label="Aloqa" className="mx-auto max-w-[1200px] px-5 pb-24">
      <Reveal>
        <div className="border border-[rgba(242,240,234,0.12)] bg-[#0e0e11] px-6 py-14 text-center sm:px-12">
          <p className="font-head text-xs font-semibold tracking-[0.25em] text-[#9b978e] uppercase">
            {num}
          </p>
          <p className="font-head mt-4 text-xs font-medium tracking-[0.25em] text-[#c9a86a] uppercase">
            aloqa
          </p>
          <h2 className="font-head mx-auto mt-3 max-w-xl text-3xl font-bold text-[#f2f0ea] sm:text-4xl">
            Keling, <em className="text-[#c9a86a] not-italic underline decoration-[#c9a86a]/40 underline-offset-8">birga</em> yaratamiz
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#9b978e]">
            Loyiha g‘oyangiz, hamkorlik taklifi bormi yoki shunchaki salomlashmoqchimisiz?
            Istalgan vaqtda yozing.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={contacts.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[3px] bg-[#c9a86a] px-7 py-3.5 font-head text-sm font-semibold tracking-wide text-[#060607] uppercase transition-colors hover:bg-[#d0b47c]"
            >
              Telegram
            </a>
            <a
              href={contacts.emailHref}
              className="rounded-[3px] border border-[rgba(242,240,234,0.25)] px-7 py-3.5 font-head text-sm font-semibold tracking-wide text-[#f2f0ea] uppercase transition-colors hover:border-[#c9a86a] hover:text-[#c9a86a]"
            >
              Email yozish
            </a>
            <Link
              to="/contact"
              className="rounded-[3px] border border-[rgba(242,240,234,0.25)] px-7 py-3.5 font-head text-sm font-semibold tracking-wide text-[#9b978e] uppercase transition-colors hover:border-[#c9a86a] hover:text-[#c9a86a]"
            >
              Forma →
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
