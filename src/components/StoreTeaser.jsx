import { Link } from 'react-router-dom'
import { apps } from '../data.js'
import Reveal from './Reveal.jsx'

export default function StoreTeaser() {
  const app = apps[0]
  return (
    <section aria-label="APK Store" className="mx-auto max-w-[1200px] px-5 pb-24">
      <Reveal>
        <div className="flex flex-col items-start gap-6 border border-[rgba(242,240,234,0.12)] bg-[#0e0e11] p-6 sm:flex-row sm:items-center sm:p-8">
          <img
            src={app.qr}
            alt="Savodhon Super QR kodi"
            loading="lazy"
            width="120"
            height="120"
            className="h-28 w-28 rounded-[2px] border border-[rgba(242,240,234,0.12)] object-cover"
          />
          <div className="flex-1">
            <p className="font-head text-xs font-medium tracking-[0.25em] text-[#c9a86a] uppercase">
              apk store
            </p>
            <h3 className="font-head mt-1 text-2xl font-bold text-[#f2f0ea]">{app.name}</h3>
            <p className="mt-1 text-sm leading-relaxed text-[#9b978e]">
              QR ni skanerlang yoki Store sahifasida kattalashtirib, GitHub Releases dan yuklab
              oling.
            </p>
          </div>
          <Link
            to="/store"
            className="rounded-[3px] bg-[#c9a86a] px-6 py-3 font-head text-sm font-semibold tracking-wide whitespace-nowrap text-[#060607] uppercase transition-colors hover:bg-[#d0b47c]"
          >
            Store ni ochish →
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
