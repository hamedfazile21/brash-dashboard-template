import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import GlassBackdrop from '#/components/layout/glass-backdrop'
import { LogoDarkRow, LogoLightRow } from '../../../assets'

interface UtilityLayoutProps {
  children: ReactNode
}

/** Shared backdrop + logo header for the 404 / 500 / maintenance pages */
function UtilityLayout({ children }: UtilityLayoutProps) {
  const { t } = useTranslation()
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
      <GlassBackdrop />

      <header className="mx-auto flex w-full max-w-6xl items-center px-6 py-6">
        <Link to="/" aria-label={t('Home')}>
          <img src={LogoLightRow} alt="" className="w-32.5 dark:hidden" />
          <img src={LogoDarkRow} alt="" className="hidden w-32.5 dark:block" />
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 items-center px-6 pb-16">
        {children}
      </main>
    </div>
  )
}

export default UtilityLayout
