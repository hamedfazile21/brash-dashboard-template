import { FadeLoader } from 'react-spinners'
import { useTranslation } from 'react-i18next'

export function SplashScreen() {
  const { t } = useTranslation()
  const PRIMARY = 'var(--color-primary)'

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <FadeLoader
          color={PRIMARY}
          height={12}
          width={5}
          radius={2}
          margin={-8}
        />

        <p className="text-muted-foreground">{t('Loading...')}</p>
      </div>
    </div>
  )
}
