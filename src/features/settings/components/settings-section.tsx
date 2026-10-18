import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface SettingsSectionProps {
  title: string
  description?: string
  children?: ReactNode
}

/** Card with a titled header — each settings page is built from these */
function SettingsSection({
  title,
  description,
  children,
}: SettingsSectionProps) {
  const { t } = useTranslation()

  return (
    <div className="card p-0!">
      <div className="border-b border-borderColor px-6 py-4">
        <h2 className="text-base font-semibold text-foreground">{t(title)}</h2>
        {description && (
          <p className="mt-0.5 text-sm text-muted">{t(description)}</p>
        )}
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

export default SettingsSection
