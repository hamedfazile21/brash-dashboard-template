import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface DemoCardProps {
  title: string
  /** The prop that produces this example, e.g. variant="pill" */
  code?: string
  description?: string
  children: ReactNode
  className?: string
}

/** One example on a showcase page: title + code chip, then the live demo */
function DemoCard({
  title,
  code,
  description,
  children,
  className = '',
}: DemoCardProps) {
  const { t } = useTranslation()

  return (
    <section className={`card flex flex-col p-0! ${className}`}>
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-borderColor px-5 py-3.5">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-foreground">{t(title)}</h3>
          {description && (
            <p className="mt-0.5 text-xs text-muted">{t(description)}</p>
          )}
        </div>
        {code && (
          <code
            dir="ltr"
            className="shrink-0 rounded-md bg-surface-hover px-2 py-0.5 font-mono text-[11px] text-muted"
          >
            {code}
          </code>
        )}
      </div>
      <div className="flex-1 p-5">{children}</div>
    </section>
  )
}

export default DemoCard
