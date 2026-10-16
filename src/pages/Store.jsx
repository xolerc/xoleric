import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, Expand } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import QrModal from '../components/QrModal.jsx'
import { apps } from '../data.js'
import { img } from '../lib/img.js'

export default function Store() {
  const [modalApp, setModalApp] = useState(null)

  return (
    <>
      <div className="mx-auto max-w-[1200px] px-5 pt-32 pb-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-6xl text-[#f2f0ea] sm:text-7xl">
              APK <em className="text-[#c9a86a] not-italic">Store</em>
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#9b978e]">
              QR ni bosing — kattalashadi, GitHub Releases dan yuklab oling.
            </p>
          </div>
          <Link to="/" className="font-head text-xs font-medium tracking-[0.2em] text-[#9b978e] uppercase hover:text-[#c9a86a]">
            ← ortga
          </Link>
        </div>
      </div>

      <section aria-label="Ilovalar" className="mx-auto max-w-[1200px] px-5 py-8 pb-24">
        <div className="grid gap-5 md:grid-cols-2">
          {apps.map((app, i) => (
            <Reveal key={app.id} delay={i * 0.07}>
              <article className="flex flex-col border border-[rgba(242,240,234,0.12)] bg-[#0e0e11] p-6 sm:flex-row sm:gap-6">
                <button
                  type="button"
                  onClick={() => setModalApp(app)}
                  aria-label={`${app.name} QR kodini kattalashtirish`}
                  className="group relative shrink-0 self-start"
                >
                  <img
                    src={img(app.qr)}
                    alt={`${app.name} QR kodi`}
                    loading="lazy"
                    width="200"
                    height="200"
                    className="h-44 w-44 rounded-[2px] border border-[rgba(242,240,234,0.12)] object-cover transition-colors group-hover:border-[#c9a86a]"
                  />
                  <span className="absolute right-2 bottom-2 inline-flex h-8 w-8 items-center justify-center rounded-[2px] bg-[rgba(6,6,7,0.85)] text-[#c9a86a]">
                    <Expand size={16} />
                  </span>
                </button>
                <div className="mt-5 flex-1 sm:mt-0">
                  <p className="font-head text-xs font-medium tracking-[0.25em] text-[#c9a86a] uppercase">
                    {app.sub}
                  </p>
                  <h2 className="font-head mt-1 text-2xl font-bold text-[#f2f0ea]">{app.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#9b978e]">
                    QR ni skanerlang yoki tugma orqali to‘g‘ridan-to‘g‘ri APK ni yuklab oling.
                    Fayl GitHub Releases‘da saqlanadi.
                  </p>
                  <div className="mt-5 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
                    <a
                      href={app.apk}
                      className="btn-smart inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[3px] bg-[#c9a86a] px-5 py-2.5 font-head text-[13px] font-semibold tracking-wide text-[#060607] uppercase hover:bg-[#d0b47c]"
                    >
                      <Download size={15} />
                      APK yuklash
                    </a>
                    <a
                      href={app.releases}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[52px] items-center justify-center rounded-[3px] border border-[rgba(242,240,234,0.25)] px-5 py-2.5 font-head text-[13px] font-semibold tracking-wide text-[#f2f0ea] uppercase transition-colors hover:border-[#c9a86a] hover:text-[#c9a86a]"
                    >
                      Releases
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <QrModal open={!!modalApp} app={modalApp} onClose={() => setModalApp(null)} />
    </>
  )
}
