export function CardAvatar({
  src,
  name,
  size = 64,
  className = '',
}: {
  src?: string
  name: string
  size?: number
  className?: string
}) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      style={{ width: size, height: size }}
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-hover ring-4 ring-primary/10 ${className}`}
    >
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <span className="text-lg font-semibold text-primary">{initials}</span>
      )}
    </div>
  )
}
