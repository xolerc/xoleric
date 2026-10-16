import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { apps } from '../data.js'
import { img } from '../lib/img.js'
import Reveal from './Reveal.jsx'
import Button from './Button.jsx'

export default function StoreTeaser() {
  const app = apps[0]
  return (
    <section aria-label="APK Store" className="mx-auto max-w-[1200px] px-5 pb-20 sm:pb-24">
      <Reveal>
        <div className="card-smart flex flex-col items-start gap-5 border border-[rgba(242,240,234,0.12)] bg-[#0e0e11] p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-8">
          <img
            src={img(app.qr)}
            alt="Savodhon Super QR kodi"
            loading="lazy"
            decoding="async"
            width="120"
            height="120"
            className="h-24 w-24 rounded-[4px] border border-[rgba(242,240,234,0.12)] object-cover sm:h-28 sm:w-28"
          />
          <div className="min-w-0 flex-1">
            <p className="font-head text-xs font-medium tracking-[0.25em] text-[#c9a86a] uppercase">
              apk store
            </p>
            <h3 className="font-head mt-1 text-xl font-bold text-[#f2f0ea] sm:text-2xl">{app.name}</h3>
            <p className="mt-1 text-sm leading-relaxed text-pretty text-[#9b978e]">
              QR ni skanerlang yoki Store sahifasida kattalashtirib, GitHub Releases dan yuklab
              oling.
            </p>
          </div>
          <Button to="/store" variant="primary" size="md" fullMobile={true} className="shrink-0">
            Store ni ochish <ArrowRight size={15} aria-hidden="true" />
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
