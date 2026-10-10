import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Send } from 'lucide-react'
import SectionHead from '../components/SectionHead.jsx'
import Reveal from '../components/Reveal.jsx'
import { useToast } from '../components/Toast.jsx'
import { contacts } from '../data.js'

function fieldCls(bad) {
  return `w-full rounded-[3px] border bg-[#0e0e11] px-4 py-3 text-sm text-[#f2f0ea] placeholder:text-[#6f6c66] ${
    bad ? 'border-red-500' : 'border-[rgba(242,240,234,0.12)]'
  }`
}

export default function Contact() {
  const toast = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    const n = name.trim()
    const m = email.trim()
    const b = msg.trim()
    if (n.length < 2) e.name = 'Ismingizni yozing (kamida 2 harf).'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(m)) e.email = 'To‘g‘ri email manzilini kiriting.'
    if (b.length < 10) e.msg = 'Xabar kamida 10 belgidan iborat bo‘lsin.'
    if (n.length > 80) e.name = 'Ism 80 belgidan oshmasin.'
    if (m.length > 120) e.email = 'Email 120 belgidan oshmasin.'
    if (b.length > 2000) e.msg = 'Xabar 2000 belgidan oshmasin.'
    return e
  }

  function onSubmit(ev) {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) return
    const subject = encodeURIComponent(`Portfolio: ${name.trim()} dan xabar`)
    const body = encodeURIComponent(`Ism: ${name.trim()}\nEmail: ${email.trim()}\n\n${msg.trim()}`)
    window.location.href = `${contacts.emailHref}?subject=${subject}&body=${body}`
    toast('Xabaringiz pochta ilovasida ochildi')
    setName('')
    setEmail('')
    setMsg('')
    setErrors({})
  }

  return (
    <>
      <div className="mx-auto max-w-[1200px] px-5 pt-32 pb-8">
        <Link to="/" className="font-head text-xs font-medium tracking-[0.2em] text-[#9b978e] uppercase hover:text-[#c9a86a]">
          ← Bosh sahifa
        </Link>
        <h1 className="font-display mt-4 text-6xl text-[#f2f0ea] sm:text-7xl">
          Alo<em className="text-[#c9a86a] not-italic">qa</em>
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#9b978e]">
          Loyiha g‘oyangiz bormi? Formani to‘ldiring — xabaringiz pochta ilovangizda tayyor
          ochiladi.
        </p>
      </div>

      <section aria-label="Aloqa formasi" className="mx-auto max-w-[1200px] px-5 pb-24">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <form
              onSubmit={onSubmit}
              noValidate
              className="border border-[rgba(242,240,234,0.12)] bg-[#0e0e11] p-6 sm:p-8"
            >
              <SectionHead num="04 — Aloqa" eyebrow="xabar yuborish" title="Forma" />
              <div className="mt-6 space-y-5">
                <div>
                  <label htmlFor="cf-name" className="font-head mb-2 block text-xs font-semibold tracking-[0.18em] text-[#9b978e] uppercase">
                    Ism
                  </label>
                  <input
                    id="cf-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ismingiz"
                    autoComplete="name"
                    maxLength={80}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'cf-name-err' : undefined}
                    className={fieldCls(errors.name)}
                  />
                  {errors.name && (
                    <p id="cf-name-err" role="alert" className="mt-1.5 text-xs text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="cf-email" className="font-head mb-2 block text-xs font-semibold tracking-[0.18em] text-[#9b978e] uppercase">
                    Email
                  </label>
                  <input
                    id="cf-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="siz@email.com"
                    autoComplete="email"
                    maxLength={120}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'cf-email-err' : undefined}
                    className={fieldCls(errors.email)}
                  />
                  {errors.email && (
                    <p id="cf-email-err" role="alert" className="mt-1.5 text-xs text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="cf-msg" className="font-head mb-2 block text-xs font-semibold tracking-[0.18em] text-[#9b978e] uppercase">
                    Xabar
                  </label>
                  <textarea
                    id="cf-msg"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="Loyihangiz haqida qisqacha yozing…"
                    rows={6}
                    maxLength={2000}
                    aria-invalid={!!errors.msg}
                    aria-describedby={errors.msg ? 'cf-msg-err' : undefined}
                    className={`${fieldCls(errors.msg)} resize-y`}
                  />
                  {errors.msg && (
                    <p id="cf-msg-err" role="alert" className="mt-1.5 text-xs text-red-400">
                      {errors.msg}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full rounded-[3px] bg-[#c9a86a] px-6 py-3.5 font-head text-sm font-semibold tracking-wide text-[#060607] uppercase transition-colors hover:bg-[#d0b47c]"
                >
                  Yuborish →
                </button>
              </div>
            </form>
          </Reveal>
          <div className="space-y-5">
            <Reveal delay={0.06}>
              <a
                href={contacts.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 border border-[rgba(242,240,234,0.12)] bg-[#0e0e11] p-6 transition-colors hover:border-[rgba(201,168,106,0.5)]"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[2px] bg-[rgba(201,168,106,0.14)] text-[#c9a86a]">
                  <Send size={20} />
                </span>
                <span>
                  <span className="font-head block text-xs font-semibold tracking-[0.2em] text-[#9b978e] uppercase">
                    Telegram
                  </span>
                  <span className="font-head mt-1 block text-lg font-bold text-[#f2f0ea]">
                    @Wxoleric
                  </span>
                  <span className="mt-0.5 block text-xs text-[#9b978e]">
                    Eng tez javob — odatda bir necha soatda
                  </span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={0.12}>
              <a
                href={contacts.emailHref}
                className="flex items-center gap-4 border border-[rgba(242,240,234,0.12)] bg-[#0e0e11] p-6 transition-colors hover:border-[rgba(201,168,106,0.5)]"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[2px] bg-[rgba(201,168,106,0.14)] text-[#c9a86a]">
                  <Mail size={20} />
                </span>
                <span>
                  <span className="font-head block text-xs font-semibold tracking-[0.2em] text-[#9b978e] uppercase">
                    Email
                  </span>
                  <span className="font-head mt-1 block text-lg font-bold break-all text-[#f2f0ea]">
                    {contacts.email}
                  </span>
                  <span className="mt-0.5 block text-xs text-[#9b978e]">
                    Batafsil takliflar uchun
                  </span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="border border-[rgba(242,240,234,0.12)] bg-[#0e0e11] p-6">
                <p className="font-head text-xs font-semibold tracking-[0.2em] text-[#c9a86a] uppercase">
                  Ijtimoiy
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    ['GitHub', contacts.github],
                    ['Instagram', contacts.instagram],
                    ['YouTube', contacts.youtube],
                    ['Pinterest', contacts.pinterest],
                  ].map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-[2px] border border-[rgba(242,240,234,0.12)] px-3 py-1.5 font-head text-xs font-medium text-[#9b978e] transition-colors hover:border-[#c9a86a] hover:text-[#c9a86a]"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
