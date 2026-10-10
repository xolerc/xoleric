import Reveal from './Reveal.jsx'

export default function SectionHead({ num, eyebrow, title, side }) {
  return (
    <Reveal>
      <p className="font-head text-xs font-semibold tracking-[0.25em] text-[#9b978e] uppercase">
        {num}
      </p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-head text-xs font-medium tracking-[0.25em] text-[#c9a86a] uppercase">
            {eyebrow}
          </p>
          <h2 className="font-head mt-2 text-3xl font-bold text-[#f2f0ea] sm:text-4xl">{title}</h2>
        </div>
        {side ? <p className="max-w-xs text-sm leading-relaxed text-[#9b978e]">{side}</p> : null}
      </div>
    </Reveal>
  )
}
