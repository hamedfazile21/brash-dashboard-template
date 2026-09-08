import type { ReactNode } from "react"

export function CardActions({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`absolute right-3 top-3 z-20 flex items-center gap-x-1.5 opacity-0
        transition-opacity duration-200 ease-out group-hover:opacity-100 ${className}`}
    >
      {children}
    </div>
  )
}
