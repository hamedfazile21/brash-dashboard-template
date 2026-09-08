import type { ReactNode } from 'react'
import { useCardContext, type CardView } from './card-provider'

const descriptionViewClasses: Record<CardView, string> = {
  default: 'mt-0.5 text-xs text-muted',
  stat: 'text-xs font-medium uppercase tracking-wide text-muted',
  media: 'mt-1 text-xs text-muted',
  // Hidden by default, slides + fades in on hover — the signature
  // interaction of this view.
  hover: `mt-1 text-xs text-white/80 opacity-0 translate-y-2
    transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0`,
  horizontal: 'mt-0.5 line-clamp-2 text-xs text-muted',
  profile: 'mt-0.5 text-xs text-muted',
}

export function CardDescription({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const { view } = useCardContext()
  return (
    <p className={`${descriptionViewClasses[view]} ${className}`}>{children}</p>
  )
}
