import { useCardContext } from './card-provider'

export function CardMedia({
  src,
  alt = '',
  className = '',
}: {
  src: string
  alt?: string
  className?: string
}) {
  const { view } = useCardContext()

  if (view === 'hover') {
    return (
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 ${className}`}
      />
    )
  }

  if (view === 'horizontal') {
    return (
      <div className="w-32 shrink-0 overflow-hidden sm:w-40">
        <img
          src={src}
          alt={alt}
          className={`h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 rounded-lg ${className}`}
        />
      </div>
    )
  }

  return (
    <div className="overflow-hidden">
      <img
        src={src}
        alt={alt}
        className={`h-40 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 rounded-lg ${className}`}
      />
    </div>
  )
}
