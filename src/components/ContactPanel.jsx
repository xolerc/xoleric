import { Link } from 'react-router-dom'
import { ArrowRight, Mail, Send } from 'lucide-react'
import { contacts } from '../data.js'
import Reveal from './Reveal.jsx'
import Button from './Button.jsx'

export default function ContactPanel({ num = '04 — Aloqa' }) {
  return (
    <section aria-label="Aloqa" className="mx-auto max-w-[1200px] px-5 pb-24">
      <Reveal>
        <div className="border border-[rgba(242,240,234,0.12)] bg-[#0e0e11] px-5 py-12 text-center sm:px-12 sm:py-14">
          <p className="font-head text-xs font-semibold tracking-[0.25em] text-[#9b978e] uppercase">
            {num}
          </p>
          <p className="font-head mt-4 text-xs font-medium tracking-[0.25em] text-[#c9a86a] uppercase">
            aloqa
          </p>
          <h2 className="font-head mx-auto mt-3 max-w-xl text-3xl font-bold text-balance text-[#f2f0ea] sm:text-4xl">
            Keling, <em className="text-[#c9a86a] not-italic underline decoration-[#c9a86a]/40 underline-offset-8">birga</em> yaratamiz
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-pretty text-[#9b978e]">
            Loyiha g‘oyangiz, hamkorlik taklifi bormi yoki shunchaki salomlashmoqchimisiz?
            Istalgan vaqtda yozing.
          </p>
          <div className="mx-auto mt-8 grid max-w-lg grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:justify-center">
            <Button href={contacts.telegram} external variant="primary" size="md" fullMobile={true}>
              <Send size={15} aria-hidden="true" /> Telegram
            </Button>
            <Button href={contacts.emailHref} variant="secondary" size="md" fullMobile={true}>
              <Mail size={15} aria-hidden="true" /> Email yozish
            </Button>
            <Button to="/contact" variant="secondary" size="md" fullMobile={true}>
              Forma <ArrowRight size={15} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
