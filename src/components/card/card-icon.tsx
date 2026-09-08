import type { ReactNode } from "react"

export function CardIcon({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`relative z-10 flex size-11 items-center justify-center rounded-full bg-primary/15 text-primary
        transition-transform duration-300 ease-out group-hover:scale-110 ${className}`}
    >
      {children}
    </div>
  )
}
