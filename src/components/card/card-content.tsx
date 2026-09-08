import type { ReactNode } from 'react'
import { useCardContext, type CardView } from './card-provider'

const contentViewClasses: Record<CardView, string> = {
  default: 'relative z-10 p-4',
  stat: 'relative z-10',
  media: 'p-4',
  // Pinned to the bottom of the full-bleed card, above the gradient (z-20)
  hover: 'absolute inset-x-0 bottom-0 z-20 p-4',
  horizontal: 'flex flex-1 flex-col justify-center p-4',
  profile: 'mt-3 flex flex-col items-center',
}

export function CardContent({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const { view } = useCardContext()
  return (
    <div className={`${contentViewClasses[view]} ${className}`}>{children}</div>
  )
}
