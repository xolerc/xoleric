import { Link } from 'react-router-dom'

/* XOLERIC — yagona aqlli Button tizimi.
   Barcha tugmalar shu orqali: 44px+ tap, press effekti, loading, disabled.
   variant: primary | secondary | ghost | danger
   size: sm | md | lg
*/

const base =
  'btn-smart font-head inline-flex select-none items-center justify-center gap-2 rounded-[3px] font-semibold tracking-wide uppercase transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a86a] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0'

const variants = {
  primary:
    'bg-[#c9a86a] text-[#060607] hover:bg-[#d0b47c] hover:shadow-[0_8px_28px_rgba(201,168,106,0.28)] active:bg-[#b8965a] shadow-[0_2px_12px_rgba(201,168,106,0.18)]',
  secondary:
    'border border-[rgba(242,240,234,0.25)] text-[#f2f0ea] hover:border-[#c9a86a] hover:text-[#c9a86a] hover:bg-[rgba(201,168,106,0.06)] bg-transparent',
  ghost: 'text-[#c9a86a] hover:text-[#d0b47c] hover:bg-[rgba(201,168,106,0.08)] bg-transparent px-2',
  danger:
    'bg-red-500/10 border border-red-500/40 text-red-300 hover:bg-red-500/20',
}

const sizes = {
  sm: 'min-h-[40px] px-4 py-2 text-[12px]',
  md: 'min-h-[44px] px-6 py-3 text-[13px] sm:min-h-[46px] sm:px-7 sm:py-3.5 sm:text-sm',
  lg: 'min-h-[52px] px-8 py-4 text-sm',
}

export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  fullMobile = false,
  loading = false,
  disabled = false,
  external = false,
  className = '',
  children,
  ...rest
}) {
  const cls = `${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${
    fullMobile ? 'w-full sm:w-auto' : ''
  } ${className}`.trim()

  const content = loading ? (
    <>
      <span className="btn-spinner" aria-hidden="true" />
      <span>Yuklanmoqda…</span>
    </>
  ) : (
    children
  )

  const shared = {
    className: cls,
    'aria-disabled': disabled || loading ? 'true' : undefined,
    'aria-busy': loading ? 'true' : undefined,
    ...rest,
  }

  if (to && !disabled && !loading) {
    return (
      <Link to={to} {...shared}>
        {content}
      </Link>
    )
  }
  if (href && !disabled && !loading) {
    const ext = external || /^https?:/.test(href)
    return (
      <a href={href} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...shared}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" disabled={disabled || loading} {...shared}>
      {content}
    </button>
  )
}
