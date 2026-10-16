/* XOLERIC — aqlli Skeleton tizimi: shimmer + reduced-motion + aria-busy */

export function Shimmer({ className = '' }) {
  return <div aria-hidden="true" className={`skeleton-shimmer rounded-[2px] ${className}`} />
}

export function TextSkeleton({ lines = 3, className = '' }) {
  return (
    <div className={className} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton-shimmer mt-2 h-3 rounded-[2px]"
          style={{ width: i === lines - 1 ? '72%' : '100%' }}
        />
      ))}
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="flex flex-col border border-[rgba(242,240,234,0.12)] bg-[#0e0e11] p-0">
      <div className="skeleton-shimmer h-44 border-b border-[rgba(242,240,234,0.08)]" />
      <div className="p-5">
        <div className="skeleton-shimmer h-3 w-1/3" />
        <div className="skeleton-shimmer mt-3 h-5 w-2/3" />
        <TextSkeleton lines={2} className="mt-3" />
        <div className="skeleton-shimmer mt-4 h-9 w-32" />
      </div>
    </div>
  )
}

export default function SkeletonGrid({ count = 6, className = '' }) {
  return (
    <div
      role="status"
      aria-label="Yuklanmoqda"
      aria-busy="true"
      className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      <span className="sr-only">Loyihalar yuklanmoqda…</span>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}
