import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface ShowcaseSectionProps {
  icon: LucideIcon
  title: string
  description: string
  children: ReactNode
}

/** Titled block on the modals page — icon, heading, one-line hint */
function ShowcaseSection({
  icon: Icon,
  title,
  description,
  children,
}: ShowcaseSectionProps) {
  const { t } = useTranslation()

  return (
    <section className="flex flex-col gap-y-4">
      <div className="flex items-center gap-x-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon size={18} />
        </span>
        <div>
          <h2 className="text-base font-semibold text-foreground">
            {t(title)}
          </h2>
          <p className="text-xs text-muted">{t(description)}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

export default ShowcaseSection
