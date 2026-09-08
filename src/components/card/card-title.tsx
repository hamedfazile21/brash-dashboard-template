import type { ReactNode } from 'react'
import { useCardContext, type CardView } from './card-provider'

const titleViewClasses: Record<CardView, string> = {
  default: 'text-sm font-semibold text-foreground',
  stat: 'text-2xl font-semibold tracking-tight text-foreground',
  media:
    'text-base font-semibold text-foreground transition-colors duration-200 group-hover:text-primary',
  hover: 'text-base font-semibold text-white drop-shadow-sm',
  horizontal: 'text-sm font-semibold text-foreground',
  profile: 'text-base font-semibold text-foreground',
}

export function CardTitle({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const { view } = useCardContext()
  return <p className={`${titleViewClasses[view]} ${className}`}>{children}</p>
}
