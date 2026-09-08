import type { ReactNode } from "react"
import { useCardContext, type CardView } from "./card-provider"

const footerViewClasses: Record<CardView, string> = {
  default: 'relative z-10 border-t border-borderColor p-4',
  stat: '',
  media: 'flex items-center justify-between border-t border-borderColor p-4',
  hover: '',
  horizontal: '', // actions typically live inline in Content for this view
  profile:
    'mt-4 flex items-center justify-center gap-x-2 border-t border-borderColor pt-4',
}

export function CardFooter({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const { view } = useCardContext()
  return (
    <div className={`${footerViewClasses[view]} ${className}`}>{children}</div>
  )
}
