import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

type Tone = 'primary' | 'success' | 'warning'

const toneClasses: Record<Tone, string> = {
  primary: 'bg-primary/10 text-primary ring-primary/20',
  success: 'bg-success/10 text-success ring-success/20',
  warning: 'bg-warning/10 text-warning ring-warning/20',
}

interface AuthHeaderProps {
  title: string
  description?: ReactNode
  /** Small eyebrow above the title, e.g. "Step 2 of 2" */
  eyebrow?: string
  /** Shown on result screens (link sent, password updated, …) */
  icon?: LucideIcon
  tone?: Tone
}

/** Left-aligned title block at the top of every auth card */
function AuthHeader({
  title,
  description,
  eyebrow,
  icon: Icon,
  tone = 'primary',
}: AuthHeaderProps) {
  return (
    <div className="mb-7">
      {Icon && (
        <span
          className={`mb-5 flex size-12 items-center justify-center rounded-2xl ring-1 ${toneClasses[tone]}`}
        >
          <Icon size={22} strokeWidth={1.75} />
        </span>
      )}
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold tracking-wider text-primary uppercase">
          {eyebrow}
        </p>
      )}
      <h1 className="text-[1.75rem] leading-tight font-bold tracking-tight text-foreground">
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      )}
    </div>
  )
}

export default AuthHeader
